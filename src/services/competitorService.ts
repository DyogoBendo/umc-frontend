    import { umcAPI } from "../config/api";
import type { Competitor } from "../schemas/entities/competitor";

class CompetitorService{
    async getAll(params?: Record<string, unknown>): Promise<Competitor[]> {
        const response = await umcAPI.get<Competitor[]>('/competitor', {params, paramsSerializer: {indexes: null}});
        return response.data
    }
}

export default new CompetitorService();