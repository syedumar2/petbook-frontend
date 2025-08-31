import { ChatMessageBox, ChatSideBar, ConversationsList } from "..";
import { useState } from "react";
import { ConversationInfo } from "@/types/conversations";

const Conversations = () => {
  const [conversationId, setConversationId] = useState<number | undefined>();
  const [conversation, setConversation] = useState<
    ConversationInfo | undefined
  >();

  return (
    <section className="w-full">
            <div className="flex justify-between items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl shadow-sm">
      <h2 className="text-2xl font-semibold mx-8 my-4">My Conversations</h2>
      </div>
      <div className="flex flex-row justify-between bg-white pt-1">
        <ConversationsList setConversationId={setConversationId} />
        {/* Chat window */}
        {conversation !== undefined ? (
          <ChatMessageBox
            conversation={conversation}
          />
        ) : (
          <ChatMessageBox />
        )}{" "}
        <div className="w-2/5 border-l-2 border-gray-200 px-5">
          {/* chat overview */}
          {conversationId !== undefined ? (
            <ChatSideBar
              conversationId={conversationId}
              setConversation={setConversation}
            />
          ) : (
            <ChatSideBar />
          )}
        </div>
      </div>
    </section>
  );
};

export default Conversations;
