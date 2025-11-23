import { Container, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import EntryTypeTable from '../../../components/entry-type/table';
import type { EntryType } from '../../../schemas/entities/entryType';
import entryTypeService from '../../../services/entryTypeService';

export default function EntryTypesPage(){
    const [entryTypes, setEntryTypes] = useState<EntryType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        entryTypeService.getAll()
        .then((data) => setEntryTypes(data))
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
                    Tipo de entradas
                </Typography>
                <EntryTypeTable  entryTypes={entryTypes}/>
            </Container>
    )
}