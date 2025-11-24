import z from 'zod'
import { entryTypeSchema } from './entryType';

export const competitionEntryTypeSchema = z.object({
    id: z.number().nullable(),
    difficultyA: z.number(),
    difficultyB: z.number(),
    timeA: z.number(),
    timeB: z.number(),
    entryType: entryTypeSchema.nullable()
});

export type CompetitionEntryType = z.infer<typeof competitionEntryTypeSchema>