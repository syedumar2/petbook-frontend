import { publicService } from "@/services/publicService";
import { PageSortParam, PetInfoPaginatedPublicResponse } from "@/types/petListing";
import { useQuery } from "@tanstack/react-query";


interface UsePetsParams {
    mode: "default" | "search";
    page: number;
    size?: number;
    sortField: string;
    sortDirection: "asc" | "desc";
    searchParams?: Record<string, string | number | undefined>; // for name, breed, type, location
}

export const useFetchPets = (
    { mode,
        page,
        size = 10,
        sortField,
        sortDirection,
        searchParams = {},
    }: UsePetsParams
) => {
    return useQuery<PetInfoPaginatedPublicResponse, Error>(
        {
            queryKey: ["pets", mode, page, size, sortField, sortDirection, searchParams],
            queryFn: () =>
                mode === "default" ?
                    publicService.fetchPetsPaginatedSorted({
                        page,
                        size,
                        sortField,
                        sortDirection
                    }) : publicService.petSearch({
                        page,
                        size,
                        sortField,
                        sortDirection,
                        ...searchParams

                    }),
            staleTime: 5 * 60 * 1000,
            enabled: !!mode,



        }
    );

};
