import z from 'zod'
import { competitorSchema } from '../entities/competitor'
import { platformSchema } from '../entities/platform'
import { contestSchema } from '../entities/contest'
import { problemAttemptFormSchema } from './problemAttemptForm'
import { entryTypeSchema } from '../entities/entryType'

export const contestParticipationFormSchema = z.object({    
    contest: contestSchema.nullable(),
    team: z.array(competitorSchema),
    platform: platformSchema.nullable(),
    date: z.date().optional(),
    link: z.string().optional(),
    problemAttempts: z.array(problemAttemptFormSchema),
    entryType: entryTypeSchema.nullable(),
    goodPoints: z.string().nullable(),
    badPoints: z.string().nullable(),
    comments: z.string().nullable(),
    improvementIdeas: z.string().nullable(),
})

export type ContestParticipationForm = z.infer<typeof contestParticipationFormSchema>