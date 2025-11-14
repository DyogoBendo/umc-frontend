import { umcAPI } from "../config/api";
import type { ProblemAttempt } from "../schemas/entities/problemAttempt";

class ProblemAttemptService{
    async getAll(): Promise<ProblemAttempt[]> {
        const response = await umcAPI.get<ProblemAttempt[]>('/problem-attempt');
        return response.data
    }
}

export default new ProblemAttemptService();