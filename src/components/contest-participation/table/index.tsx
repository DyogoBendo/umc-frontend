import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper, Chip, IconButton, Stack, Tooltip, Link as MuiLink} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate } from 'react-router';
import type { ContestParticipation } from '../../../schemas/entities/contestParticipation';


interface TableProps{
  contestParticipations: ContestParticipation[];
}

export default function ContestParticipationTable({contestParticipations}: TableProps) {
  const navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Prova</strong></TableCell>            
            <TableCell><strong>Time</strong></TableCell>            
            <TableCell><strong>Data</strong></TableCell>            
            <TableCell><strong>Plataforma</strong></TableCell>            
            <TableCell><strong>Tipo</strong></TableCell>            
            <TableCell><strong>Link</strong></TableCell>            
          </TableRow>
        </TableHead>
        <TableBody>
          {contestParticipations.map((contestParticipation) => (
            <TableRow 
            key={contestParticipation.id}
            onClick={() => navigate(`/contest-participations/${contestParticipation.id}`)}
            sx={{ cursor: 'pointer' }}
            >
              <TableCell>{contestParticipation?.contest?.title}</TableCell>              
              {/* 2. TIME (Array de Competidores) */}
              <TableCell>
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
              <TableCell>
                {contestParticipation.date 
                  ? new Date(contestParticipation.date).toLocaleDateString() 
                  : "-"}
              </TableCell>  

              {/* 3. PLATAFORMA */}
              <TableCell>{contestParticipation?.platform?.name ?? "-"}</TableCell>              
              <TableCell>{contestParticipation?.entryType?.name ?? "-"}</TableCell>              

              {/* 5. LINK */}
              <TableCell onClick={(e) => e.stopPropagation()}> 
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
