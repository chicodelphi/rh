import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../_lib/auth";
import { cpfSchema, handleZodError } from "../_lib/validators";
import { z } from "zod";

const prisma = new PrismaClient();

const createFuncionarioSchema = z.object({
  nome: z.string().min(2),
  cpf: cpfSchema,
  data_admissao: z.coerce.date(),
  cargo: z.string().min(2),
  salario_base: z.number().positive(),
  status: z.enum(["ativo", "afastado", "demitido"]).default("ativo"),
  jornada_semanal: z.number().positive().optional(),
  email_corporativo: z.string().email().optional(),
});

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if (auth instanceof NextResponse) return auth;

  const funcionarios = await prisma.funcionario.findMany({
    where: { empresaId: auth.empresaId },
    orderBy: { nome: "asc" },
  });

  return NextResponse.json(funcionarios);
}

export async function POST(req: NextRequest) {
  try {
    const auth = requireAuth(req);
    if (auth instanceof NextResponse) return auth;
    if (auth.role !== "admin" && auth.role !== "gestor") {
      return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    const payload = createFuncionarioSchema.parse(await req.json());

    const funcionario = await prisma.funcionario.create({
      data: {
        empresaId: auth.empresaId,
        nome: payload.nome,
        cpf: payload.cpf,
        dataAdmissao: payload.data_admissao,
        cargo: payload.cargo,
        salarioBase: payload.salario_base,
        status: payload.status,
        jornadaSemanal: payload.jornada_semanal,
        emailCorporativo: payload.email_corporativo,
      },
    });

    return NextResponse.json(funcionario, { status: 201 });
  } catch (err) {
    const parsed = handleZodError(err);
    if (parsed) {
      return NextResponse.json(parsed.body, { status: parsed.status });
    }
    return NextResponse.json({ error: "Erro ao criar funcionário" }, { status: 500 });
  }
}
