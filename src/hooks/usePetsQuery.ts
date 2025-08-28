import { publicService } from "@/services/publicService";
import {
  FindPetByExampleRequest,
  PetInfoPaginatedPublicResponse,
} from "@/types/petListing";
import { useQuery } from "@tanstack/react-query";

interface UsePetsParams {
  mode: "default" | "search" | "advancedSearch";
  page: number;
  size?: number;
  sortField: string;
  sortDirection: "asc" | "desc";
  searchParams?: Record<string, string | number | undefined>; // for name, breed, type, location
  advancedSearchBody?: FindPetByExampleRequest;
}
export const usePetsQuery = ({
  mode,
  page,
  size = 10,
  sortField,
  sortDirection,
  searchParams = {},
  advancedSearchBody,
}: UsePetsParams) => {
  return useQuery<PetInfoPaginatedPublicResponse, Error>({
    queryKey: [
      "pets",
      mode,
      page,
      size,
      sortField,
      sortDirection,
      searchParams,
      advancedSearchBody,
    ],
    queryFn: () => {
      console.log("useFetchPets queryFn running. Mode:", mode);

      if (mode === "default") {
        return publicService.fetchPetsPaginatedSorted({
          page,
          size,
          sortField,
          sortDirection,
        });
      }

      if (mode === "search") {
        return publicService.petSearch({
          page,
          size,
          sortField,
          sortDirection,
          ...searchParams,
        });
      }

      if (mode === "advancedSearch") {
        console.log("Inside advancedSearch, advancedSearchBody:", advancedSearchBody);
        if (!advancedSearchBody) {
          return Promise.reject(
            new Error("advancedSearchBody is required for advanced search")
          );
        }
        return publicService.petAdvancedSearch(advancedSearchBody, {
          page,
          size,
          sortField,
          sortDirection,
        });
      }

      return Promise.reject(new Error("Invalid mode"));
    },

    staleTime: 5 * 60 * 1000,
    enabled: !!mode,
  });
};
