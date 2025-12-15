import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../_lib/auth";
import { handleZodError, uuidSchema } from "../_lib/validators";
import { z } from "zod";

const prisma = new PrismaClient();

const registerPontoSchema = z.object({
  funcionario_id: uuidSchema,
  tipo: z.enum(["entrada", "saida"]),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  metodo: z.enum(["facial", "manual"]),
  imagem_prova_url: z.string().url().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const auth = requireAuth(req);
    if (auth instanceof NextResponse) return auth;

    const payload = registerPontoSchema.parse(await req.json());

    const funcionario = await prisma.funcionario.findUnique({
      where: { id: payload.funcionario_id },
    });

    if (!funcionario || funcionario.empresaId !== auth.empresaId) {
      return NextResponse.json({ error: "Funcionário não encontrado" }, { status: 404 });
    }

    const ponto = await prisma.ponto.create({
      data: {
        funcionarioId: payload.funcionario_id,
        tipo: payload.tipo,
        dataHora: new Date(),
        latitude: payload.latitude,
        longitude: payload.longitude,
        metodo: payload.metodo,
        imagemProvaUrl: payload.imagem_prova_url,
      },
    });

    return NextResponse.json(ponto, { status: 201 });
  } catch (err) {
    const parsed = handleZodError(err);
    if (parsed) {
      return NextResponse.json(parsed.body, { status: parsed.status });
    }
    return NextResponse.json({ error: "Erro ao registrar ponto" }, { status: 500 });
  }
}
