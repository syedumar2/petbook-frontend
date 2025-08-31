import { PresencePayload } from "./conversations";

export interface ChatEvent {
    type: EventType,
    payload: ChatMessageResponse | MarkReadResponse | TypingIndicator | PresencePayload | null | undefined;
}

export enum EventType {
    MESSAGE_SENT = "MESSAGE_SENT",
    MESSAGE_READ = "MESSAGE_READ",
    USER_TYPING = "USER_TYPING",
    USER_CONNECTED = "USER_CONNECTED",
    USER_DISCONNECTED = "USER_DISCONNECTED",
    NOTIFICATION = "NOTIFICATION"
}

export interface ChatMessageResponse {
    id: number;
    senderId: number;
    receiverId: number;
    content: string;
    read: boolean;
    sentAt: string;
    receiverName: string;
    senderName: string;
}

export interface MarkReadResponse {
    readMessageIds: number[];
}
export interface TypingIndicator {
    conversationId: number;
    username: string;
    typing: boolean;
}