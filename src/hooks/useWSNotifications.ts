import { getAccessToken } from "@/context/tokenStore";
import { useWebSocketClient } from "@/context/WebSocketContext";
import { NotificationPayload } from "@/types/user";
import { IMessage, StompSubscription } from "@stomp/stompjs";
import { useEffect, useReducer } from "react";


interface NotificationState {
    notifications: NotificationPayload[];
}
interface NotificationEvent {
    type: "NOTIFICATION",
    payload: NotificationPayload
}

const initalState: NotificationState = {
    notifications: []
}


function reducer(state: NotificationState, action: NotificationEvent): NotificationState {
    switch (action.payload.read) {
        case false: {
            const newNotification = action.payload as NotificationPayload;
            return { ...state, notifications: [...state.notifications, newNotification] }
        }
        case true: {
            const newNotification = action.payload as NotificationPayload;
            return {
                ...state,
                notifications: state.notifications.filter((n) => n.id !== newNotification.id)
            }
            console.log(state)
        }
        default:
            return state;
    }


}
export function useWSNotifications(email: string) {
    const [state, dispatch] = useReducer(reducer, initalState);
    const client = useWebSocketClient();

    useEffect(() => {
        const token = getAccessToken();
        if (!token || !client || !email) return;
        let sub: StompSubscription;
        const subscribe = () => {
            sub = client.subscribe(`/user/${email}/queue/notifications`, (msg: IMessage) => {
                const event: NotificationEvent = JSON.parse(msg.body);
                console.log(event);
                dispatch(event);
            })
        }

        if (client.connected) {
            subscribe();
        } else {
            client.onConnect = (frame) => subscribe();
            client.onStompError = (frame) => console.error("Stomp error: ", frame);
            client.onWebSocketError = (error) => console.error("WebSocket error:", error);

        }
        return () => {
            sub.unsubscribe
        };
    }, [email, client])



    const markAsRead = (id: number) => {
        dispatch({
            type: "NOTIFICATION",
            payload: { id, read: true } as NotificationPayload,
        })
    }
    return { state, markAsRead }
}