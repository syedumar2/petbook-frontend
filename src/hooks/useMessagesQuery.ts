import { authService } from "@/services/authService"
import { useQuery } from "@tanstack/react-query"




export const useMessagesQuery = (conversationId?: number) => {
    return useQuery(
        {
            queryKey: ["msgs", conversationId],
            queryFn: () => authService.getConversationMessages(conversationId),
            staleTime: Infinity,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        }

    )
}
//TODO revisit later