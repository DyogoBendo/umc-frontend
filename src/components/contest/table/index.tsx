import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@mui/material';
import { useNavigate } from 'react-router';
import type { Contest } from '../../../schemas/entities/contest';


interface TableProps{
  contests: Contest[];
}

export default function ContestsTable({contests}: TableProps) {
  const navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Title</strong></TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {contests.map((contest) => (
            <TableRow 
            key={contest.id}
            onClick={() => navigate(`/contests/${contest.id}`)}
            sx={{ cursor: 'pointer' }}
            >
              <TableCell>{contest.title}</TableCell>              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
