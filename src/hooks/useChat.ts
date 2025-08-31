import { getAccessToken } from "@/context/tokenStore";
import { PresencePayload } from "@/types/conversations";
import { ChatEvent, ChatMessageResponse, EventType, MarkReadResponse } from "@/types/sockets";
import { Client, IMessage } from '@stomp/stompjs';

import { useCallback, useEffect, useReducer, useRef } from "react";
import SockJS from "sockjs-client";




interface ChatState {
    messages: ChatMessageResponse[];
    presence: Map<number, PresencePayload>;
}

const initialState: ChatState = {
    messages: [],
    presence: new Map,
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
            const newPresence = new Map(state.presence);
            newPresence.set(presenceIndicatorPayload.userId, presenceIndicatorPayload)
            return {
                ...state,
                presence: newPresence,

            }
        }
        case EventType.USER_DISCONNECTED: {
            const payload = action.payload as PresencePayload;
            console.log(payload);

            const newPresence = new Map(state.presence);
            newPresence.set(payload.userId, { ...payload, online: false });
            return { ...state, presence: newPresence };
        }


        default:
            return state;
    }
}

export function useChat(conversationId: number | undefined, userId: number | undefined) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const stompClientRef = useRef<Client | null>(null);

    useEffect(() => {
        const token = getAccessToken();
        if (!conversationId || !token) return;

        const stompClient = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
            connectHeaders: { Authorization: "Bearer " + token },
            debug: (str) => console.log(str),
            onConnect: () => {


                stompClient.subscribe(`/topic/conversation/${conversationId}`, (msg: IMessage) => {
                    const event: ChatEvent = JSON.parse(msg.body);
                    dispatch(event);
                });





            },
            onStompError: (frame) => {
                console.error("STOMP error:", frame);
            },
        });

        stompClientRef.current = stompClient;
        stompClient.activate();

        return () => {
            stompClient.deactivate();
            stompClientRef.current = null;
        };
    }, [conversationId]);

    function sendMessage(content: string, receiverId: number, senderId: number, conversationId: number) {
        if (!stompClientRef.current || !conversationId || !senderId || !receiverId || !content) return;

        const messagePayload = {
            EventType: EventType.MESSAGE_SENT,
            payload: {
                content: content,
                senderId: senderId,
                receiverId: receiverId,
                conversationId: conversationId,
            },
        };


        stompClientRef.current.publish({
            destination: "/app/chat.sendMessage",
            body: JSON.stringify(messagePayload),
        });
    }



    const markRead = useCallback((userId: number, conversationId: number) => {
        if (!stompClientRef.current || !conversationId || !userId) return;

        const messagePayload = {
            EventType: EventType.MESSAGE_READ,
            payload: { userId, conversationId },
        };

        stompClientRef.current.publish({
            destination: "/app/chat.markRead",
            body: JSON.stringify(messagePayload),
        });
    }, []);







    return { state, sendMessage, markRead };
}