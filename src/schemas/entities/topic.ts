import z from 'zod'

export const topicSchema = z.object({
    id: z.number().nullable(),
    name: z.string().nullable()
});

export type Topic = z.infer<typeof topicSchema>