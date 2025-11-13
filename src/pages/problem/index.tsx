import { Container, Typography } from '@mui/material';
import Button from '../../components/ui/button'

export default function ProblemPage(){
    return (
            <Container>
                <Typography variant="h4" align="center" sx={{ mt: 4, mb: 2 }}>
                    Button 2
                </Typography>
                <Button />
            </Container>
    )
}