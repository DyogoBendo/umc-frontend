import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Link as MuiLink, IconButton, Tooltip, Chip, Stack, Rating} from '@mui/material';
import type { ProblemAttempt } from '../../../schemas/entities/problemAttempt';
import LaunchIcon from '@mui/icons-material/Launch';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DescriptionIcon from '@mui/icons-material/Description'; // Ícone para notas
import LightbulbIcon from '@mui/icons-material/Lightbulb'; // Ícone para Ideia Geral


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
            <TableCell><strong>Tipo</strong></TableCell>
            <TableCell><strong>Topics</strong></TableCell>
            <TableCell><strong>Date</strong></TableCell>
            {/* Nova Coluna: STATUS */}
            <TableCell><strong>AC?</strong></TableCell>
            <TableCell><strong>Time</strong></TableCell>
            <TableCell><strong>WA</strong></TableCell>
            <TableCell><strong>Needed help</strong></TableCell>
            <TableCell><strong>Theory</strong></TableCell>
            <TableCell><strong>Obs.</strong></TableCell>
            <TableCell><strong>Impl.</strong></TableCell>
            <TableCell><strong>General</strong></TableCell>
            {/* Nova Coluna: NOTAS (Agrupado) */}
            <TableCell><strong>Notas</strong></TableCell>
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
              <TableCell>{problemAttempt?.entryType?.name ?? "-"}</TableCell>
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
              <TableCell>
                {problemAttempt.solved ? (
                    <Tooltip title="Resolvido (AC)">
                        <CheckCircleIcon color="success" />
                    </Tooltip>
                ) : (
                    <Tooltip title="Não Resolvido">
                        <CancelIcon color="error" sx={{ opacity: 0.3 }} />
                    </Tooltip>
                )}
              </TableCell>
              <TableCell>{problemAttempt.time ?? "-"}</TableCell>
              <TableCell>{problemAttempt.wa ?? "-"}</TableCell> 
              <TableCell>{problemAttempt.neededHelp ? "Sim" : "Não"}</TableCell>
              <TableCell>
                {problemAttempt.theoryDifficulty !== null ? (
                  <Rating value={problemAttempt.theoryDifficulty} readOnly size="small" max={5} />
                ) : "-"}
              </TableCell>

              <TableCell>
                {problemAttempt.observationDifficulty !== null ? (
                  <Rating value={problemAttempt.observationDifficulty} readOnly size="small" max={5} />
                ) : "-"}
              </TableCell>

              <TableCell>
                {problemAttempt.implementationDifficulty !== null ? (
                  <Rating value={problemAttempt.implementationDifficulty} readOnly size="small" max={5} />
                ) : "-"}
              </TableCell>

              <TableCell>
                {problemAttempt.generalDifficulty !== null ? (
                  <Rating value={problemAttempt.generalDifficulty} readOnly size="small" max={5} />
                ) : "-"}
              </TableCell>             
              {/* 2. COLUNA DE NOTAS (Ideia, Truques, Comentários) */}
              <TableCell>
                <Stack direction="row" justifyContent="center" spacing={1}>
                    {/* Se tiver Ideia Geral */}
                    {problemAttempt.generalIdea && (
                        <Tooltip title={`Ideia: ${problemAttempt.generalIdea}`} arrow>
                            <LightbulbIcon fontSize="small" color="warning" />
                        </Tooltip>
                    )}
                    
                    {/* Se tiver Truques ou Comentários */}
                    {(problemAttempt.tricks || problemAttempt.comments) && (
                        <Tooltip 
                            title={
                                <div style={{ whiteSpace: 'pre-line' }}>
                                    {problemAttempt.tricks && <div><strong>Truques:</strong> {problemAttempt.tricks}</div>}
                                    {problemAttempt.tricks && problemAttempt.comments && <hr/>}
                                    {problemAttempt.comments && <div><strong>Comentários:</strong> {problemAttempt.comments}</div>}
                                </div>
                            } 
                            arrow
                        >
                            <DescriptionIcon fontSize="small" color="action" />
                        </Tooltip>
                    )}
                    
                    {!problemAttempt.generalIdea && !problemAttempt.tricks && !problemAttempt.comments && "-"}
                </Stack>
              </TableCell>
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
