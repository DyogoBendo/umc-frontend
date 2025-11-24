import z from 'zod'

export const competitionSchema = z.object({
    id: z.number().nullable(),
    name: z.string(),
    startDate: z.date(),
    endDate: z.date()
});

export type Competition = z.infer<typeof competitionSchema>