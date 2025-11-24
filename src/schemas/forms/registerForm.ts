import { z } from "zod";

export const registerFormSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  username: z.string().min(1, "O username é obrigatório"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type ReegisterFormData = z.infer<typeof registerFormSchema>;