import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@mui/material';
import type { ProblemSet } from '../../../schemas/entities/problemSet';


interface TableProps{
  problemSets: ProblemSet[];
}

export default function ProblemSetTable({problemSets}: TableProps) {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {problemSets.map((problemSet) => (
            <TableRow key={problemSet.id}>
              <TableCell>{problemSet.name}</TableCell>              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
