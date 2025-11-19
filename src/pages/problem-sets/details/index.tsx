import { Container, Typography, CircularProgress } from '@mui/material';
import ProblemSetTable from '../../../components/problem-set/table';
import problemSetService from '../../../services/problemSetService';
import type { ProblemSet } from '../../../schemas/entities/problemSet';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { Problem } from '../../../schemas/entities/problem';
import ProblemTable from '../../../components/problem/table';
import problemService from '../../../services/problemService';

export default function ProblemSetDetailPage(){
    const { problemSetId } = useParams();
    const [problemSet, setProblemSet] = useState<ProblemSet>();
    const [problems, setProblems] = useState<Problem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        problemSetService.getById(Number(problemSetId))
        .then((data) => setProblemSet(data))
        .catch((error) => console.error('Error in fetching', error))
        .finally(() => setLoading(false))
        
        console.log(problemSet)
        problemService.getAll({"problemSetId": Number(problemSetId)})
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
                    {problemSet?.name ?? "Sem nome" }
                </Typography>           
                <ProblemTable problems={problems} />     
            </Container>
    )
}