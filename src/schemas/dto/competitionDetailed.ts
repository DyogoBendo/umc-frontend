import z from 'zod'
import { competitionEntryTypeSchema } from '../entities/competitionEntryType';
import { competitorSchema } from '../entities/competitor';

export const rankSchema = z.object({
    score: z.number(),
    solvedProblems: z.number(),
    competitor: competitorSchema
});

export const competitionDetailedSchema = z.object({
    id: z.number().nullable(),
    name: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    competitionEntryTypes: z.array(competitionEntryTypeSchema),
    rank: z.array(rankSchema)
});

export type Rank = z.infer<typeof rankSchema>
export type CompetitionDetailed = z.infer<typeof competitionDetailedSchema>