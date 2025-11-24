import { umcAPI } from "../config/api";
import type { CompetitionDetailed } from "../schemas/dto/competitionDetailed";
import type { Competition } from "../schemas/entities/competition";
import type { CompetitionForm } from "../schemas/forms/competitionForm";

class CompetitionService{
    async join(id: number): Promise<void> {
      await umcAPI.post<CompetitionDetailed>(`/competition/${id}/join`);
    }
    async leave(id: number): Promise<void>{
      await umcAPI.post<CompetitionDetailed>(`/competition/${id}/leave`);
    }
    async getById(id: number): Promise<CompetitionDetailed>{
        const response = await umcAPI.get<CompetitionDetailed>(`/competition/${id}`);
        return response.data
    }

    async getAll(params?: Record<string, unknown>): Promise<Competition[]> {
        const response = await umcAPI.get<Competition[]>('/competition', {params, paramsSerializer: {indexes: null}});
        console.log("data: ", response.data)
        return response.data
    }

    async create(formData: CompetitionForm): Promise<Competition> {
        const response = await umcAPI.post('/competition', formData);        
        return response.data;
    }
}

export default new CompetitionService();