import z from 'zod'
import { problemSchema } from './problem'
import { competitorSchema } from './competitor'
import { platformSchema } from './platform'
import { topicSchema } from './topic'
import { entryTypeSchema } from './entryType'

export const problemAttemptSchema = z.object({
    id: z.number().optional(),    
    problem: problemSchema.nullable(),
    competitor: competitorSchema.nullable(),
    platform: platformSchema.nullable(),
    date: z.date().optional(),
    link: z.string().optional(),
    time: z.number().optional(),
    wa: z.number().optional(),
    neededHelp: z.boolean().optional(),
    topics: z.array(topicSchema).default([]),
    theoryDifficulty: z.number().nullable(),
    observationDifficulty: z.number().nullable(),
    implementationDifficulty: z.number().nullable(),
    generalDifficulty: z.number().nullable(),
    entryType: entryTypeSchema.nullable()
})

export type ProblemAttempt = z.infer<typeof problemAttemptSchema>