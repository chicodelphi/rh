import { ZodError, z } from "zod";

export const cnpjSchema = z
  .string()
  .regex(/^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/, "CNPJ inválido")
  .transform((value) => value.replace(/\D/g, ""));

export const cpfSchema = z
  .string()
  .regex(/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/, "CPF inválido")
  .transform((value) => value.replace(/\D/g, ""));

export const uuidSchema = z.string().uuid("ID inválido");

export const handleZodError = (err: unknown) => {
  if (err instanceof ZodError) {
    return {
      status: 400,
      body: {
        error: "Erro de validação",
        details: err.flatten().fieldErrors,
      },
    };
  }
  return null;
};
