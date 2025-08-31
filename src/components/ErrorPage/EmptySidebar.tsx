import { MessageCircleMore } from "lucide-react";

const EmptySidebar = ({ type }: { type: "no-convo" | "no-pet" }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-6">
      {type === "no-convo" ? (
        <>
        <MessageCircleMore size={"50"}/>
          <p className="text-lg font-medium">No Conversation Selected</p>
          <p className="text-sm">Choose a chat to see pet details and actions.</p>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3v18h18M9 9h6v6H9V9z"
            />
          </svg>
          <p className="text-lg font-medium">Pet Doesn’t Exist</p>
          <p className="text-sm">This pet listing may have been removed.</p>
        </>
      )}
    </div>
  );
};

export default EmptySidebar;
