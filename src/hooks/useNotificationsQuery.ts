import { authService } from "@/services/authService"
import { useQuery } from "@tanstack/react-query"


export const useNotificationsQuery = () => {
    return useQuery({
        queryKey: ["notification"],
        queryFn: () => authService.getUnreadNotifications(),
        staleTime: Infinity,       // data never goes stale
        refetchOnMount: false,     // don’t refetch on component mount
        refetchOnWindowFocus: false, // don’t refetch on tab/window focus
        refetchOnReconnect: false, // don’t refetch when network reconnects
    })
}