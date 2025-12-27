import { gathererAPI } from "../config/api";
import type { ContestParticipationGathered } from "../schemas/dto/contestParticipationGathered";

class ContestParticipationGathererService{
    async importFromUrl(url: string, username: string | undefined): Promise<ContestParticipationGathered> {
        const params = {
            url: url,
            handle: username
        };

        const response = await gathererAPI.get<ContestParticipationGathered>('/extract-contest', {params});
        return response.data
    }

}

export default new ContestParticipationGathererService();