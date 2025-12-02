import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useFieldArray, useForm, type FieldErrors } from "react-hook-form";
import { contestParticipationFormSchema, type ContestParticipationForm } from "../../../schemas/forms/contestParticipationForm";
import { Box, Paper, Typography, Stack, IconButton, Button, TextField, Checkbox, FormControlLabel, Grid, Rating, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import PlatformAutocomplete from "../../../components/platform/autocomplete";
import ProblemSetAutocomplete from "../../../components/problem-set/autocomplete";
import ProblemAutocomplete from "../../../components/problem/autocomplete";
import TopicAutocomplete from "../../../components/topic/autocomplete";
import ContestAutocomplete from "../../../components/contest/autocomplete";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import TeamAutocomplete from "../../../components/competitor/team-autocomplete";
import contestParticipationService from "../../../services/contestParticipationService";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import contestProblemService from "../../../services/contestProblemService";
import type { ProblemAttemptForm } from "../../../schemas/forms/problemAttemptForm";
import EntryTypeAutocomplete from "../../../components/entry-type/autocomplete";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CompetitorAutocomplete from "../../../components/competitor/autocomplete";

export function ContestParticipationCreatePage(){
    const navigate = useNavigate()
    const form = useForm<ContestParticipationForm>({
        resolver: zodResolver(contestParticipationFormSchema),
        defaultValues: {
        contest: null,
        platform: null,
        team: [],
        date: new Date(),
        link: '',
        problemAttempts: [],
        goodPoints:'',
        badPoints:'',
        comments:'',
        improvementIdeas:'',
        }    
    });
    const { control, watch, handleSubmit, formState: { isSubmitting,  } } = form;
    const { fields, append, remove, replace } = useFieldArray({
        control,
        name: "problemAttempts"

    });

    const difficultyFields: { 
        name: keyof ProblemAttemptForm; // Isso diz: "Só aceito chaves válidas do formulário"
        label: string; 
    }[] = [
        { name: 'theoryDifficulty', label: 'Teoria' },
        { name: 'observationDifficulty', label: 'Observação' },
        { name: 'implementationDifficulty', label: 'Implementação' },
        { name: 'generalDifficulty', label: 'Geral' },
    ];


    // 2. Observe o campo 'contest'
    const selectedContest = watch("contest");

    useEffect(() => {
        const fetchContestProblems = async () => {
            // Caso A: O usuário limpou o campo ou digitou um texto novo (string)
            if (!selectedContest || selectedContest.id === null) {
                // Opção: Limpar a lista de problemas para começar do zero
                replace([]); 
                return;
            }

            // Caso B: É um objeto Contest válido (tem ID)
            if (selectedContest.id) {
                try {
                    // Busca os problemas vinculados a esse contest
                    const contestProblems = await contestProblemService.getAll({ contestId: selectedContest.id });
                    
                    // Ordena (opcional, mas recomendado)
                    const sortedProblems = contestProblems.sort((a, b) => Number(a.position) - Number(b.position));

                    // Mapeia para o formato do seu formulário (ProblemAttemptForm)
                    const newAttempts = sortedProblems.map(cp => ({
                        // Preenche os dados que vêm do banco
                        problem: cp.problem,
                        problemSet: cp.problem?.problemSet || null, 
                        
                        // Inicializa o resto com valores padrão
                        topics: [],
                        platform: null, 
                        competitor: null,
                        neededHelp: false,
                        wa: 0,
                        time: 0,
                        theoryDifficulty: 0,
                        observationDifficulty: 0,
                        implementationDifficulty: 0,
                        generalDifficulty: 0,
                        entryType: null,                                
                        tricks:null,
                        generalIdea:null,
                        comments:null,
                        solved:false,
                    }));

                    // SUBSTITUI a lista atual pela nova lista
                    replace(newAttempts);

                } catch (error) {
                    console.error("Erro ao buscar problemas do contest:", error);
                    // Em caso de erro, talvez não queira limpar, ou queira avisar
                }
            }
        };

        fetchContestProblems();

    }, [selectedContest, replace]); // Executa sempre que o contest mudar

    const onSubmit = async (data: ContestParticipationForm) => {
        try {      
              console.log(data);
              // Se não temos ID, estamos criando
              await contestParticipationService.create(data);
              console.log("Participação criada com sucesso!");
              navigate('/problem-attempts')
              // (Opcional: limpar o formulário após criar)
              // form.reset(); 
            } catch (error) {
              console.error("Falha ao salvar a Participação:", error);
              // (Opcional: mostrar um 'toast' de erro para o usuário)
            }
    };

    const onError = (errors: FieldErrors<ContestParticipationForm>) => {
        // console.dir ajuda a expandir objetos aninhados grandes no console
        console.dir(errors, { depth: null }); 
        
        console.error("Campos inválidos:", errors);
        
        // Exemplo: Se houver erro no problemAttempts
        if (errors.problemAttempts) {
            console.log("Erros na lista de problemas:", errors.problemAttempts);
        }
    };

    return (
        <FormProvider {...form}>
        <Box 
            component="form" 
            onSubmit={handleSubmit(onSubmit, onError)} 
            sx={{ width: '80%', maxWidth: 1200, mx: 'auto', mt: 4 }} 
            onKeyDown={(e) => {
                // Verifica se a tecla é Enter
                if (e.key === "Enter") {
                // Impede o comportamento padrão (que seria enviar o form)
                e.preventDefault();
                }
            }}>            
                
            {/* --- CABEÇALHO DO CONTEST --- */}
            <Stack spacing={2.5}>
                <Typography variant="h6" gutterBottom>Dados do Contest</Typography>                                        
                    <ContestAutocomplete/>                                    
                    <PlatformAutocomplete />                    
                    <TeamAutocomplete />
                    <EntryTypeAutocomplete isFromContest={true} />
                
                    <Controller
                        name="date"
                        control={control}
                        render={({ field, fieldState }) => (
                        <DatePicker
                            label="Data"
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(val) => field.onChange(val?.toDate())}
                            slotProps={{ 
                                textField: { 
                                    fullWidth: true, 
                                    error: !!fieldState.error,
                                    helperText: fieldState.error?.message
                                } 
                            }}
                        />
                        )}
                    />

                <Controller
                    name="link"
                    control={control}
                    render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        label="Link (Opcional)"
                        type="url"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                    )}
                />                                

            {/* --- LISTA DE TENTATIVAS --- */}
                <Typography variant="h6" gutterBottom>Problemas</Typography>
            </Stack>
            
            <Stack spacing={3}>
                {fields.map((field, index) => (
                    <Accordion key={field.id} sx={{ p: 3, position: 'relative', borderLeft: '6px solid #1976d2' }}>                       
                        {/* Botão de Remover Item (canto superior direito) */}

                        <AccordionSummary>
                        <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
                            Problema #{index + 1}
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            
                        <IconButton 
                            onClick={() => remove(index)}
                            color="error"
                            sx={{ position: 'absolute', top: 8, right: 8 }}
                            >
                            <DeleteIcon />
                        </IconButton>

                                                 
                            <Stack spacing={2}>
                                <Stack spacing={2.5} direction={"row"}>
                                    {/* LINHA 1: Problem Set e Problema */}
                                    
                                    <Box sx={{ flex: 1 }}>
                                        <ProblemAutocomplete 
                                            name={`problemAttempts.${index}.problem`} 
                                            problemSetFieldName={`problemAttempts.${index}.problemSet`} 
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <ProblemSetAutocomplete name={`problemAttempts.${index}.problemSet`} />                                                                
                                    </Box>                                                                                                
                                </Stack>                  

                                <CompetitorAutocomplete name={`problemAttempts.${index}.competitor`}/> 
                                {/* NOVA SEÇÃO: STATUS SOLVED (Em destaque no final do card) */}
                                <Paper variant="outlined" sx={{ p: 1, mt: 2, display: 'flex', justifyContent: 'space-around', bgcolor: '#f9f9f9' }}>
                                    <Controller
                                        name={`problemAttempts.${index}.solved`}
                                        control={control}
                                        render={({ field }) => (
                                            <FormControlLabel
                                            control={
                                                <Checkbox
                                                {...field}
                                                checked={field.value}
                                                icon={<CheckCircleOutlineIcon fontSize="medium" />}
                                                checkedIcon={<CheckCircleIcon fontSize="medium" color="success" />}
                                                />
                                            }
                                            label={<Typography fontWeight="bold" color={field.value ? "success.main" : "text.secondary"}>Problema Resolvido (AC)</Typography>}
                                            />
                                        )}
                                    />
                                     <Controller
                                        name={`problemAttempts.${index}.neededHelp`}
                                        control={control}
                                        render={({ field }) => (
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        {...field}
                                                        checked={field.value}
                                                    />
                                                }
                                                label="Precisei de ajuda"
                                            />
                                        )}
                                    />
                                </Paper>         
                                <Stack spacing={2.5} direction={"row"}>
                                    <Box sx={{ flex: 1 }}>
                                        <Controller
                                            name={`problemAttempts.${index}.wa`} // <--- Nome dinâmico
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <TextField
                                                    {...field}
                                                    label="WA"
                                                    type="number"
                                                    fullWidth
                                                    error={!!fieldState.error}
                                                    helperText={fieldState.error?.message}
                                                    // Converte string para number
                                                    onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                                                />
                                            )}
                                        />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Controller
                                            name={`problemAttempts.${index}.time`}
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <TextField
                                                    {...field}
                                                    label="Time (min)"
                                                    type="number"
                                                    fullWidth
                                                    error={!!fieldState.error}
                                                    helperText={fieldState.error?.message}
                                                    onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                                                />
                                            )}
                                        />
                                    </Box>
                                    
                                   
                                </Stack>
                                {/* --- NOVA SEÇÃO: DIFICULDADES --- */}
                                <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 1, p: 2 }}>
                                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                                    Avaliação de Dificuldade (0-5)
                                    </Typography>
                                    
                                <Grid container spacing={2}>
                                    {/* Agora fazemos o map na variável tipada */}
                                    {difficultyFields.map((item) => (
                                        <Grid size={{ xs: 6 }} key={item.name}>
                                        <Controller
                                            name={`problemAttempts.${index}.${item.name}`}
                                            control={control}
                                            render={({ field }) => (
                                            <Box display="flex" flexDirection="column">
                                                <Typography component="legend" variant="caption">
                                                {item.label}
                                                </Typography>
                                                <Rating
                                                name={`problemAttempts.${index}.${item.name}`}
                                                value={Number(field.value) || 0} // Converte null para 0 visualmente
                                                onChange={(_, newValue) => {
                                                    field.onChange(newValue); // newValue pode ser null (se limpar) ou number
                                                }}
                                                />
                                            </Box>
                                            )}
                                        />
                                        </Grid>
                                    ))}
                                    </Grid>
                                </Box>

                                <TopicAutocomplete name={`problemAttempts.${index}.topics`} />      

                                {/* NOVA SEÇÃO: NOTAS E TEXTOS */}
                                <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 1, p: 2, mt: 2 }}>
                                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                                        Notas & Anotações
                                    </Typography>
                                    
                                    <Stack spacing={2}>
                                        <Controller
                                            name={`problemAttempts.${index}.generalIdea`}
                                            control={control}
                                            render={({ field }) => (
                                            <TextField 
                                                {...field} 
                                                label="Ideia Geral / Solução" 
                                                multiline 
                                                rows={2} 
                                                fullWidth 
                                                placeholder="Descreva a lógica principal..."
                                            />
                                            )}
                                        />

                                        <Grid container spacing={2}>
                                            <Grid size={{ xs: 12, md: 6 }}>
                                                <Controller
                                                    name={`problemAttempts.${index}.tricks`}
                                                    control={control}
                                                    render={({ field }) => (
                                                    <TextField 
                                                        {...field} 
                                                        label="Truques / Corner Cases" 
                                                        multiline 
                                                        rows={2} 
                                                        fullWidth 
                                                    />
                                                    )}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, md: 6 }}>
                                                <Controller
                                                    name={`problemAttempts.${index}.comments`}
                                                    control={control}
                                                    render={({ field }) => (
                                                    <TextField 
                                                        {...field} 
                                                        label="Comentários Extras" 
                                                        multiline 
                                                        rows={2} 
                                                        fullWidth 
                                                    />
                                                    )}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Stack>
                                </Box>

                                                                
                            </Stack>
                            </AccordionDetails>                          
                    </Accordion>
                ))}
            </Stack>
            
            {/* Botão para Adicionar Novo Item */}
            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => append({ 
                    // Valores padrão para um NOVO item
                    problem: null, 
                    problemSet: null, 
                    topics: [],
                    platform: null,
                    competitor: null, // Se tiver
                    neededHelp: false,
                    wa: 0,
                    time: 0,
                    theoryDifficulty: 0,
                    observationDifficulty: 0,
                    implementationDifficulty: 0,
                    generalDifficulty: 0,
                    entryType: null,
                    tricks:null,
                    generalIdea:null,
                    comments:null,
                    solved:false,
                })}
                sx={{ mt: 3, mb: 5, width: '100%', borderStyle: 'dashed' }}
            >
                Adicionar Problema
            </Button>

            {/* --- SEÇÃO: REFLEXÃO E FEEDBACK --- */}
            <Paper sx={{ p: 3, mt: 4, mb: 3, bgcolor: '#fafafa', border: '1px solid #e0e0e0' }}>
                <Typography variant="h6" gutterBottom color="primary">
                    Reflexão Pós-Prova
                </Typography>
                
                <Grid container spacing={3}>
                    {/* Linha 1: Pontos Positivos e Negativos */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Controller
                            name="goodPoints"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Pontos Positivos / O que deu certo?"
                                    multiline
                                    rows={3}
                                    fullWidth
                                    placeholder="Ex: Comunicação do time, estratégia inicial..."
                                    color="success"
                                    focused={!!field.value} // Destaque visual sutil
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Controller
                            name="badPoints"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Pontos Negativos / O que deu errado?"
                                    multiline
                                    rows={3}
                                    fullWidth
                                    placeholder="Ex: Bugs bobos, leitura errada, falta de templates..."
                                    color="error"
                                    focused={!!field.value}
                                />
                            )}
                        />
                    </Grid>

                    {/* Linha 2: Melhorias e Comentários */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Controller
                            name="improvementIdeas"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Ideias para Melhorar (Action Items)"
                                    multiline
                                    rows={3}
                                    fullWidth
                                    placeholder="O que treinar para a próxima?"
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 12 }}>
                        <Controller
                            name="comments"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Comentários Gerais"
                                    multiline
                                    rows={2}
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </Paper>

            {/* Botão Salvar Geral */}
            <Button 
                type="submit" 
                variant="contained" 
                size="large" 
                fullWidth
                disabled={isSubmitting}
            >
                Salvar Contest
            </Button>

        </Box>
        </FormProvider>
    );
}