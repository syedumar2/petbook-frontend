import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatMessageBox, ChatSideBar, ConversationsList } from "..";
import { useState } from "react";
import { ConversationInfo } from "@/types/conversations";
import { PetInfoResponse, PetListing } from "@/types/petListing";

const Conversations = () => {
  const [conversationId, setConversationId] = useState<number | undefined>();
  const [conversation, setConversation] = useState<
    ConversationInfo | undefined
  >();


  return (
    <div className="flex flex-row justify-between bg-white">
      <ConversationsList
        setConversationId={setConversationId}
   
      />
      {/* Chat window */}
      {conversation !== undefined ? (
        <ChatMessageBox conversationId={conversationId} conversation={conversation}/>
      ) : (
        <ChatMessageBox />
      )}{" "}
      <div className="w-2/5 border-l-2 border-gray-200 px-5">
        {/* chat overview */}
        {conversationId !== undefined ? (
          <ChatSideBar conversationId={conversationId} setConversation={setConversation}/>
        ) : (
          <ChatSideBar />
        )}
      </div>
    </div>
  );
};

export default Conversations;
