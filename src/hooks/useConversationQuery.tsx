import { authService } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";

export const useConversationQuery = ( enabled:boolean,conversationId?: number,) => {
  return useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: () => authService.getConversationDetails(conversationId),
    staleTime: 5 * 60 * 1000,
    enabled: enabled,
  });
};
