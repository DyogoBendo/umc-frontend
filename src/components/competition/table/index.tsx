import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@mui/material';
import { useNavigate } from 'react-router';
import type { Competition } from '../../../schemas/entities/competition';

interface TableProps{
  competitions: Competition[];
}

export default function CompetitionsTable({competitions}: TableProps) {
  const navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Nome</strong></TableCell>            
            <TableCell><strong>Data Início</strong></TableCell>            
            <TableCell><strong>Data Fim</strong></TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {competitions.map((competition) => (
            <TableRow 
            key={competition.id}
            onClick={() => navigate(`/competitions/${competition.id}`)}
            sx={{ cursor: 'pointer' }}
            >
              <TableCell>{competition.name}</TableCell>              
              <TableCell>{competition.startDate ? new Date(competition.startDate).toLocaleDateString() : "-"}</TableCell>
              <TableCell>{competition.endDate ? new Date(competition.endDate).toLocaleDateString() : "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
