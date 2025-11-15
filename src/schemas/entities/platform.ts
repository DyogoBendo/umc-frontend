import z from 'zod'

export const platformSchema = z.object({
    id: z.number().nullable(),
    name: z.string().nullable(),
    link: z.string().nullable()
});

export type Platform = z.infer<typeof platformSchema>