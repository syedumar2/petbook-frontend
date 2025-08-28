import { EmptyPage } from "@/components/ErrorPage/EmptyPage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { ConversationInfo } from "@/types/conversations";
type PrivatePetListingConversationsProps = {
  data: ConversationInfo[] | undefined;
};
export const PrivatePetListingConversations = ({
  data,
}: PrivatePetListingConversationsProps) => {
  const { user } = useAuth();
  const myName = user?.firstname + " " + user?.lastname;
  const options: Intl.DateTimeFormatOptions = {
    month: "numeric", // "August"
    year: "2-digit", // "2025"
    hour: "2-digit", // "12"
    minute: "2-digit", // "14"
  };

  return (
    <>
      {!data ? (
        <EmptyPage />
      ) : (
        data.map((conversation, index) => (
          <div
            key={conversation.id}
            className="flex flex-row py-4 px-2 justify-center items-center border-b border-gray-200 hover:bg-gray-50 transition relative"
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
                    : conversation.user2Name.charAt(0)}
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
    </>
  );
};
