export interface ContestParticipationGathered {
    contest: {
        id: number | null;
        title: string;
    };
    problemAttempts: {
        problem: {
            id: number | null;
            title: string;
            problemSet: {
                id: number | null;
                name: string;
            }
        };
        problemIndex: string; // "A", "B", etc.
        solved: boolean;
        wa: number | null;
        time: number | null;
    }[];
}