import z from 'zod'
import { contestSchema } from './contest';
import { problemSchema } from './problem';

export const contestProblemSchema = z.object({
    id: z.number().nullable(),
    contest: contestSchema,
    position: z.number(),
    problem: problemSchema
});

export type ContestProblem = z.infer<typeof contestProblemSchema>