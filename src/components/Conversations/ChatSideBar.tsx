import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useConversationQuery } from "@/hooks/useConversationQuery";
import { useState } from "react";
import { usePetByIdQuery } from "@/hooks/usePetByIdQuery";
import { LoadingOverlay } from "../Overlays/LoadingOverlay";

const ChatSideBar = ({ conversationId }: { conversationId?: number }) => {
  const [fetch, setFetch] = useState<boolean>(false);

  const { data: conversation,isFetching: isFetchingConversations } = useConversationQuery(
    !!conversationId,
    conversationId
  );

  const { data: pet, isFetching: isFetchingPets } = usePetByIdQuery(conversation?.data?.petId,{enabled:!!conversation?.data?.petId});

  const { user } = useAuth();
  console.log(user);
  const myName = user?.firstname + " " + user?.lastname;
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit", // 22
    month: "short", // Sept
    year: "numeric", // 2025
    hour: "numeric", // 3
    minute: "2-digit", // 34
    hour12: true, // AM/PM
  };

if(isFetchingConversations || isFetchingPets) return <LoadingOverlay message={"Fetching Conversation details"}/>
    if (!conversationId || !conversation?.data)
    return <p>No conversation selected</p>;
  if (!conversation.data.petId || !pet?.data) return <p>Pet doesnt exist</p>;

  return (
    <div className="flex flex-col gap-4">
      {/* User Info */}
      <section className="flex gap-2 items-center">
        <Avatar className="size-12">
          <AvatarImage className={undefined} />
          <AvatarFallback className="bg-cyan-700 p-2 text-2xl text-white">
            M
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold text-xl">
            {" "}
            {conversation.data.user1Name === myName
              ? conversation.data.user2Name
              : conversation.data.user1Name}
          </span>
          <span className="text-gray-500 text-sm">Wants to Adopt</span>
        </div>
      </section>

      {/* Pet Card */}
      <div className="border border-gray-200 rounded-2xl shadow hover:shadow-lg transition overflow-hidden w-[380px] h-[380px] pt-4 bg-white">
        <div className="px-4 py-0">
          <img
            src={pet.data?.imageUrls[0]}
            alt={pet.data?.name}
            className="w-full h-48 object-cover mb-2"
          />
          <div className="ml-1">
            <div className="p-0">
              <h2 className="text-xl font-semibold text-gray-800">
                {pet.data?.name}
              </h2>
              <p className="text-gray-600 text-sm">
                {pet.data?.type} - {pet.data?.breed}
              </p>
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Location: {pet.data?.location}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Owner: {pet.data?.owner}
            </p>
          </div>
        </div>
      </div>

      {/* Conversation Info */}
      <div className="font-semibold ml-2 py-2 text-gray-700">
        Conversation started at{" "}
        <span className="text-gray-500">
          {new Date(conversation?.data?.createdAt).toLocaleDateString(
            "en-US",
            options
          )}
        </span>
      </div>

      {/* Actions Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            className="bg-gray-700 text-white rounded-full px-4 py-2 text-sm font-medium shadow hover:bg-red-800 active:scale-95 flex items-center gap-1"
            variant={undefined}
            size={undefined}
          >
            Actions <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 bg-white border border-gray-200 shadow-lg rounded-md">
          <DropdownMenuItem
            className="text-red-700 font-medium cursor-pointer hover:bg-red-50"
            inset={undefined}
          >
            End Conversation
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-green-700 font-medium cursor-pointer hover:bg-green-50"
            inset={undefined}
          >
            Mark as Adopted
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ChatSideBar;
