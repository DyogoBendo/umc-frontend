import z from 'zod'
import { problemSchema } from './problem'
import { competitorSchema } from './competitor'
import { platformSchema } from './platform'

export const problemAttemptSchema = z.object({
    id: z.number().optional(),    
    problem: problemSchema.nullable(),
    competitor: competitorSchema.nullable(),
    platform: platformSchema.nullable(),
    date: z.date().optional(),
    link: z.string().optional(),
    time: z.number().optional(),
    wa: z.number().optional(),
    neededHelp: z.boolean().optional()
})

export type ProblemAttempt = z.infer<typeof problemAttemptSchema>