import { umcAPI } from "../config/api";
import type { ProblemAttempt } from "../schemas/entities/problemAttempt";
import type { ProblemAttemptForm } from "../schemas/forms/problemAttemptForm";

class ProblemAttemptService{
    async getAll(): Promise<ProblemAttempt[]> {
        const response = await umcAPI.get<ProblemAttempt[]>('/problem-attempt');
        return response.data
    }

    async create(formData: ProblemAttemptForm): Promise<ProblemAttempt> {
        const response = await umcAPI.post('/problem-attempt', formData);        
        return response.data;
    }
}

export default new ProblemAttemptService();