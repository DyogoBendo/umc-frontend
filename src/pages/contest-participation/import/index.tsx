import { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Button, Container, Paper, TextField, Typography, Alert, CircularProgress } from "@mui/material";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useAuth } from "../../../hooks/AuthContexts"; // Para pegar o username
import type { ContestParticipationForm } from "../../../schemas/forms/contestParticipationForm";
import contestParticipationGathererService from "../../../services/contestParticipationGathererService";

export default function ContestImportPage() {
    const navigate = useNavigate();
    const { competitor } = useAuth(); // Assume que competitor tem um campo 'handle' ou 'username'
    
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImport = async () => {
        if (!url) return;
        setLoading(true);
        setError(null);

        try {            
            const data = await contestParticipationGathererService.importFromUrl(url, competitor?.codeforcesHandle);
            
            const formData: Partial<ContestParticipationForm> = {
            contest: { title: data.contest.title, id: data.contest.id } as any, 
            date: new Date(),
            platform: null, 
                        
            goodPoints: "",
            badPoints: "",  
            improvementIdeas: "",
            comments: "", 
            link: url,

            problemAttempts: data.problemAttempts.map(item => ({                
                problem: { title: item.problem.title, id: item.problem.id , problemSet: {name: item.problem.problemSet.name, id: item.problem.problemSet.id}} as any,
                problemSet: { name: item.problem.problemSet.name, id: item.problem.problemSet.id } as any,
                                
                solved: item.solved,
                wa: item.wa ?? 0,
                time: item.time ?? 0,
                                
                competitor: null, 
                platform: null,                 
                date: new Date(),               
                link: url,
                                
                neededHelp: false,
                topics: [],
                entryType: null,
                theoryDifficulty: 0,
                observationDifficulty: 0,
                implementationDifficulty: 0,
                generalDifficulty: 0,
                                
                generalIdea: "",
                tricks: "",
                comments: "" 
                                
                }))
            };

            // 3. Navega para a página de criação enviando os dados no STATE
            navigate('/contest-participations/new', { state: { importedData: formData } });

        } catch (err) {
            console.error(err);
            setError("Falha ao importar dados. Verifique a URL e tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
                <CloudDownloadIcon color="primary" sx={{ fontSize: 60, mb: 2 }} />
                <Typography variant="h5" gutterBottom>Importar Competição</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Cole o link do contest (ex: Codeforces) para preencher automaticamente seus problemas e status.
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <TextField 
                    label="URL da Competição" 
                    fullWidth 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://codeforces.com/contest/2179"
                    disabled={loading}
                    sx={{ mb: 3 }}
                />

                <Button 
                    variant="contained" 
                    size="large" 
                    fullWidth 
                    onClick={handleImport}
                    disabled={loading || !url}
                    startIcon={loading ? <CircularProgress size={20} color="inherit"/> : <CloudDownloadIcon />}
                >
                    {loading ? "Importando..." : "Carregar Dados"}
                </Button>
            </Paper>
        </Container>
    );
}