import { umcAPI } from "../config/api";
import type { ProblemSet } from "../schemas/entities/problemSet";

class ProblemSetService{
    async getAll(params?: Record<string, unknown>): Promise<ProblemSet[]> {        
        const response = await umcAPI.get<ProblemSet[]>('/problem-set', {params, paramsSerializer: {indexes: null}});
        return response.data
    }
}

export default new ProblemSetService();