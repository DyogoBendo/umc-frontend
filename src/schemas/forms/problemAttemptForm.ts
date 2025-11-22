import z from 'zod'
import { problemSchema } from '../entities/problem'
import { competitorSchema } from '../entities/competitor'
import { platformSchema } from '../entities/platform'
import { problemSetSchema } from '../entities/problemSet'
import { topicSchema } from '../entities/topic'

export const problemAttemptFormSchema = z.object({    
    problem: problemSchema.nullable(),
    competitor: competitorSchema.nullable(),    
    platform: platformSchema.nullable(),
    date: z.date().optional(),
    link: z.string().optional(),
    time: z.number().nullable(),
    wa: z.number().nullable(),
    neededHelp: z.boolean(),
    problemSet: problemSetSchema.nullable(),
    topics: z.array(topicSchema),
    theoryDifficulty: z.number().nullable(),
    observationDifficulty: z.number().nullable(),
    implementationDifficulty: z.number().nullable(),
    generalDifficulty: z.number().nullable(),
})

export type ProblemAttemptForm = z.infer<typeof problemAttemptFormSchema>