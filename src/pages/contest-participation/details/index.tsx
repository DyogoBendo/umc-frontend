import { Container, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { ContestParticipation } from '../../../schemas/entities/contestParticipation';
import type { ProblemAttempt } from '../../../schemas/entities/problemAttempt';
import contestParticipationService from '../../../services/contestParticipationService';
import problemAttemptService from '../../../services/problemAttemptService';
import ProblemAttemptTable from '../../../components/problem-attempt/table';

export default function ContestParticipationDetailPage(){
    const { contestParticipationId } = useParams();
    const [contestParticipation, setContestParticipation] = useState<ContestParticipation>();
    const [problemAttempts, setProblemAttempts] = useState<ProblemAttempt[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        contestParticipationService.getById(Number(contestParticipationId))
        .then((data) => setContestParticipation(data))
        .catch((error) => console.error('Error in fetching', error))
        .finally(() => setLoading(false))
        
        console.log(contestParticipation)
        problemAttemptService.getAll({"contestParticipationId": Number(contestParticipationId)})
        .then((data) => setProblemAttempts(data))
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
                <ProblemAttemptTable problemAttempts={problemAttempts} />     
            </Container>
    )
}