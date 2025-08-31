import { MessageCircle } from "lucide-react";

// src/components/EmptyChat.tsx
const EmptyChat = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 px-2">
      <MessageCircle size={"50"}/>
      <p className="text-lg font-medium">No Conversations Yet</p>
      <p className="text-sm">Start a chat by messaging someone about their pet!</p>
    </div>
  );
};

export default EmptyChat;
