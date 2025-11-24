import { useForm, useFieldArray, FormProvider, Controller, useWatch, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack, TextField, Button, IconButton, Paper, Typography, Grid } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';

// Seus schemas e tipos
import { competitionFormSchema, type CompetitionForm } from "../../../schemas/forms/competitionForm"; 
import UniqueEntryTypeAutocomplete from "../../../components/entry-type/autocomplete-unique";
import competitionService from "../../../services/competitionService";
import { useNavigate } from "react-router";

export function CompetitionCreatePage() {
  const navigate = useNavigate()
  const form = useForm<CompetitionForm>({
    resolver: zodResolver(competitionFormSchema),
    defaultValues: {
      id: null,
      name: "",
      startDate: new Date(),
      endDate: new Date(),
      entryTypes: [] // Lista vazia
    }
  });

    const numericFields: {         
        name: "difficultyA" | "difficultyB" | "timeA" | "timeB"; 
        label: string; 
    }[] = [
        { name: 'difficultyA', label: 'Termo A - Dificuldade' },
        { name: 'difficultyB', label: 'Termo B - Dificuldade' },
        { name: 'timeA', label: 'Termo A - Tempo' },
        { name: 'timeB', label: 'Termo B - Tempo' },
    ];

  const { control, handleSubmit, formState: { isSubmitting } } = form;
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "entryTypes"
  });

  // 1. Espiar todos os 'entryTypes' selecionados em tempo real
  const watchedEntryTypes = useWatch({
    control,
    name: "entryTypes"
  });

  // 2. Criar uma lista de IDs que já foram usados
  // (Filtramos undefined/null para não quebrar)
  const selectedIds = watchedEntryTypes
    ?.map(item => item.entryType?.id)
    .filter((id): id is number => id != null) || [];

  const onSubmit = async (data: CompetitionForm) => {
    console.log("Competition:", data);
    await competitionService.create(data);
    navigate('/competitions')
  };

  return (
    <FormProvider {...form}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
        <Typography variant="h5" gutterBottom>Nova Competição</Typography>
        
        {/* --- DADOS GERAIS --- */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Stack spacing={2}>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <TextField 
                  {...field} label="Nome da Competição" fullWidth 
                  error={!!fieldState.error} helperText={fieldState.error?.message} 
                />
              )}
            />
            <Stack direction="row" spacing={2}>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DatePicker 
                    label="Início" 
                    value={dayjs(field.value)} 
                    onChange={(v) => field.onChange(v?.toDate())} 
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                )}
              />
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DatePicker 
                    label="Fim" 
                    value={dayjs(field.value)} 
                    onChange={(v) => field.onChange(v?.toDate())} 
                    slotProps={{ textField: { fullWidth: true } }}
                  />
                )}
              />
            </Stack>
          </Stack>
        </Paper>

        {/* --- TIPOS DE ENTRADA (PESOS) --- */}
        <Typography variant="h6" gutterBottom>Configuração de Pontuação</Typography>
        
        <Stack spacing={2}>
          {fields.map((field, index) => {
            // 3. Calcular quais IDs excluir PARA ESTA LINHA ESPECÍFICA
            // Queremos excluir todos os selecionados, MENOS o que já está selecionado nesta linha
            // (senão o valor atual some da lista de opções)
            const currentItemId = watchedEntryTypes?.[index]?.entryType?.id;
            const idsToExclude = selectedIds.filter(id => id !== currentItemId);

            return (
              <Paper key={field.id} sx={{ p: 2, position: 'relative', borderLeft: '4px solid orange' }}>
                <IconButton 
                  onClick={() => remove(index)} 
                  color="error" 
                  sx={{ position: 'absolute', top: 0, right: 0 }}
                >
                  <DeleteIcon />
                </IconButton>

                <Grid container spacing={2} alignItems="center">
                  {/* COLUNA 1: O Autocomplete Filtrado */}
                  <Grid size={{ xs: 12, md: 4 }}>
                    <UniqueEntryTypeAutocomplete 
                      name={`entryTypes.${index}.entryType`}
                      excludeIds={idsToExclude} // Passamos a lista de "proibidos"
                    />
                  </Grid>

                  {/* COLUNA 2: Campos Numéricos (Pesos) */}
                  <Grid size={{ xs: 12, md: 8 }}>
                    <Grid container spacing={2}>
                      {numericFields.map(col => (
                        <Grid size={{ xs: 6 }} key={col.name}>
                          <Controller
                            name={`entryTypes.${index}.${col.name}` as Path<CompetitionForm>}
                            control={control}
                            render={({ field }) => (
                              <TextField 
                                {...field} 
                                label={col.label} 
                                type="number" 
                                size="small"
                                onChange={(e) => field.onChange(Number(e.target.value))}
                              />
                            )}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            );
          })}
        </Stack>

        <Button 
          startIcon={<AddIcon />} 
          variant="outlined" 
          sx={{ mt: 2, mb: 4, width: '100%', borderStyle: 'dashed' }}
          onClick={() => append({ 
            id: null, 
            entryType: null, // Começa sem tipo
            difficultyA: 1, difficultyB: 0, // Valores padrão
            timeA: 1, timeB: 0 
          })}
        >
          Adicionar Tipo de Entrada
        </Button>

        <Button type="submit" variant="contained" size="large" fullWidth disabled={isSubmitting}>
          Salvar Competição
        </Button>

      </Box>
    </FormProvider>
  );
}