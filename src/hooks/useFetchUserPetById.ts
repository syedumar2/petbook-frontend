import { authService } from "@/services/authService"
import {  PrivatePetInfoResponse } from "@/types/petListing"
import { useSuspenseQuery } from "@tanstack/react-query"

export const useFetchUserPetById = (id: number) => {
    return useSuspenseQuery<PrivatePetInfoResponse, Error>(
        {
            queryKey: ["pet", id],
            queryFn: () => authService.getPet(id),
            staleTime: 5 * 60 * 1000,
        }
    )
}
