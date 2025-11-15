import z from 'zod'
import { problemSetSchema } from './problemSet'

export const problemSchema = z.object({
    id: z.number().nullable(),
    title: z.string(),
    problemSet: problemSetSchema.nullable()
})

export type Problem = z.infer<typeof problemSchema>