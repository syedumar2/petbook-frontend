import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@/hooks/useChat";
import { useMessagesQuery } from "@/hooks/useMessagesQuery";
import { Button } from "../ui/button";
import { Check, CheckCheck, Send } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ConversationInfo } from "@/types/conversations";
import EmptyMessages from "../ErrorPage/EmptyMessages";

type ChatMessageBoxProps = {
  conversation?: ConversationInfo | undefined;
};

const ChatMessageBox = ({ conversation }: ChatMessageBoxProps) => {
  //retrieves messages and populates message meta data with conversation state obj info

  const [content, setContent] = useState<string>("");
  const { user } = useAuth();
  const { state, sendMessage, markRead } = useChat(conversation?.id, user?.id);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit", // "12"
    minute: "2-digit", // "14"
  };

  useEffect(() => {
    if (state.messages.length > 0 && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;

      const latestMessage = state.messages[state.messages.length - 1];
      if (latestMessage && user && conversation) {
        // if latest message is from other user, mark as read
        if (latestMessage.senderId !== user?.id) {
          markRead(user?.id, conversation?.id);
        }
      }
    }
  }, [state.messages, conversation?.id, user?.id, markRead]);

  const receiverId =
    conversation && user
      ? [conversation.user1Id, conversation.user2Id].find(
          (id) => id !== user.id
        )
      : undefined;

  const { data: prevMessages } = useMessagesQuery(conversation?.id);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error("Please enter a message");
      return;
    }
    if (!receiverId || !user?.id || !conversation?.id) {
      toast.error("Missing conversation or user data");
      return;
    }
    sendMessage(content.trim(), receiverId, user.id, conversation.id);
    setContent("");
  };

  const noConversation = !conversation || conversation.id === null;

  const hasNewMessages = state.messages && state.messages.length > 0;
  const hasPrevMessages =
    prevMessages?.data &&
    prevMessages !== null &&
    prevMessages !== undefined &&
    prevMessages.data.length > 0;

  return (
    <div className="w-full h-screen flex flex-col bg-gray-50">
      {/* Message Area */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-5 mt-5 flex flex-col"
      >
        {prevMessages &&
          prevMessages?.data?.map((msg) => (
            <div
              className={`flex mb-4 ${
                msg.senderId === user?.id
                  ? "justify-end mr-2"
                  : "justify-start ml-2"
              }`}
              key={msg.id}
            >
              {msg.senderId !== user?.id && (
                <div className="relative">
                  <Avatar className="size-10 mr-2">
                    <AvatarImage className={undefined} />
                    <AvatarFallback className="bg-cyan-700 p-2 text-2xl text-white">
                      {msg.senderName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {state.presence[msg.senderId] ? (
                    <div className="absolute bottom-7 right-3 h-2.5 w-2.5 rounded-full border-2  bg-green-500" />
                  ) : (
                    ""
                  )}
                </div>
              )}

              <div
                className={`py-3 px-4 shadow-sm max-w-xs break-words ${
                  msg.senderId === user?.id
                    ? "bg-blue-500 text-white rounded-bl-3xl rounded-tl-3xl rounded-tr-xl"
                    : "bg-gray-200 text-gray-800 rounded-br-3xl rounded-tr-3xl rounded-tl-xl"
                }`}
              >
                <p>{msg.content}</p>
                <div className="flex justify-end items-center gap-1 mt-1 text-xs opacity-80">
                  <p>
                    {new Date(msg.sentAt).toLocaleTimeString("en-US", options)}
                  </p>
                  {msg.senderId === user?.id && // only show ticks on your own messages
                    (msg.read ? (
                      <CheckCheck size={16} className="text-green-400" />
                    ) : (
                      <Check size={16} className="text-gray-400" />
                    ))}
                </div>
              </div>
            </div>
          ))}

        {hasNewMessages &&
          state.messages.map((msg) => (
            <div
              className={`flex mb-4 ${
                msg.senderId === user?.id ? "justify-end" : "justify-start"
              }`}
              key={msg.id}
            >
              {msg.senderId !== user?.id && (
                <div className="relative">
                  <Avatar className="size-10 mr-2">
                    <AvatarImage className={undefined} />
                    <AvatarFallback className="bg-cyan-700 p-2 text-2xl text-white">
                      {msg.senderName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {state.presence[msg.senderId] ? (
                    <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2  bg-green-500" />
                  ) : (
                    ""
                  )}
                </div>
              )}

              <div
                className={`py-3 px-4 shadow-sm max-w-xs break-words ${
                  msg.senderId === user?.id
                    ? "bg-blue-500 text-white rounded-bl-3xl rounded-tl-3xl rounded-tr-xl"
                    : "bg-gray-200 text-gray-800 rounded-br-3xl rounded-tr-3xl rounded-tl-xl"
                }`}
              >
                {msg.content}
                <div className="flex justify-end items-center gap-1 mt-1 text-xs opacity-80">
                  <p>
                    {new Date(msg.sentAt).toLocaleTimeString("en-US", options)}
                  </p>
                  {msg.senderId === user?.id && // only show ticks on your own messages
                    (msg.read ? (
                      <CheckCheck size={16} className="text-green-400" />
                    ) : (
                      <Check size={16} className="text-gray-400" />
                    ))}
                </div>
              </div>
            </div>
          ))}

        {/* Show empty state if no messages at all */}
        {!hasPrevMessages && !hasNewMessages && (
          <EmptyMessages type="no-messages" />
        )}
      </div>

      {/* Input always visible */}
      <form className="w-full flex items-center gap-2 bg-gray-100 px-2 py-4 border-t">
        <Input
          className="flex items-center h-10 w-full rounded px-3 text-sm"
          type="text"
          placeholder="Type your message here..."
          value={content}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setContent(e.target.value)
          }
        />
        <Button
          type="submit"
          onClick={handleSubmit}
          className="bg-black text-white"
          size={"lg"}
          variant={undefined}
          disabled={noConversation}
        >
          <Send />
        </Button>
      </form>
    </div>
  );
};

export default ChatMessageBox;
