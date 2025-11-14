import { umcAPI } from "../config/api";
import type { ProblemSet } from "../schemas/entities/problemSet";

class ProblemSetService{
    async getAll(): Promise<ProblemSet[]> {
        const response = await umcAPI.get<ProblemSet[]>('/problem-set');
        return response.data
    }
}

export default new ProblemSetService();