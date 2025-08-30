import { getAccessToken } from "@/context/tokenStore";
import { ChatEvent, ChatMessageResponse, EventType, MarkReadResponse } from "@/types/sockets";
import { Client, IMessage } from '@stomp/stompjs';

import { useEffect, useReducer, useRef } from "react";
import SockJS from "sockjs-client";




interface ChatState {
    messages: ChatMessageResponse[];
}

const initialState: ChatState = {
    messages: [],
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

        default:
            return state;
    }
}

export function useChat(conversationId: number | undefined) {
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

    function sendMessage(content: string, receiverId: number, senderId:number,conversationId:number) {
        if (!stompClientRef.current || !conversationId || !senderId || !receiverId || !content) return;

        const messagePayload = {
            EventType: EventType.MESSAGE_SENT,
            payload: {
                content : content,
                senderId: senderId,
                receiverId: receiverId,
                conversationId: conversationId,
            },
        };
        console.log("Message payload",messagePayload)

        stompClientRef.current.publish({
            destination: "/app/chat.sendMessage", 
            body: JSON.stringify(messagePayload),
        });
    }

    return { state, sendMessage };
}