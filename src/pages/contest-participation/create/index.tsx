import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useFieldArray, useForm } from "react-hook-form";
import { contestParticipationFormSchema, type ContestParticipationForm } from "../../../schemas/forms/contestParticipationForm";
import { Box, Paper, Typography, Grid, Stack, IconButton, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import PlatformAutocomplete from "../../../components/platform/autocomplete";
import ProblemSetAutocomplete from "../../../components/problem-set/autocomplete";
import ProblemAutocomplete from "../../../components/problem/autocomplete";
import TopicAutocomplete from "../../../components/topic/autocomplete";
import ContestAutocomplete from "../../../components/contest/autocomplete";
import DeleteIcon from '@mui/icons-material/Delete';

export function ContestParticipationPage(){
    const form = useForm<ContestParticipationForm>({
        resolver: zodResolver(contestParticipationFormSchema),
        defaultValues: {
        contest: null,
        platform: null,
        team: [],
        date: new Date(),
        problemAttempts: [] // Começa vazio ou com um item inicial
        }    
    });
    const { control, handleSubmit, formState: { isSubmitting, errors } } = form;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "problemAttempts" // Nome do campo array no schema    
    });
    const onSubmit = async (data: ContestParticipationForm) => {
        console.log("Contest Data:", data);
        // await contestService.create(data);
    };

    return (
        <FormProvider {...form}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
            
            {/* --- CABEÇALHO DO CONTEST --- */}
            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>Dados do Contest</Typography>
                <Grid container spacing={2}>                    
                    <ContestAutocomplete/>                                    
                    <PlatformAutocomplete />                    
                
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
                    
                </Grid>
            </Paper>

            {/* --- LISTA DE TENTATIVAS --- */}
            <Typography variant="h6" gutterBottom>Problemas</Typography>
            
            <Stack spacing={3}>
            {fields.map((field, index) => (
                <Paper key={field.id} sx={{ p: 3, position: 'relative', borderLeft: '6px solid #1976d2' }}>
                
                {/* Botão de Remover Item (canto superior direito) */}
                <IconButton 
                    onClick={() => remove(index)}
                    color="error"
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <DeleteIcon />
                </IconButton>

                <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary' }}>
                    Problema #{index + 1}
                </Typography>

                <Grid container spacing={2}>
                    {/* LINHA 1: Problem Set e Problema */}
                    
                    <ProblemSetAutocomplete name={`attempts.${index}.problemSet`} />                                        
                    <ProblemAutocomplete 
                        name={`attempts.${index}.problem`} 
                        problemSetFieldName={`attempts.${index}.problemSet`} 
                    />
                        
                    <TopicAutocomplete name={`attempts.${index}.topics`} />                    

                    {/* LINHA 3: Dados numéricos e Checkbox */}
                    {/* ... Adicione inputs de WA, Time, NeededHelp aqui usando Controller ... */}
                    {/* Exemplo simplificado: */}
                    {/* <TextField {...register(`attempts.${index}.wa`)} label="WA" /> */}
                </Grid>
                </Paper>
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
                    competitor: null, // Se tiver
                    neededHelp: false
                })}
                sx={{ mt: 3, mb: 5, width: '100%', borderStyle: 'dashed' }}
            >
                Adicionar Problema
            </Button>

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