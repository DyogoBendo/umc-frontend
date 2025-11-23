import { z } from 'zod';
import { competitorSchema } from './competitor';

// Schemas para validação (opcional, mas bom para tipagem)
export const loginSchema = z.object({
  username: z.string().min(1, "Username é obrigatório"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export const registerSchema = z.object({
  name: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(6),
});

export const authResponseSchema = z.object({
    token: z.string(),
    competitor: competitorSchema
});


export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;


