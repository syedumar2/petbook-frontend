import { authService } from "@/services/authService";
import { PageSortParam, PrivatePetInfoPaginatedResponse } from "@/types/petListing"
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";




interface usePrivatePetsParams {
    mode: boolean;
    params?: PageSortParam;
}
export const usePrivatePets = ({ 
    mode,
    params, }: usePrivatePetsParams) => {
        const {isAuthenticated} = useAuth();


    return useQuery<PrivatePetInfoPaginatedResponse, Error>(
        {
            queryKey: ["userPets",
                mode,
                params?.page,
                params?.size,
                params?.sortField,
                params?.sortDirection
            ],
            queryFn: () => {
                if(!isAuthenticated){
                     return Promise.reject(new Error("Unauthorized Access !!!"));
                }
                else if (!params) {
                    return Promise.reject(new Error("params is required"));
                }
                return authService.getUserPets(params);
            },
            staleTime: 5 * 60 * 1000,
        }
    )

}
