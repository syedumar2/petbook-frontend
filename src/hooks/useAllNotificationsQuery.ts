import { authService } from "@/services/authService"
import { useQuery } from "@tanstack/react-query"



export const useAllNotificationsQuery = () => {
    return useQuery({
        queryKey: ["notifications"],
        queryFn: () => authService.getAllUserNotifications(),
        staleTime: 5 * 60 * 1000


    })
}
