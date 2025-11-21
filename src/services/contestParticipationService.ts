import { umcAPI } from "../config/api";
import type { ContestParticipation } from "../schemas/entities/contestParticipation";
import type { ContestParticipationForm } from "../schemas/forms/contestParticipationForm";

class ContestParticipationService{
    async getAll(): Promise<ContestParticipation[]> {
        const response = await umcAPI.get<ContestParticipation[]>('/contest-participation');
        return response.data
    }

    async create(formData: ContestParticipationForm): Promise<ContestParticipation> {
        const response = await umcAPI.post('/contest-participation', formData);        
        return response.data;
    }
}

export default new ContestParticipationService();