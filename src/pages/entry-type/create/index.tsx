import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Stack, Button, Typography, Paper, Box, TextField, FormControlLabel, Checkbox } from "@mui/material";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import SaveIcon from '@mui/icons-material/Save';
import { entryTypeSchema, type EntryType } from "../../../schemas/entities/entryType";
import entryTypeService from "../../../services/entryTypeService";

export function EntryTypeCreatePage() {
    const navigate = useNavigate();

    const form = useForm<EntryType>({
        resolver: zodResolver(entryTypeSchema),
        defaultValues: {
            id: null,
            name: "",
            fromContest: false, // Valor padrão para o checkbox
        }
    });

    const { control, handleSubmit, formState: { isSubmitting } } = form;

    const onSubmit = async (data: EntryType) => {
        try {
            console.log(data);
            await entryTypeService.create(data);
            console.log("Entry Type criado com sucesso!");
            
            // Redirecionar para a lista após salvar
            navigate('/entry-types'); 
        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Erro ao salvar o tipo de entrada.");
        }
    };

    return (
        <FormProvider {...form}>
            <Container maxWidth="sm" sx={{ mt: 4 }}>               
                <Typography variant="h5" component="h1" fontWeight="bold">
                    Novo Tipo de Entrada
                </Typography>

                <Paper elevation={3} sx={{ p: 4 }}>
                    <Box 
                        component="form" 
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
                        <Stack spacing={3}>
                            
                            {/* Campo Nome (Texto) */}
                            <Controller
                                name="name"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        label="Nome"
                                        placeholder="Ex: Prática, Competição Oficial..."
                                        fullWidth
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        autoFocus // Foca automaticamente ao abrir a página
                                    />
                                )}
                            />

                            {/* Campo IsFromContest (Checkbox) */}
                            <Controller
                                name="fromContest"
                                control={control}
                                render={({ field }) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                {...field}
                                                checked={field.value ? field.value : false} // Checkbox usa 'checked', não 'value'
                                            />
                                        }
                                        label="É originado de um Contest?"
                                    />
                                )}
                            />

                            {/* Botão Salvar */}
                            <Button 
                                type="submit" 
                                variant="contained" 
                                size="large" 
                                startIcon={<SaveIcon />}
                                disabled={isSubmitting}
                                fullWidth
                            >
                                {isSubmitting ? "Salvando..." : "Salvar"}
                            </Button>

                        </Stack>
                    </Box>
                </Paper>
            </Container>
        </FormProvider>
    );
}