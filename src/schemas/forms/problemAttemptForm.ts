import z from 'zod'
import { problemSchema } from '../entities/problem'
import { competitorSchema } from '../entities/competitor'
import { platformSchema } from '../entities/platform'
import { problemSetSchema } from '../entities/problemSet'

export const problemAttemptFormSchema = z.object({    
    problem: problemSchema.nullable(),
    competitor: competitorSchema.nullable(),    
    platform: platformSchema.nullable(),
    date: z.date().optional(),
    link: z.string().optional(),
    time: z.number().optional(),
    wa: z.number().optional(),
    neededHelp: z.boolean().optional(),
    problemSet: problemSetSchema.nullable()
})

export type ProblemAttemptForm = z.infer<typeof problemAttemptFormSchema>