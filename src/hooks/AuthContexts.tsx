import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router';
import type { Competitor } from '../schemas/entities/competitor';
import type { LoginData } from '../schemas/entities/auth';
import authService from '../services/authService';

interface AuthContextType {
  competitor: Competitor | null;
  isAuthenticated: boolean;
  loading: boolean; // Para não redirecionar antes de checar o localStorage
  signIn: (data: LoginData) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [competitor, setCompetitor] = useState<Competitor | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Para redirecionar após login/logout

  useEffect(() => {
    // Ao carregar a página, verifica se já existe token e usuário salvos
    const storedToken = localStorage.getItem('auth_token');
    const storedCompetitor = localStorage.getItem('auth_competitor');

    if (storedToken && storedCompetitor) {
      setCompetitor(JSON.parse(storedCompetitor));
    }
    setLoading(false);
  }, []);

  async function signIn(data: LoginData) {
    try {
      const response = await authService.login(data);

      const { token, competitor } = response;

      // 1. Salva no localStorage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_competitor', JSON.stringify(competitor));

      // 2. Atualiza o estado
      setCompetitor(competitor);

      // 3. Redireciona
      navigate('/'); // Ou para onde você quiser
    } catch (error) {
      console.error("Erro ao logar", error);
      throw error; // Relança o erro para o form tratar
    }
  }

  function signOut() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_competitor');
    setCompetitor(null);
    navigate('/login');
  }

  return (
    <AuthContext.Provider value={{ 
      competitor, 
      isAuthenticated: !!competitor, 
      loading, 
      signIn, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para facilitar o uso
export const useAuth = () => useContext(AuthContext);