import { umcAPI } from "../config/api";
import type { Topic } from "../schemas/entities/topic";

class TopicService{
    async getAll(params?: Record<string, unknown>): Promise<Topic[]> {        
        const response = await umcAPI.get<Topic[]>('/topic', {params, paramsSerializer: {indexes: null}});
        return response.data
    }
}

export default new TopicService();