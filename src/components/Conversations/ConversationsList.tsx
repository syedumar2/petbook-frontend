import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useConversationsQuery } from "@/hooks/useConversationsQuery";
import { EmptyPage } from "../ErrorPage";
import { useAuth } from "@/hooks/useAuth";
import { ConversationInfo } from "@/types/conversations";
import EmptyChat from "../ErrorPage/EmptyChat";

type ConversationsListProps = {
  setConversationId: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const ConversationsList = ({ setConversationId }: ConversationsListProps) => {
  //gets conversations and sets id of selected conversation
  const { data } = useConversationsQuery();
  const { user } = useAuth();

  const myName = user?.firstname + " " + user?.lastname;
  const options: Intl.DateTimeFormatOptions = {
    month: "numeric", // "August"
    year: "2-digit", // "2025"
    hour: "2-digit", // "12"
    minute: "2-digit", // "14"
  };

  return (
    <div className="flex flex-col w-2/5 border-r border-gray-200 overflow-y-auto min-h-screen">
    
      {!data || !data.data ? (
      <EmptyChat/>
      ) : (
        data.data.map((conversation, index) => (
          <div
            key={conversation.id}
            className="flex flex-row py-4 px-2 justify-center items-center border-b border-gray-200 hover:bg-gray-50 transition relative"
            onClick={() => {
              setConversationId(conversation.id);
            }}
          >
            <div className="w-1/4 ">
              <p className="absolute top-5 right-4 text-xs text-gray-500">
                {new Date(conversation.createdAt).toLocaleDateString(
                  "en-US",
                  options
                )}
              </p>
              <Avatar className="size-12">
                <AvatarImage className={undefined} />
                <AvatarFallback className="bg-cyan-700 p-2 text-2xl text-white">
                  {conversation.user1Name === myName
                    ? conversation.user2Name.charAt(0)
                    : conversation.user1Name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="w-full">
              <div className="text-lg font-semibold">
                {conversation.user1Name === myName
                  ? conversation.user2Name
                  : conversation.user1Name}
              </div>
              <span className="text-gray-500">
                For Pet Listing: {conversation.petName}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ConversationsList;
