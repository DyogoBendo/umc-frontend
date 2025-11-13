import z from 'zod'
import { problemSetSchema } from './problemSet'

export const problemSchema = z.object({
    id: z.number(),
    title: z.string(),
    problemSet: problemSetSchema
})

export type Problem = z.infer<typeof problemSchema>