import z from 'zod'

export const contestSchema = z.object({
    id: z.number().nullable(),
    title: z.string()
});

export type Contest = z.infer<typeof contestSchema>