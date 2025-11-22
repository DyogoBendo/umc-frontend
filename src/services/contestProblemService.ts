import { umcAPI } from "../config/api";
import type { ContestProblem } from "../schemas/entities/contestProblem";

class ContestProblemService{
    async getAll(params?: Record<string, unknown>): Promise<ContestProblem[]> {        
        const response = await umcAPI.get<ContestProblem[]>('/contest-problem', {params, paramsSerializer: {indexes: null}});
        return response.data
    }
}

export default new ContestProblemService();