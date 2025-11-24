import { Container, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import competitionService from '../../../services/competitionService';
import type { Competition } from '../../../schemas/entities/competition';
import CompetitionsTable from '../../../components/competition/table';

export default function CompetitionsPage(){
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        competitionService.getAll()
        .then((data) => setCompetitions(data))
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
                    Lista de competições
                </Typography>
                <CompetitionsTable  competitions={competitions}/>
            </Container>
    )
}