import { authService } from "@/services/authService";
import { ConversationsListResponse } from "@/types/conversations";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useConversationsQuery = () => {
  return useSuspenseQuery<ConversationsListResponse, Error>({
    queryKey: ["conversations"],
    queryFn: () => authService.getUserConversationsList(),
    staleTime: 5 * 60 * 1000,
  });
};
