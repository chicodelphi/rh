import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../_lib/auth";
import { handleZodError, uuidSchema } from "../_lib/validators";
import { z } from "zod";
import { create } from "xmlbuilder2";

const prisma = new PrismaClient();

const esocialSchema = z.object({
  funcionario_id: uuidSchema,
  competencia: z.string().regex(/^\d{4}-\d{2}$/),
  evento: z.enum(["S1200", "S1210"]),
});

export async function POST(req: NextRequest) {
  try {
    const auth = requireAuth(req);
    if (auth instanceof NextResponse) return auth;

    const payload = esocialSchema.parse(await req.json());
    const funcionario = await prisma.funcionario.findUnique({
      where: { id: payload.funcionario_id },
      include: {
        empresa: true,
        folhas: { where: { mesAno: new Date(`${payload.competencia}-01`) } },
      },
    });

    if (!funcionario || funcionario.empresaId !== auth.empresaId) {
      return NextResponse.json({ error: "Funcionário não encontrado" }, { status: 404 });
    }

    const folha = funcionario.folhas[0];
    if (!folha) {
      return NextResponse.json({ error: "Folha não encontrada" }, { status: 404 });
    }

    const doc = create({ version: "1.0", encoding: "UTF-8" })
      .ele("eSocial")
      .ele(payload.evento)
      .ele("ideEvento")
      .ele("perApur").txt(payload.competencia).up()
      .up()
      .ele("ideEmpregador")
      .ele("nrInsc").txt(funcionario.empresa.cnpj ?? "").up()
      .up()
      .ele("ideTrabalhador")
      .ele("cpfTrab").txt(funcionario.cpf).up()
      .up()
      .ele("dmDev")
      .ele("ideDmDev").txt(folha.id).up()
      .ele("infoPerApur")
      .ele("ideEstabLot")
      .ele("cnpjLotacao").txt(funcionario.empresaId).up()
      .ele("detRubr")
      .ele("ideRubr").txt("SALBASE").up()
      .ele("ideTabRubr").txt("1").up()
      .ele("qtdRubr").txt("1").up()
      .ele("fatorRubr").txt("1").up()
      .ele("vrRubr").txt(String(folha.salario))
      .up()
      .up()
      .up()
      .up()
      .ele("infoPerApurTotal")
      .ele("vrLiq").txt(String(folha.totalPago)).up()
      .doc();

    const xml = doc.end({ prettyPrint: true });
    return NextResponse.json({ xml });
  } catch (err) {
    const parsed = handleZodError(err);
    if (parsed) return NextResponse.json(parsed.body, { status: parsed.status });
    return NextResponse.json({ error: "Erro ao gerar XML" }, { status: 500 });
  }
}
