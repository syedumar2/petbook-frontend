import { MessageSquare } from "lucide-react";

const EmptyMessages = ({ type }: { type: "no-convo" | "no-messages" }) => {
  return (
    <div className="w-full h-screen flex flex-col bg-gray-50">
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
        {type === "no-convo" ? (
          <>
            <MessageSquare size={"50"} />
            <p className="text-lg font-medium">No Conversation Selected</p>
            <p className="text-sm">
              Choose a conversation from the left to start chatting.
            </p>
          </>
        ) : (
          <>
            <MessageSquare size={"50"} />
            <p className="text-lg font-medium">No Messages Yet</p>
            <p className="text-sm">Say hello and start the conversation!</p>
          </>
        )}
      </div>
    </div>
  );
};

export default EmptyMessages;
