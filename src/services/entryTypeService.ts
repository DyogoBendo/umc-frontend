import { umcAPI } from "../config/api";
import type { EntryType } from "../schemas/entities/entryType";

class EntryTypeService{
    async getAll(params?: Record<string, unknown>): Promise<EntryType[]> {
        const response = await umcAPI.get<EntryType[]>('/entry-type', {params, paramsSerializer: {indexes: null}});
        return response.data
    }

    async create(formData: EntryType): Promise<EntryType> {
        const response = await umcAPI.post('/entry-type', formData);        
        return response.data;
    }

    async getById(id: number): Promise<EntryType>{
        const response = await umcAPI.get<EntryType>(`/entry-type/${id}`);
        return response.data
    }
}

export default new EntryTypeService();