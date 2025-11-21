import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ProblemAutocomplete from "../../../components/problem/autocomplete";
import ProblemSetAutocomplete from "../../../components/problem-set/autocomplete";
import { problemAttemptFormSchema, type ProblemAttemptForm} from "../../../schemas/forms/problemAttemptForm";
import PlatformAutocomplete from "../../../components/platform/autocomplete";
import { Box, Stack, TextField, FormControlLabel, Checkbox, Button } from "@mui/material";
import CompetitorAutocomplete from "../../../components/competitor/autocomplete";
import problemAttemptService from "../../../services/problemAttemptService";
import { useNavigate } from "react-router";
import TopicAutocomplete from "../../../components/topic/autocomplete";

export function ProblemAttemptCreatePage() {
  const navigate = useNavigate()

  // Keep the entire form object instead of destructuring
  const form = useForm<ProblemAttemptForm>({
    resolver: zodResolver(problemAttemptFormSchema),
    defaultValues: {
      problem: null,      
      competitor: null,     
      problemSet: null, 
      platform: null,
      date: new Date(),
      link: "",
      time: 0,
      wa: 0,
      neededHelp: false,
      topics: []
    }
  });

  // Pegue o 'control' para usar com o Controller
  const { control, handleSubmit, formState: { isSubmitting } } = form;

  const onSubmit = async (data: ProblemAttemptForm) => {         
    try {      
      console.log(data);
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
          <CompetitorAutocomplete/>
          <PlatformAutocomplete />
          <ProblemSetAutocomplete />
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

          {/* --- Campo de Checkbox (neededHelp) --- */}
          <Controller
            name="neededHelp"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...field}
                    checked={field.value} // RHF controla o estado 'checked'
                  />
                }
                label="Precisei de ajuda"
              />
            )}
          />

          <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </Button>

        </Stack>
      </Box>
    </FormProvider>
  );
}