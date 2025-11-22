import { umcAPI } from "../config/api";
import type { Contest } from "../schemas/entities/contest";

class ContestService{
    async getAll(params?: Record<string, unknown>): Promise<Contest[]> {
        const response = await umcAPI.get<Contest[]>('/contest', {params, paramsSerializer: {indexes: null}});
        return response.data
    }

    async getById(id: number): Promise<Contest>{
        const response = await umcAPI.get<Contest>(`/contest/${id}`);
        return response.data
    }
}

export default new ContestService();