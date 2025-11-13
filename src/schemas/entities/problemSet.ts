import z from 'zod'

export const problemSetSchema = z.object({
    id: z.number(),
    name: z.string()
});

export type Problem = z.infer<typeof problemSetSchema>