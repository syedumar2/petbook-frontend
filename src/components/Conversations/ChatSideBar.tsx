import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useConversationQuery } from "@/hooks/useConversationQuery";
import { usePetByIdQuery } from "@/hooks/usePetByIdQuery";
import { ConversationInfo } from "@/types/conversations";
import { Dialog } from "@radix-ui/react-dialog";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { EndConversationDialog } from "../DialogBoxes/EndConversationDialog";

import { Loading } from "../Loader/Loading";
import { Button } from "../ui/button";
import EmptySidebar from "../ErrorPage/EmptySidebar";

const ChatSideBar = ({
  conversationId,
  setConversation,
}: {
  conversationId?: number;
  setConversation?: React.Dispatch<
    React.SetStateAction<ConversationInfo | undefined>
  >;
}) => {
  //gets conversationId from list component and sets Conversation state to Conversation obj with given id
  const { data: conversation, isPending: isPendingConversation } =
    useConversationQuery(!!conversationId, conversationId);

  const { data: pet, isPending: isPendingPets } = usePetByIdQuery(
    conversation?.data?.petId,
    { enabled: !!conversation?.data?.petId }
  );

  const { user } = useAuth();
  const [endConversationDialogOpen, setEndConversationDialogOpen] =
    useState<boolean>(false);
  const myName = user?.firstname + " " + user?.lastname;
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit", // 22
    month: "short", // Sept
    year: "numeric", // 2025
    hour: "numeric", // 3
    minute: "2-digit", // 34
    hour12: true, // AM/PM
  };

  if (isPendingConversation || isPendingPets) return <Loading />;
  if (!conversationId || !conversation?.data)
    return <EmptySidebar type="no-convo" />;

  if (!conversation.data.petId || !pet?.data)
    return <EmptySidebar type="no-pet" />;
  if (conversation !== null || conversation) {
    setConversation?.(conversation.data);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* User Info */}
      <section className="flex gap-2 items-center">
        <Avatar className="size-12">
          <AvatarImage className={undefined} />
          <AvatarFallback className="bg-cyan-700 p-2 text-2xl text-white">
            {user?.email !== pet.data.owner
              ? myName.charAt(0)
              : conversation.data.user1Name === myName
              ? conversation.data.user2Name.charAt(0)
              : conversation.data.user1Name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold text-xl">
            {" "}
            {user?.email !== pet.data.owner
              ? "You"
              : conversation.data.user1Name === myName
              ? conversation.data.user2Name
              : conversation.data.user1Name}
          </span>
          <span className="text-gray-500 text-sm">Want to Adopt</span>
        </div>
      </section>

      {/* Pet Card */}
      <div className="border border-gray-200 rounded-2xl shadow hover:shadow-lg transition overflow-hidden w-[380px] h-[380px] pt-4 bg-white">
        <div className="px-4 py-0">
          <img
            src={pet.data?.imageUrls?.[0]}
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
          <Dialog
            open={endConversationDialogOpen}
            onOpenChange={setEndConversationDialogOpen}
          >
            <EndConversationDialog
              open={endConversationDialogOpen}
              setOpen={setEndConversationDialogOpen}
              conversationId={conversationId}
            />
          </Dialog>
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
