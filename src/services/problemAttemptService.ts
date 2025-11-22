import { umcAPI } from "../config/api";
import type { ProblemAttempt } from "../schemas/entities/problemAttempt";
import type { ProblemAttemptForm } from "../schemas/forms/problemAttemptForm";

class ProblemAttemptService{
    async getAll(params?: Record<string, unknown>): Promise<ProblemAttempt[]> {
        const response = await umcAPI.get<ProblemAttempt[]>('/problem-attempt', {params, paramsSerializer: {indexes: null}});
        console.log("data: ", response.data)
        return response.data
    }

    async create(formData: ProblemAttemptForm): Promise<ProblemAttempt> {
        const response = await umcAPI.post('/problem-attempt', formData);        
        return response.data;
    }
}

export default new ProblemAttemptService();