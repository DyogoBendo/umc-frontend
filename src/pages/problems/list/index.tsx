import { Container, Typography, CircularProgress } from '@mui/material';
import ProblemTable from '../../../components/problem/table'
import problemService from '../../../services/problemService';
import type { Problem } from '../../../schemas/entities/problem';
import { useEffect, useState } from 'react';

export default function ProblemsPage(){
    const [problems, setProblems] = useState<Problem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        problemService.getAll()
        .then((data) => setProblems(data))
        .catch((error) => console.error('Error in fetching', error))
        .finally(() => setLoading(false))
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
                    Lista de problemas
                </Typography>
                <ProblemTable  problems={problems}/>
            </Container>
    )
}