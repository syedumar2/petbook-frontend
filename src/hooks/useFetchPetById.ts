import { publicService } from "@/services/publicService"
import { PetInfoResponse } from "@/types/petListing"
import { useSuspenseQuery } from "@tanstack/react-query"

export const useFetchPetById = (id: number) => {
    return useSuspenseQuery<PetInfoResponse, Error>(
        {
            queryKey: ["pet", id],
            queryFn: () => publicService.petById(id),
            staleTime: 5 * 60 * 1000,
        }
    )
}
