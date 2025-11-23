import type { AuthResponse, LoginData, RegisterData } from "../schemas/entities/auth";
import { umcAPI } from "../config/api";


class AuthService{
    async login(data: LoginData): Promise<AuthResponse> {
      const response = await umcAPI.post('/auth/login', data);
      return response.data;
    }
    
    async register(data: RegisterData): Promise<void>{
      await umcAPI.post('/auth/register', data);
    }
}

export default new AuthService();