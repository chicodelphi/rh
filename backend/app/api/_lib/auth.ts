import { NextRequest, NextResponse } from "next/server";

export type AuthContext = {
  empresaId: string;
  usuarioId: string;
  role: "admin" | "gestor" | "colaborador";
};

// Placeholder de autenticação. Em produção, usar NextAuth ou JWT + middleware no App Router.
export const requireAuth = (req: NextRequest): AuthContext | NextResponse => {
  const empresaId = req.headers.get("x-empresa-id");
  const usuarioId = req.headers.get("x-user-id");
  const role = req.headers.get("x-role") as AuthContext["role"] | null;

  if (!empresaId || !usuarioId || !role) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  return { empresaId, usuarioId, role };
};
