import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ProblemAutocomplete from "../../../components/problem/autocomplete-byproblemset";
import ProblemSetAutocomplete from "../../../components/problem-set/autocomplete";
import { problemAttemptFormSchema, type ProblemAttemptForm} from "../../../schemas/forms/problemAttemptForm";
import PlatformAutocomplete from "../../../components/platform/autocomplete";
import { Box, Stack, TextField, FormControlLabel, Checkbox, Button, Rating, Grid, Typography, Paper} from "@mui/material";
import problemAttemptService from "../../../services/problemAttemptService";
import { useNavigate } from "react-router";
import TopicAutocomplete from "../../../components/topic/autocomplete";
import { useAuth } from "../../../hooks/AuthContexts";
import EntryTypeAutocomplete from "../../../components/entry-type/autocomplete";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export function ProblemAttemptCreatePage() {
  const { competitor } = useAuth();
  const navigate = useNavigate()

  const difficultyFields: { 
    name: keyof ProblemAttemptForm; // Isso diz: "Só aceito chaves válidas do formulário"
    label: string; 
  }[] = [
    { name: 'theoryDifficulty', label: 'Teoria' },
    { name: 'observationDifficulty', label: 'Observação' },
    { name: 'implementationDifficulty', label: 'Implementação' },
    { name: 'generalDifficulty', label: 'Geral' },
  ];

  // Keep the entire form object instead of destructuring
  const form = useForm<ProblemAttemptForm>({
    resolver: zodResolver(problemAttemptFormSchema),
    defaultValues: {
      problem: null,      
      competitor: competitor,     
      problemSet: null, 
      platform: null,
      date: new Date(),
      link: "",
      time: 0,
      wa: 0,
      neededHelp: false,
      topics: [],
      theoryDifficulty: 0,
      observationDifficulty: 0,
      implementationDifficulty: 0,
      generalDifficulty: 0,
      entryType: null
    }
  });

  // Pegue o 'control' para usar com o Controller
  const { control, handleSubmit, formState: { isSubmitting } } = form;

  const onSubmit = async (data: ProblemAttemptForm) => {         
    try {          
      // Se não temos ID, estamos criando      
      await problemAttemptService.create(data);
      console.log("Tentativa criada com sucesso!");
      navigate('/problem-attempts')
      // (Opcional: limpar o formulário após criar)
      // form.reset(); 
    } catch (error) {
      console.error("Falha ao salvar a tentativa:", error);
      // (Opcional: mostrar um 'toast' de erro para o usuário)
    }
  };

  const onError = (errorList: unknown) => {    
    console.log(form)
    console.warn("Validação falhou:", errorList);
  };

  return (
    <FormProvider {...form}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit, onError)}
        sx={{ width: '100%', maxWidth: 500, margin: 'auto' }}
      >
        <Stack spacing={2.5}> {/* Define o espaçamento vertical */}

          {/* Seus Autocompletes. (Veja a Seção 4!) */}                    
          <PlatformAutocomplete />
          <EntryTypeAutocomplete />
          <ProblemSetAutocomplete name="problemSet"  />
          <ProblemAutocomplete />
          <TopicAutocomplete />

          {/* --- Campo de Data (DatePicker) --- */}
          <Controller
            name="date"
            control={control}
            render={({ field, fieldState }) => (
              <DatePicker
                label="Data da Tentativa"
                value={field.value ? dayjs(field.value) : null} // Correto
                onChange={(newValue) => { // Correto
                  field.onChange(newValue ? newValue.toDate() : null);
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                  },
                }}
                // --- FIM DA CORREÇÃO ---
              />
            )}
          />

          {/* --- Campo de Link (TextField) --- */}
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

          {/* --- Campo de Tempo (TextField Numérico) --- */}
          <Controller
            name="time"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Tempo (min)"
                type="number"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                // Converte a string do input de volta para número
                onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
              />
            )}
          />

          {/* --- Campo de WA (TextField Numérico) --- */}
          <Controller
            name="wa"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Wrong Attempts (WAs)"
                type="number"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
              />
            )}
          />

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
                    name={item.name}
                    control={control}
                    render={({ field }) => (
                      <Box display="flex" flexDirection="column">
                        <Typography component="legend" variant="caption">
                          {item.label}
                        </Typography>
                        <Rating
                          name={item.name}
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

          {/* --- NOVA SEÇÃO: STATUS (SOLVED) & AJUDA --- */}
          <Paper variant="outlined" sx={{ p: 2, display: 'flex', justifyContent: 'space-around', bgcolor: '#f9f9f9' }}>
            
            {/* Checkbox SOLVED (Customizado para destaque) */}
            <Controller
                name="solved"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        icon={<CheckCircleOutlineIcon fontSize="large" />}
                        checkedIcon={<CheckCircleIcon fontSize="large" color="success" />}
                      />
                    }
                    label={<Typography fontWeight="bold" color={field.value ? "success.main" : "text.secondary"}>Problema Resolvido (AC)</Typography>}
                  />
                )}
            />

            {/* Checkbox NEEDED HELP */}
            <Controller
              name="neededHelp"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value} />}
                  label="Precisei de ajuda"
                />
              )}
            />
          </Paper>

          {/* --- NOVA SEÇÃO: NOTAS E TEXTOS --- */}
          <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 1, p: 2 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
              Notas & Anotações
            </Typography>
            
            <Stack spacing={2}>
                <Controller
                    name="generalIdea"
                    control={control}
                    render={({ field }) => (
                    <TextField 
                        {...field} 
                        label="Ideia Geral / Solução" 
                        multiline 
                        rows={3} 
                        fullWidth 
                        placeholder="Descreva a lógica principal..."
                    />
                    )}
                />

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="tricks"
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
                            name="comments"
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

          <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </Button>

        </Stack>
      </Box>
    </FormProvider>
  );
}