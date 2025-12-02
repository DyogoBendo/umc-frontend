import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper, Chip, IconButton, Stack, Tooltip, Link as MuiLink} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate } from 'react-router';
import type { ContestParticipation } from '../../../schemas/entities/contestParticipation';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp'; // Para melhorias
import ChatIcon from '@mui/icons-material/Chat'; // Para comentários


interface TableProps{
  contestParticipations: ContestParticipation[];
}

export default function ContestParticipationTable({contestParticipations}: TableProps) {
  const navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ width: 'auto', margin: 'auto', mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='center'><strong>Prova</strong></TableCell>            
            <TableCell align='center'><strong>Time</strong></TableCell>            
            <TableCell align='center'><strong>Data</strong></TableCell>            
            <TableCell align='center'><strong>Plataforma</strong></TableCell>            
            <TableCell align='center'><strong>Tipo</strong></TableCell>     
            {/* Nova Coluna */}
            <TableCell align='center'><strong>Feedback</strong></TableCell>       
            <TableCell align='center'><strong>Link</strong></TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {contestParticipations.map((contestParticipation) => (
            <TableRow 
            key={contestParticipation.id}
            onClick={() => navigate(`/contest-participations/${contestParticipation.id}`)}
            sx={{ cursor: 'pointer' }}
            >
              <TableCell align='center'>{contestParticipation?.contest?.title}</TableCell>              
              {/* 2. TIME (Array de Competidores) */}
              <TableCell align='center'>
                {contestParticipation.team && contestParticipation.team.length > 0 ? (
                  <Stack 
                    direction="row" 
                    spacing={1} 
                    justifyContent="center" 
                    useFlexGap 
                    flexWrap="wrap"
                  >
                    {contestParticipation.team.map((competitor, index) => (
                      <Chip 
                        key={competitor.id ?? index}
                        label={competitor.name} 
                        size="small" 
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                ) : "-"}
              </TableCell>

              {/* 4. DATA */}
              <TableCell align='center'>
                {contestParticipation.date 
                  ? new Date(contestParticipation.date).toLocaleDateString() 
                  : "-"}
              </TableCell>  

              {/* 3. PLATAFORMA */}
              <TableCell align='center'>{contestParticipation?.platform?.name ?? "-"}</TableCell>              
              <TableCell align='center'>{contestParticipation?.entryType?.name ?? "-"}</TableCell>   

              {/* CÉLULA DE FEEDBACK */}
              <TableCell onClick={(e) => e.stopPropagation()}>
                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                    
                    {/* 1. Good Points */}
                    {contestParticipation.goodPoints && (
                        <Tooltip title={<div style={{whiteSpace: 'pre-line'}}><strong>Positivo:</strong><br/>{contestParticipation.goodPoints}</div>} arrow>
                            <ThumbUpIcon fontSize="small" color="success" />
                        </Tooltip>
                    )}

                    {/* 2. Bad Points */}
                    {contestParticipation.badPoints && (
                        <Tooltip title={<div style={{whiteSpace: 'pre-line'}}><strong>Negativo:</strong><br/>{contestParticipation.badPoints}</div>} arrow>
                            <ThumbDownIcon fontSize="small" color="error" />
                        </Tooltip>
                    )}

                    {/* 3. Improvements */}
                    {contestParticipation.improvementIdeas && (
                        <Tooltip title={<div style={{whiteSpace: 'pre-line'}}><strong>Melhorar:</strong><br/>{contestParticipation.improvementIdeas}</div>} arrow>
                            <TrendingUpIcon fontSize="small" color="primary" />
                        </Tooltip>
                    )}

                    {/* 4. Comments */}
                    {contestParticipation.comments && (
                        <Tooltip title={contestParticipation.comments} arrow>
                            <ChatIcon fontSize="small" color="action" />
                        </Tooltip>
                    )}

                    {/* Se não tiver nada */}
                    {!contestParticipation.goodPoints && !contestParticipation.badPoints && !contestParticipation.improvementIdeas && !contestParticipation.comments && "-"}
                </Stack>
              </TableCell>           

              {/* 5. LINK */}
              <TableCell align='center' onClick={(e) => e.stopPropagation()}> 
                {/* e.stopPropagation() impede que clicar no link abra a página de detalhes da linha */}
                {contestParticipation.link ? (
                  <Tooltip title={contestParticipation.link}>
                    <IconButton 
                      component={MuiLink} 
                      href={contestParticipation.link} 
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
