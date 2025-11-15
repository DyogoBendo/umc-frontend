import z from 'zod'

export const problemSetSchema = z.object({
    id: z.number().nullable(),
    name: z.string().nullable()
});

export type ProblemSet = z.infer<typeof problemSetSchema>