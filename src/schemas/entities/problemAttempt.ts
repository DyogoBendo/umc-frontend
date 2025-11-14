import z from 'zod'
import { problemSchema } from './problem'
import { competitorSchema } from './competitor'
import { platformSchema } from './platform'

export const problemAttemptSchema = z.object({
    id: z.number(),    
    problem: problemSchema,
    competitor: competitorSchema,
    platform: platformSchema,
    date: z.date(),
    link: z.string(),
    time: z.number(),
    wa: z.number(),
    neededHelp: z.boolean()
})

export type ProblemAttempt = z.infer<typeof problemAttemptSchema>