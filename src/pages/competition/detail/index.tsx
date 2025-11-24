import { useEffect, useState } from "react";
import { useParams} from "react-router";
import { 
  Container, Grid, Paper, Typography, Box, Stack, Divider, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Avatar 
} from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import dayjs from "dayjs";

// --- SEUS TIPOS ---
import competitionService from "../../../services/competitionService";
import type { CompetitionDetailed } from "../../../schemas/dto/competitionDetailed";
// import competitionService from "../../services/competitionService";

// Tipos auxiliares para este exemplo (substitua pelos seus reais)

export default function CompetitionDetailPage() {    
  const { competitionId } = useParams();  
  const [loading, setLoading] = useState(true);

  // Estados para os dados
  const [competition, setCompetition] = useState<CompetitionDetailed | null>(null);  

  // Simulando busca de dados (Substitua pelos seus services reais)
  useEffect(() => {    
    competitionService.getById(Number(competitionId))
    .then((data) => setCompetition(data))
    .catch((error) => console.error('Error in fetching', error))
    .finally(() => setLoading(false))   

  }, [competitionId]);

  if (loading || !competition) return <Typography sx={{p:4}}>Carregando...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>      

      <Grid container spacing={3}>
        
        {/* === COLUNA ESQUERDA (PRINCIPAL) === */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={3}>
            
            {/* BOX 1: DETALHES DA COMPETIÇÃO */}
            <Paper sx={{ p: 3, borderTop: '4px solid #1976d2' }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {competition.name}
              </Typography>
              
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} mt={2}>
                <Box display="flex" alignItems="center" gap={1}>
                  <CalendarTodayIcon color="action" />
                  <Box>
                    <Typography variant="caption" display="block" color="text.secondary">Início</Typography>
                    <Typography variant="body1">
                      {dayjs(competition.startDate).format('DD/MM/YYYY')}
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                  <AccessTimeIcon color="action" />
                  <Box>
                    <Typography variant="caption" display="block" color="text.secondary">Fim</Typography>
                    <Typography variant="body1">
                      {dayjs(competition.endDate).format('DD/MM/YYYY')}
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                   {/* Status calculado dinamicamente */}
                   <Chip 
                      label={dayjs().isAfter(competition.endDate) ? "Finalizada" : "Em Andamento"} 
                      color={dayjs().isAfter(competition.endDate) ? "default" : "success"}
                      variant="outlined"
                   />
                </Box>
              </Stack>
            </Paper>

            {/* BOX 2: TABELA DE POSIÇÕES (LEADERBOARD) */}
            <Paper sx={{ p: 0, overflow: 'hidden' }}>
              <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
                <Typography variant="h6" display="flex" alignItems="center" gap={1}>
                  <EmojiEventsIcon color="warning" />
                  Classificação Geral
                </Typography>
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" width={60}><strong>#</strong></TableCell>
                      <TableCell><strong>Competidor</strong></TableCell>
                      <TableCell align="center"><strong>Resolvidos</strong></TableCell>
                      <TableCell align="right"><strong>Pontuação</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {competition.rank.map((row, index) => (
                      <TableRow key={row.competitor.id} hover>
                        <TableCell align="center">
                          {index === 1 ? '🥇' : index === 2 ? '🥈' : index === 3 ? '🥉' : index}
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Avatar sx={{ width: 24, height: 24, fontSize: 12 }}>
                                {row.competitor.name.charAt(0)}
                            </Avatar>
                            <Typography variant="body2">{row.competitor.name}</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="center">{row.solvedProblems}</TableCell>
                        <TableCell align="right">
                            <Typography fontWeight="bold" color="primary.main">
                                {row.score.toLocaleString()}
                            </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                    {competition.rank.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={4} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                                Nenhum participante registrado ainda.
                            </TableCell>
                        </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

          </Stack>
        </Grid>

        {/* === COLUNA DIREITA (LATERAL) === */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom sx={{ borderBottom: '1px solid #eee', pb: 1 }}>
              Regras de Pontuação
            </Typography>
            
            <Typography variant="body2" color="text.secondary" paragraph>
              Esta competição utiliza as seguintes configurações de peso:
            </Typography>

            <Stack spacing={2}>
              {competition.competitionEntryTypes.map((item) => (
                <Box 
                    key={item.id} 
                    sx={{ 
                        border: '1px solid #e0e0e0', 
                        borderRadius: 2, 
                        p: 2,
                        bgcolor: 'background.default'
                    }}
                >
                  <Typography variant="subtitle1" fontWeight="bold" color="primary">
                    {item?.entryType?.name}
                  </Typography>
                  
                  <Divider sx={{ my: 1 }} />
                  
                  <Grid container spacing={1}>
                    <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" color="text.secondary">Dificuldade</Typography>
                        <Box>A: <strong>{item?.difficultyA}</strong></Box>
                        <Box>B: <strong>{item?.difficultyB}</strong></Box>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" color="text.secondary">Tempo</Typography>
                        <Box>A: <strong>{item?.timeA}</strong></Box>
                        <Box>B: <strong>{item?.timeB}</strong></Box>
                    </Grid>
                  </Grid>
                </Box>
              ))}
              
              {competition.competitionEntryTypes.length === 0 && (
                  <Typography variant="body2" fontStyle="italic">
                      Nenhuma regra específica definida.
                  </Typography>
              )}
            </Stack>
          </Paper>
        </Grid>

      </Grid>
    </Container>
  );
}