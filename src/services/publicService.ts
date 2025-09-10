import { publicApi } from "@/api/publicApi";
import { AutoCompleteParams, FindPetByExampleRequest, PageSortParam, PetInfoPaginatedPublicResponse, PetInfoResponse, SearchPageSortParams } from "@/types/petListing";
import { parseApiError } from "./authService";

export const publicService = {
    async fetchPetsPaginatedSorted(data: PageSortParam): Promise<PetInfoPaginatedPublicResponse> {
        try {
            const res = await publicApi.getPetsWithPageSort(data);
            return {
                success: res.data.success,
                message: res.data.message,
                data: res.data.data,
            }
        } catch (err) {
            return { success: false, message: parseApiError(err) };
        }
    },
    async petSearch(data: SearchPageSortParams): Promise<PetInfoPaginatedPublicResponse> {
        try {
            const res = await publicApi.getPetsWithSearch(data);
            return {
                success: res.data.success,
                message: res.data.message,
                data: res.data.data,
            }
        } catch (error) {
            return { success: false, message: parseApiError(error) };
        }
    },
    async petAdvancedSearch(data: FindPetByExampleRequest , params: PageSortParam): Promise<PetInfoPaginatedPublicResponse> {
        try {
            const res = await publicApi.getPetsWithAdvancedSearch(data,params);
            console.log("data being passed",data)
            return {
                success: res.data.success,
                message: res.data.message,
                data: res.data.data,
            }
        } catch (error) {
            return { success: false, message: parseApiError(error) };
        }
    },
    async petById(id?: number): Promise<PetInfoResponse> {
        try {
            const res = await publicApi.getPetById(id);
            return {
                success: res.data.success,
                message: res.data.message,
                data: res.data.data,
            }
        } catch (error) {
            return { success: false, message: parseApiError(error) };
        }
    },
    async searchSuggestions(data: AutoCompleteParams): Promise<string[]> {
        try {
            const res = await publicApi.getAutoComplete(data);
            return res.data
        } catch (error) {
            return [];
        }
    }
}