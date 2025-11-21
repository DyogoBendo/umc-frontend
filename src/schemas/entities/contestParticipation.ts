import z from 'zod'
import { contestSchema } from './contest';
import { competitorSchema } from './competitor';
import { platformSchema } from './platform';

export const contestParticipationSchema = z.object({
    id: z.number().nullable(),
    contest: contestSchema,
    team: z.array(competitorSchema),
    platform: platformSchema,
    date: z.date(),
    link: z.string()
});

export type ContestParticipation = z.infer<typeof contestParticipationSchema>