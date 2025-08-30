import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useChat } from "@/hooks/useChat";
import { useMessagesQuery } from "@/hooks/useMessagesQuery";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { ConversationInfo } from "@/types/conversations";

type ChatMessageBoxProps = {
  conversationId?: number | undefined;
  conversation?: ConversationInfo | undefined;
};

const ChatMessageBox = ({
  conversationId,
  conversation,
}: ChatMessageBoxProps) => {
  const { state, sendMessage } = useChat(conversationId);
  const [content, setContent] = useState<string>("");
  const { user } = useAuth();
  const receiverId =
    conversation && user
      ? [conversation.user1Id, conversation.user2Id].find(
          (id) => id !== user.id
        )
      : undefined;

  console.log("The reciever id is", receiverId);
  const { data: prevMessages } = useMessagesQuery(conversationId);

  const handleSubmit = () => {
    if (!content.trim()) {
      toast.error("Please enter a message");
      return;
    }
    if (!receiverId || !user?.id || !conversation?.id) {
      toast.error("Missing conversation or user data");
      return;
    }
    sendMessage(content.trim(), receiverId, user.id, conversation.id);
    setContent(""); // clear input
  };

  if (!conversationId || conversationId === null)
    return (
      <div className="w-full px-5 flex flex-col justify-between bg-gray-50 relative">
        <p>No conversation selected</p>
      </div>
    );
  if (!prevMessages || !prevMessages.data)
    return (
      <div className="w-full px-5 flex flex-col justify-between bg-gray-50 relative">
        <p>No messages</p>
      </div>
    );
  if (!state.messages)
    return (
      <div className="w-full px-5 flex flex-col justify-between bg-gray-50 relative">
        <p>No messages</p>
      </div>
    );

  return (
    <div className="w-full px-5 flex flex-col justify-between bg-gray-50 relative">
      <div className="flex flex-col mt-5">
        {prevMessages?.data.map((msg) => (
          <div
            className={`flex mb-4 ${
              msg.senderId === user?.id ? "justify-end" : "justify-start"
            }`}
            key={msg.id}
          >
            {msg.senderId !== user?.id && (
              <Avatar className="size-10 mr-2">
                <AvatarImage className={undefined} />
                <AvatarFallback className="bg-cyan-700 p-2 text-2xl text-white">
                  {msg.senderId === user?.id
                    ? user.firstname.charAt(0)
                    : msg.senderName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}

            <div
              className={`py-3 px-4 shadow-sm max-w-xs break-words ${
                msg.senderId === user?.id
                  ? "bg-blue-500 text-white rounded-bl-3xl rounded-tl-3xl rounded-tr-xl"
                  : "bg-gray-200 text-gray-800 rounded-br-3xl rounded-tr-3xl rounded-tl-xl"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Current Message Fetch */}
        {state.messages.map((msg) => (
          <div
            className={`flex mb-4 ${
              msg.senderId === user?.id ? "justify-end" : "justify-start"
            }`}
            key={msg.id}
          >
            {msg.senderId !== user?.id && (
              <Avatar className="size-10 mr-2">
                <AvatarImage className={undefined} />
                <AvatarFallback className="bg-cyan-700 p-2 text-2xl text-white">
                 {msg.senderId === user?.id
                    ? user.firstname.charAt(0)
                    : msg.senderName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            )}

            <div
              className={`py-3 px-4 shadow-sm max-w-xs break-words ${
                msg.senderId === user?.id
                  ? "bg-blue-500 text-white rounded-bl-3xl rounded-tl-3xl rounded-tr-xl"
                  : "bg-gray-200 text-gray-800 rounded-br-3xl rounded-tr-3xl rounded-tl-xl"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        <div className="absolute bottom-0 left-0 w-full flex justify-between items-center">
          <Input
            className="w-full bg-gray-200 py-2 px-4  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            placeholder="Type your message here..."
            value={content}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setContent(e.target.value)
            }
          />
          <Button
            type="button"
            onClick={() => handleSubmit()}
            className={"bg-red-600 text-white"}
            variant={undefined}
            size={undefined}
          >
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatMessageBox;
//TODO: Fix the ui before adding more features

//DONE with msging integration
