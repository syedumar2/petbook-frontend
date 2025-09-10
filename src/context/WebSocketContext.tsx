import React, { createContext, useContext, useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { getAccessToken } from "@/context/tokenStore";
import { useAuth } from "@/hooks/useAuth";

interface WebSocketContextType {
  client: Client | null;
}

const WebSocketContext = createContext<WebSocketContextType>({ client: null });

export const WebSocketProvider = ({ children }: { children?: React.ReactNode }) => {
  const [client, setClient] = useState<Client | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const token = getAccessToken();
    console.log("[WebSocketProvider] Token inside useEffect:", token);

    if (!isAuthenticated || !token) {
      console.warn("[WebSocketProvider] Skipping WebSocket setup — no token or not authenticated");
      return;
    }

    const stompClient = new Client({
      webSocketFactory: () => {
        console.log("[WebSocketProvider] Creating SockJS connection");
        return new SockJS("http://localhost:8080/ws");
      },
      connectHeaders: { Authorization: `Bearer ${token}` },
      debug: (str) => console.log("[STOMP Debug]", str),
      reconnectDelay: 5000,
      onConnect: () => console.log("[STOMP] Connected to WebSocket"),
      onStompError: (frame) => console.error("[STOMP] Error:", frame),
      onWebSocketClose: () => console.log("[STOMP] WebSocket closed"),
      onWebSocketError: (error) =>
        console.error("[STOMP] WebSocket error:", error),
    });

    console.log("[STOMP] activating…");
    stompClient.activate();
    setClient(stompClient);

    return () => {
      console.log("[STOMP] deactivating…");
      stompClient.deactivate();
      setClient(null);
    };
  }, [isAuthenticated]); // run whenever login state changes

  return (
    <WebSocketContext.Provider value={{ client }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export function useWebSocketClient() {
  return useContext(WebSocketContext).client;
}
