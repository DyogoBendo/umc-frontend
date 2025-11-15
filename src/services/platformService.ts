import { umcAPI } from "../config/api";
import type { Platform } from "../schemas/entities/platform";

class PlatformService{
    async getAll(params?: Record<string, unknown>): Promise<Platform[]> {
        const response = await umcAPI.get<Platform[]>('/platform', {params, paramsSerializer: {indexes: null}});
        return response.data
    }
}

export default new PlatformService();