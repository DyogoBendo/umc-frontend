import { Navigate, Outlet } from 'react-router';
import { CircularProgress, Box } from '@mui/material';
import { useAuth } from '../../../hooks/AuthContexts';

export function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  // Se está autenticado, renderiza as rotas filhas (Outlet)
  // Se não, manda para o login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}