import z from 'zod'
import { contestSchema } from './contest';
import { competitorSchema } from './competitor';
import { platformSchema } from './platform';
import { entryTypeSchema } from './entryType';

export const contestParticipationSchema = z.object({
    id: z.number().nullable(),
    contest: contestSchema,
    team: z.array(competitorSchema),
    platform: platformSchema,
    date: z.date(),
    link: z.string(),
    entryType: entryTypeSchema.nullable(),
    goodPoints: z.string().nullable(),
    badPoints: z.string().nullable(),
    comments: z.string().nullable(),
    improvementIdeas: z.string().nullable(),
});

export type ContestParticipation = z.infer<typeof contestParticipationSchema>