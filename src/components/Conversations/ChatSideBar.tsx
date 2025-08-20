import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

const ChatSideBar = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* User Info */}
      <section className="flex gap-2 items-center">
        <Avatar className="size-12">
          <AvatarImage />
          <AvatarFallback className="bg-cyan-700 p-2 text-2xl text-white">
            M
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold text-xl">Mike Smith</span>
          <span className="text-gray-500 text-sm">Wants to Adopt</span>
        </div>
      </section>

      {/* Pet Card */}
      <div className="border border-gray-200 rounded-2xl shadow hover:shadow-lg transition overflow-hidden w-[380px] h-[380px] pt-4 bg-white">
        <div className="px-4 py-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/bf/Bulldog_inglese.jpg"
            alt="Buddy"
            className="w-full h-48 object-cover mb-2"
          />
          <div className="ml-1">
            <div className="p-0">
              <h2 className="text-xl font-semibold text-gray-800">Buddy</h2>
              <p className="text-gray-600 text-sm">Dog - Labrador</p>
            </div>
            <p className="text-gray-500 text-sm mt-1">Location: Bangalore</p>
            <p className="text-gray-500 text-sm mt-2">Owner: Mike Smith</p>
          </div>
        </div>
      </div>

      {/* Conversation Info */}
      <div className="font-semibold ml-2 py-2 text-gray-700">
        Conversation started at <span className="text-gray-500">22 Sept 2025</span>
      </div>

      {/* Actions Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button className="bg-gray-700 text-white rounded-full px-4 py-2 text-sm font-medium shadow hover:bg-red-800 active:scale-95 flex items-center gap-1">
            Actions <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 bg-white border border-gray-200 shadow-lg rounded-md">
          <DropdownMenuItem className="text-red-700 font-medium cursor-pointer hover:bg-red-50">
            End Conversation
          </DropdownMenuItem>
          <DropdownMenuItem className="text-green-700 font-medium cursor-pointer hover:bg-green-50">
            Mark as Adopted
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChatSideBar;
