
//for list of conversations
export interface ConversationsListResponse {
    success: boolean;
    message?: string;
    data?: ConversationInfo[] | null;
}


//for single conversation
export interface ConversationResponse {
    success: boolean;
    message?: string;
    data?: ConversationInfo | null;
}

//for list of messages
export interface MessageListInfoResponse{
        success: boolean;
    message?: string;
    data?: MessageInfo[] | null;
}

export interface ConversationInfo {
  id: number;
  user1Id: number;
  user1Name: string;
  user2Id: number;
  user2Name: string;
  petId: number;
  petName: string;
  createdAt: string; // ISO date-time string from backend
}

export interface MessageInfo{
  id: number;
  senderId: number;
  senderName: string;
  receiverId: number;
  receiverName: string;
  content: string;
  read: boolean;
  sentAt: string; 
}

export type PresencePayload = Record<number, boolean>;

