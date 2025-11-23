import z from 'zod'

export const entryTypeSchema = z.object({
    id: z.number().nullable(),
    name: z.string(),
    fromContest: z.boolean().nullable()
});

export type EntryType = z.infer<typeof entryTypeSchema>