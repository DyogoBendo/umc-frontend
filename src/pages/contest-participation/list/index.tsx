import { Container, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import ContestParticipationTable from '../../../components/contest-participation/table';
import type { ContestParticipation } from '../../../schemas/entities/contestParticipation';
import contestParticipationService from '../../../services/contestParticipationService';

export default function ContestParticipationsPage(){
    const [contestParticipations, setContestParticipations] = useState<ContestParticipation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        contestParticipationService.getAll()
        .then((data) => setContestParticipations(data))
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
                    Lista de participações em provas
                </Typography>
                <ContestParticipationTable  contestParticipations={contestParticipations}/>
            </Container>
    )
}