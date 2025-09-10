import { getAccessToken } from "@/context/tokenStore";
import { useWebSocketClient } from "@/context/WebSocketContext";
import { PresencePayload } from "@/types/conversations";
import { ChatEvent, ChatMessageResponse, EventType, MarkReadResponse } from "@/types/sockets";
import { IMessage } from '@stomp/stompjs';

import { useCallback, useEffect, useReducer } from "react";





interface ChatState {
    messages: ChatMessageResponse[];
    presence: PresencePayload;
}

const initialState: ChatState = {
    messages: [],
    presence: {},
};

function reducer(state: ChatState, action: ChatEvent): ChatState {
    switch (action.type) {
        case EventType.MESSAGE_SENT: {
            const msg = action.payload as ChatMessageResponse;
            return { ...state, messages: [...state.messages, msg] };
        }
        case EventType.MESSAGE_READ: {
            const readMsgPayload = action.payload as MarkReadResponse;
            const readMsgIds: number[] = readMsgPayload.readMessageIds;
            return {
                ...state,
                messages: state.messages.map((msg) =>
                    readMsgIds.includes(msg.id) ? { ...msg, read: true } : msg
                ),
            };
        }
        case EventType.USER_CONNECTED: {

            const presenceIndicatorPayload = action.payload as PresencePayload;
            console.log(presenceIndicatorPayload);
            return {
                ...state,
                presence: presenceIndicatorPayload,

            }
        }
        case EventType.USER_DISCONNECTED: {
            const presenceIndicatorPayload = action.payload as PresencePayload;
            console.log(presenceIndicatorPayload);
            return {
                ...state,
                presence: presenceIndicatorPayload,

            }
        }


        default:
            return state;
    }
}

export function useChat(conversationId: number | undefined, userId: number | undefined) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const client = useWebSocketClient();

    useEffect(() => {
        if (!conversationId || !client) return;

        let sub: any;

        const handleSubscribe = () => {
            const token = getAccessToken();
            if (!token) return;

            sub = client.subscribe(
                `/topic/conversation/${conversationId}`,
                (msg: IMessage) => {
                    const event: ChatEvent = JSON.parse(msg.body);
                    dispatch(event);
                }
            );
        };

        // Case 1: client is already connected → subscribe immediately
        if (client.connected) {
            handleSubscribe();
        }

        // Case 2: client not yet connected → wait for connect event
        client.onConnect = () => {
            handleSubscribe();
        };

        return () => {
            if (sub) {
                sub.unsubscribe();
            }
        };
    }, [conversationId, client]);


    function sendMessage(content: string, receiverId: number, senderId: number, conversationId: number) {
        if (!client || !conversationId || !senderId || !receiverId || !content) return;

        const messagePayload = {
            EventType: EventType.MESSAGE_SENT,
            payload: {
                content: content,
                senderId: senderId,
                receiverId: receiverId,
                conversationId: conversationId,
            },
        };


        client.publish({
            destination: "/app/chat.sendMessage",
            body: JSON.stringify(messagePayload),
        });
    }



    const markRead = useCallback((userId: number, conversationId: number) => {
        if (!client || !conversationId || !userId) return;

        const messagePayload = {
            EventType: EventType.MESSAGE_READ,
            payload: { userId, conversationId },
        };

        client.publish({
            destination: "/app/chat.markRead",
            body: JSON.stringify(messagePayload),
        });
    }, []);







    return { state, sendMessage, markRead };
}
