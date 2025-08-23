import { publicService } from "@/services/publicService";
import { PageSortParam, PetInfoPaginatedPublicResponse, SearchPageSortParams } from "@/types/petListing";
import {  useQuery } from "@tanstack/react-query";


export const useSearchPets = (params: SearchPageSortParams, enabled:boolean) => {
    return useQuery<PetInfoPaginatedPublicResponse, Error>(
        {
            queryKey: ["pets", params],
            queryFn: () => publicService.petSearch(params),
            staleTime: 5 * 60 * 1000,
            enabled




        }
    );

};
