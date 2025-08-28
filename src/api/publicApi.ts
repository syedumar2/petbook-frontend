
import { AutoCompleteParams, FindPetByExampleRequest, PageSortParam, PetFilters, SearchPageSortParams } from "@/types/petListing";
import { publicInstance } from "./axios";

export const publicApi = {
    getPetsWithPageSort: (data: PageSortParam) => {
        return publicInstance.get("/pets/get/page-sort",
            {
                params: {
                    page: data.page ?? 0,
                    size: data.size ?? 20,
                    sortField: data.sortField ?? "name",
                    sortDirection: data.sortDirection ?? "asc",

                }
            }
        )
    },
    getPetsWithSearch: (data: SearchPageSortParams) => {
        return publicInstance.get("/pets/search", {
            params: {
                name: data.name,
                type: data.type,
                breed: data.breed,
                location: data.location,
                page: data.page ?? 0,
                size: data.size ?? 20,
                sortField: data.sortField ?? "name",
                sortDirection: data.sortDirection ?? "asc",
            }
        })
    },
    getPetsWithAdvancedSearch: (data: FindPetByExampleRequest, params: PageSortParam) => {
        return publicInstance.post("/pets/get", data,{
            params : {
                page: params.page ?? 0,
                size: params.size ?? 20,
                sortField: params.sortField ?? "name",
                sortDirection: params.sortDirection ?? "asc",
            }
        });
    },
    getPetById: (id?: number) => {
        return publicInstance.get(`/pets/getById/${id}`)
    },

    getAutoComplete: (data: AutoCompleteParams) => {
         return publicInstance.get("/pets/autocomplete", {
            params: data
         });
    },






}