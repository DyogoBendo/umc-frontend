import { Container, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { Problem } from '../../../schemas/entities/problem';
import ProblemTable from '../../../components/problem/table';
import type { Contest } from '../../../schemas/entities/contest';
import contestService from '../../../services/contestService';
import contestProblemService from '../../../services/contestProblemService';

export default function ContestDetailPage(){
    const { contestId } = useParams();
    const [contest, setContest] = useState<Contest>();
    const [problems, setProblems] = useState<Problem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        contestService.getById(Number(contestId))
        .then((data) => setContest(data))
        .catch((error) => console.error('Error in fetching', error))
        .finally(() => setLoading(false))
        
        console.log(contest)
        contestProblemService.getAll({"contestId": Number(contestId)})
        .then((data) => {
            const sortedData = data.sort((a, b) => a.position - b.position);
            // 2. Extrai apenas o problema
            const extractedProblems = sortedData.map((cp) => cp.problem);
            
            setProblems(extractedProblems);
        })
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
                    {contest?.title ?? "Sem título" }
                </Typography>           
                <ProblemTable problems={problems} />     
            </Container>
    )
}