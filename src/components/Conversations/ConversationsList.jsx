import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";

const ConversationsList = () => {
  return (
    <div className="flex flex-col w-2/5 border-r border-gray-200 overflow-y-auto min-h-screen">
      {/* Search box */}
      <div className="border-b border-gray-200 py-4 px-2">
        
        <input
          type="text"
          placeholder="🔍 Search By Conversation"
          className="py-2 px-2 border border-gray-300  w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Conversation 1 */}
      <div className="flex flex-row py-4 px-2 justify-center items-center border-b border-gray-200 hover:bg-gray-50 transition">
        <div className="w-1/4">
          <Avatar className="size-12">
            <AvatarImage />
            <AvatarFallback className="bg-cyan-700 p-2 text-2xl text-white">
              J
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full">
          <div className="text-lg font-semibold">John Doe</div>
          <span className="text-gray-500">For Pet Listing: *petName*</span>
        </div>
      </div>

      {/* Active conversation (Mike) */}
      <div className="flex flex-row py-4 px-2 items-center border-b border-gray-200 border-l-4 border-l-blue-400 bg-blue-50">
        <div className="w-1/4">
          <Avatar className="size-12">
            <AvatarImage />
            <AvatarFallback className="bg-cyan-700 p-2 text-2xl text-white">
              M
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full">
          <div className="text-lg font-semibold">Mike Smith</div>
          <span className="text-gray-500">For Pet Listing: *petName*</span>
        </div>
      </div>
    </div>
  );
};

export default ConversationsList;
