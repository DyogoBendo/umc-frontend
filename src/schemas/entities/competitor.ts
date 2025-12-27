import z from 'zod'

export const competitorSchema = z.object({
    id: z.number(),
    name: z.string(),
    codeforcesHandle: z.string()
});

export type Competitor = z.infer<typeof competitorSchema>