import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';
import { Link } from 'react-router';
import { useAuth } from '../../../hooks/AuthContexts';
import { type LoginData, loginSchema } from '../../../schemas/entities/auth';

export default function LoginPage() {
  const { signIn } = useAuth();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      await signIn(data);
    } catch (error) {
        console.log(error)
        alert("Usuário ou senha inválidos");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Login</Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            fullWidth
            label="Username"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Senha"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting}
          >
            Entrar
          </Button>
          <Link to="/register">Não tem conta? Cadastre-se</Link>
        </Box>
      </Paper>
    </Container>
  );
}