import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../../../_lib/auth";
import { handleZodError, uuidSchema } from "../../../_lib/validators";
import { z } from "zod";

const prisma = new PrismaClient();

const rescisaoSchema = z.object({
  data_demissao: z.coerce.date(),
  tipo: z.enum(["com_justa_causa", "sem_justa_causa"]),
});

const calcularRescisao = (params: {
  salarioBase: number;
  dataAdmissao: Date;
  dataDemissao: Date;
  tipo: "com_justa_causa" | "sem_justa_causa";
}) => {
  const diasTrabalhados = Math.max(
    0,
    Math.ceil(
      (params.dataDemissao.getTime() - params.dataAdmissao.getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );
  const avisoPrevio = params.tipo === "sem_justa_causa" ? params.salarioBase : 0;
  const feriasProporcionais = (params.salarioBase / 12) * (diasTrabalhados / 30);
  const decimoTerceiro = (params.salarioBase / 12) * (diasTrabalhados / 30);
  const fgts = params.salarioBase * 0.08;
  const multaFgts = params.tipo === "sem_justa_causa" ? fgts * 0.4 : 0;

  const total =
    avisoPrevio + feriasProporcionais + decimoTerceiro + fgts + multaFgts;

  return {
    avisoPrevio,
    feriasProporcionais,
    decimoTerceiro,
    fgts,
    multaFgts,
    total,
  };
};

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = requireAuth(req);
    if (auth instanceof NextResponse) return auth;
    if (auth.role !== "admin" && auth.role !== "gestor") {
      return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    uuidSchema.parse(params.id);
    const payload = rescisaoSchema.parse(await req.json());

    const funcionario = await prisma.funcionario.findUnique({
      where: { id: params.id },
    });

    if (!funcionario || funcionario.empresaId !== auth.empresaId) {
      return NextResponse.json({ error: "Funcionário não encontrado" }, { status: 404 });
    }

    const calculo = calcularRescisao({
      salarioBase: Number(funcionario.salarioBase),
      dataAdmissao: new Date(funcionario.dataAdmissao),
      dataDemissao: payload.data_demissao,
      tipo: payload.tipo,
    });

    const rescisao = await prisma.rescisao.create({
      data: {
        funcionarioId: funcionario.id,
        dataDemissao: payload.data_demissao,
        tipo: payload.tipo,
        valorTotal: calculo.total,
        detalhes: calculo,
      },
    });

    return NextResponse.json({ rescisao, calculo }, { status: 201 });
  } catch (err) {
    const parsed = handleZodError(err);
    if (parsed) {
      return NextResponse.json(parsed.body, { status: parsed.status });
    }
    return NextResponse.json({ error: "Erro ao calcular rescisão" }, { status: 500 });
  }
}
