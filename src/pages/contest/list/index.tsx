import { Container, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import type { Contest } from '../../../schemas/entities/contest';
import contestService from '../../../services/contestService';
import ContestsTable from '../../../components/contest/table';

export default function ContestsPage(){
    const [contests, setContests] = useState<Contest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        contestService.getAll()
        .then((data) => setContests(data))
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
                    Lista de provas
                </Typography>
                <ContestsTable  contests={contests}/>
            </Container>
    )
}