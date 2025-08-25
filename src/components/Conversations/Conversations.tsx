import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatMessageBox, ChatSideBar, ConversationsList } from "..";

const Conversations = () => {
  return (
    <div className="flex flex-row justify-between bg-white">
      <ConversationsList />
      {/* Chat window */}
      <ChatMessageBox />

      <div className="w-2/5 border-l-2 border-gray-200 px-5">
        {/* chat overview */}
        <ChatSideBar />
      </div>
    </div>
  );
};

export default Conversations;
