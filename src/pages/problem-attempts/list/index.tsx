import { Container, Typography, CircularProgress } from '@mui/material';

import { useEffect, useState } from 'react';
import ProblemAttemptTable from '../../../components/problem-attempt/table';
import problemAttemptService from '../../../services/problemAttemptService';
import type { ProblemAttempt } from '../../../schemas/entities/problemAttempt';

export default function ProblemAttemptsPage(){
    const [problemAttempt, setProblemAttempt] = useState<ProblemAttempt[]>([]);
    const [loading, AttemptLoading] = useState(true);

    useEffect(() => {
        problemAttemptService.getAll()
        .then((data) => setProblemAttempt(data))
        .catch((error) => console.error('Error in fetching', error))
        .finally(() => AttemptLoading(false))
    }, [])

    if (loading) {
    return (
            <Container sx={{ textAlign: 'center', mt: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
            <Container>
                <Typography variant="h4" align="center" sx={{ mt: 4, mb: 2 }}>
                    Lista de problemas tentados
                </Typography>
                <ProblemAttemptTable  problemAttempts={problemAttempt}/>
            </Container>
    )
}