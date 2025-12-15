import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cnpjSchema, handleZodError } from "../_lib/validators";
import { z } from "zod";

const prisma = new PrismaClient();

const createEmpresaSchema = z.object({
  cnpj: cnpjSchema,
  nome: z.string().min(2),
  nome_fantasia: z.string().min(2).optional(),
  ramo_atividade: z.string().min(2).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const payload = createEmpresaSchema.parse(body);

    const empresa = await prisma.empresa.create({
      data: {
        cnpj: payload.cnpj,
        nome: payload.nome,
        nomeFantasia: payload.nome_fantasia,
        ramoAtividade: payload.ramo_atividade,
      },
    });

    return NextResponse.json(empresa, { status: 201 });
  } catch (err) {
    const parsed = handleZodError(err);
    if (parsed) {
      return NextResponse.json(parsed.body, { status: parsed.status });
    }

    return NextResponse.json({ error: "Erro ao criar empresa" }, { status: 500 });
  }
}
