import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from '@mui/material';
import type { ProblemAttempt } from '../../../schemas/entities/problemAttempt';


interface TableProps{
  problemAttempts: ProblemAttempt[];
}

export default function ProblemAttemptTable({problemAttempts}: TableProps) {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Problem title</strong></TableCell>
            <TableCell><strong>Problem set origin</strong></TableCell>            
            <TableCell><strong>Competitor</strong></TableCell>
            <TableCell><strong>Platform</strong></TableCell>
            <TableCell><strong>Date</strong></TableCell>
            <TableCell><strong>Link</strong></TableCell>
            <TableCell><strong>Time</strong></TableCell>
            <TableCell><strong>WA</strong></TableCell>
            <TableCell><strong>Needed help</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {problemAttempts.map((problemAttempt) => (
            <TableRow key={problemAttempt.id}>
              <TableCell>{problemAttempt?.problem.title ?? "-"}</TableCell>
              <TableCell>{problemAttempt?.problem?.problemSet?.name ?? "-"}</TableCell>              
              <TableCell>{problemAttempt?.competitor?.name ?? "-"}</TableCell>
              <TableCell>{problemAttempt?.platform?.name ?? "-"}</TableCell>
              <TableCell>{problemAttempt.date ? new Date(problemAttempt.date).toLocaleDateString() : "-"}</TableCell>
              <TableCell>{problemAttempt.link ??"-"}</TableCell>
              <TableCell>{problemAttempt.time ?? "-"}</TableCell>
              <TableCell>{problemAttempt.wa ?? "-"}</TableCell>
              <TableCell>{problemAttempt.neededHelp ? "Sim" : "Não"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
