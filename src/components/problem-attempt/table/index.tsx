import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Link as MuiLink, IconButton, Tooltip, Chip, Stack} from '@mui/material';
import type { ProblemAttempt } from '../../../schemas/entities/problemAttempt';
import LaunchIcon from '@mui/icons-material/Launch'; // Ícone de link externo


interface TableProps{
  problemAttempts: ProblemAttempt[];
}

export default function ProblemAttemptTable({problemAttempts}: TableProps) {
  return (
    <TableContainer component={Paper} sx={{ 
        width: 'auto', 
        mx: 2,         
        mt: 4,         
        overflowX: 'auto' 
      }}>
      <Table sx={{'& th, & td': { 
            textAlign: 'center' 
          }}}>
        <TableHead>
          <TableRow>
            <TableCell><strong>Problem title</strong></TableCell>
            <TableCell><strong>Problem set origin</strong></TableCell>            
            <TableCell><strong>Competitor</strong></TableCell>
            <TableCell><strong>Platform</strong></TableCell>
            <TableCell><strong>Topics</strong></TableCell>
            <TableCell><strong>Date</strong></TableCell>
            <TableCell><strong>Time</strong></TableCell>
            <TableCell><strong>WA</strong></TableCell>
            <TableCell><strong>Needed help</strong></TableCell>
            <TableCell><strong>Link</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {problemAttempts.map((problemAttempt) => (
            <TableRow key={problemAttempt.id}>
              <TableCell>{problemAttempt?.problem?.title ?? "-"}</TableCell>
              <TableCell>{problemAttempt?.problem?.problemSet?.name ?? "-"}</TableCell>              
              <TableCell>{problemAttempt?.competitor?.name ?? "-"}</TableCell>
              <TableCell>{problemAttempt?.platform?.name ?? "-"}</TableCell>
              <TableCell>
                {problemAttempt.topics && problemAttempt.topics.length > 0 ? (
                  <Stack 
                    direction="row" 
                    spacing={1} 
                    justifyContent="center" // Centraliza os chips
                    useFlexGap 
                    flexWrap="wrap" // Permite quebrar linha se tiver muitos
                  >
                    {problemAttempt.topics.map((topic, index) => (
                      <Chip 
                        // Use o ID como key, ou index como fallback se for um novo topic sem ID
                        key={topic.id ?? index} 
                        label={topic.name} 
                        size="small" 
                        variant="outlined" // ou "filled" se preferir cor sólida
                      />
                    ))}
                  </Stack>
                ) : "-"}
              </TableCell>
              <TableCell>{problemAttempt.date ? new Date(problemAttempt.date).toLocaleDateString() : "-"}</TableCell>
              <TableCell>{problemAttempt.time ?? "-"}</TableCell>
              <TableCell>{problemAttempt.wa ?? "-"}</TableCell>
              <TableCell>{problemAttempt.neededHelp ? "Sim" : "Não"}</TableCell>
              <TableCell> {/* Centralize para ficar bonito */}
                {problemAttempt.link ? (
                  <Tooltip title={problemAttempt.link}>
                    <IconButton 
                      component={MuiLink} 
                      href={problemAttempt.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      size="small"
                      color="primary"
                    >
                      <LaunchIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                ) : "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
