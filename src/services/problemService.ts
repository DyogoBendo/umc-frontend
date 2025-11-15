import { umcAPI } from "../config/api";
import type { Problem } from "../schemas/entities/problem";

class ProblemService{
    async getAll(params?: Record<string, unknown>): Promise<Problem[]> {        
        const response = await umcAPI.get<Problem[]>('/problem', {params, paramsSerializer: {indexes: null}});
        return response.data
    }
}

export default new ProblemService();