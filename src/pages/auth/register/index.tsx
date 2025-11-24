import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Container, 
  Paper, 
  Stack, 
  Link as MuiLink 
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router";
import authService from "../../../services/authService"; // Importe sua instância do serviço
import { registerFormSchema, type ReegisterFormData } from "../../../schemas/forms/registerForm";


export default function RegisterPage() {
  const navigate = useNavigate();

  // 2. Configuração do Formulário
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<ReegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  // 3. Função de Envio
  const onSubmit = async (data: ReegisterFormData) => {
    try {
      // Chama o serviço que você criou (classe AuthService)
      await authService.register(data);
      
      console.log("Usuário cadastrado com sucesso!");
      
      // Opcional: Mostrar um toast de sucesso aqui
      alert("Cadastro realizado! Faça login para continuar.");

      // Redireciona para o Login
      navigate("/login");
      
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Falha ao realizar cadastro. Tente outro username.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper 
        elevation={3} 
        sx={{ 
          mt: 8, 
          p: 4, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          borderRadius: 2
        }}
      >
        <Typography component="h1" variant="h5" fontWeight="bold" gutterBottom>
          Crie sua conta
        </Typography>
        
        <Typography variant="body2" color="text.secondary" mb={3}>
          Preencha os dados abaixo para começar
        </Typography>

        <Box 
          component="form" 
          onSubmit={handleSubmit(onSubmit)} 
          noValidate 
          sx={{ width: '100%' }}
        >
          <Stack spacing={2}>
            {/* Campo NOME */}
            <TextField
              label="Nome Completo"
              fullWidth
              autoFocus
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            {/* Campo USERNAME */}
            <TextField
              label="Username"
              fullWidth
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
            />

            {/* Campo SENHA */}
            <TextField
              label="Senha"
              type="password"
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </Stack>

          <Stack direction="row" justifyContent="center" mt={3}>
            <Typography variant="body2">
              Já tem uma conta?{' '}
              <MuiLink component={RouterLink} to="/login" fontWeight="bold">
                Faça Login
              </MuiLink>
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}