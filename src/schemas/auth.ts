import { z } from "zod";

//login
export const loginSchema = z.object({
  email: z.string().email({ message: "Email Inválido" }),
  password: z.string().min(6, { message: "Mínimo de 6 caracteres" }),
});
export type LoginInput = z.infer<typeof loginSchema>;

//reset
export const resetSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
});
export type ResetInput = z.infer<typeof resetSchema>;

//register
export const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Informe seu nome" }),
    email: z.string().email({ message: "Email inválido!" }),
    password: z.string().min(6, { message: "Mínimo de 6 caracteres" }),
    confirmPassword: z.string().min(6, { message: "Confirmação necessária" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não batem",
    path: ["confirmPassword"],
  });
export type RegisterInput = z.infer<typeof registerSchema>;
