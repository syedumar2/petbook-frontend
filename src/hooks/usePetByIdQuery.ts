import { publicService } from "@/services/publicService"
import { PetInfoResponse } from "@/types/petListing"
import { useQuery } from "@tanstack/react-query"

export const usePetByIdQuery = (id?: number, options?: { enabled?: boolean }) => {
    return useQuery<PetInfoResponse, Error>(
        {
            queryKey: ["pet", id],
            queryFn: () => publicService.petById(id),
            staleTime: 5 * 60 * 1000,
            enabled: !!id && options?.enabled !== false
        }
    )
}
