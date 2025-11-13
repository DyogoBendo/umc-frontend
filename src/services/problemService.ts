import { umcAPI } from "../config/api";
import type { Problem } from "../schemas/entities/problem";

class ProblemService{
    async getAll(): Promise<Problem[]> {
        const response = await umcAPI.get<Problem[]>('/problem');
        return response.data
    }
}

export default new ProblemService();