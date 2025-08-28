import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatMessageBox, ChatSideBar, ConversationsList } from "..";
import { useState } from "react";

const Conversations = () => {
  const [conversationId, setConversationId] = useState<number | undefined>();
  return (
    <div className="flex flex-row justify-between bg-white">
      <ConversationsList setConversationId={setConversationId} />
      {/* Chat window */}
      <ChatMessageBox />

      <div className="w-2/5 border-l-2 border-gray-200 px-5">
        {/* chat overview */}
        {conversationId !== undefined ? (
          <ChatSideBar conversationId={conversationId} />
        ) : (
          <ChatSideBar />
        )}
      </div>
    </div>
  );
};

export default Conversations;
