import { Container, Typography, CircularProgress } from '@mui/material';
import ProblemSetTable from '../../../components/problem-set/table';
import problemSetService from '../../../services/problemSetService';
import type { ProblemSet } from '../../../schemas/entities/problemSet';
import { useEffect, useState } from 'react';

export default function ProblemSetsPage(){
    const [problemSet, setProblemSet] = useState<ProblemSet[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        problemSetService.getAll()
        .then((data) => setProblemSet(data))
        .catch((error) => console.error('Error in fetching', error))
        .finally(() => setLoading(false))
    })

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
                    Lista de conjuntos de questões
                </Typography>
                <ProblemSetTable  problemSets={problemSet}/>
            </Container>
    )
}