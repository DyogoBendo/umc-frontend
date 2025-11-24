import z from 'zod'
import { competitionEntryTypeSchema } from '../entities/competitionEntryType';

export const competitionFormSchema = z.object({
    id: z.number().nullable(),
    name: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    entryTypes: z.array(competitionEntryTypeSchema)
});

export type CompetitionForm = z.infer<typeof competitionFormSchema>