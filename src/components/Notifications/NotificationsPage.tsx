import { useAllNotificationsQuery } from "@/hooks/useAllNotificationsQuery";
import { NotificationPayload } from "@/types/user";
import { formatDistanceToNow, parseISO } from "date-fns";
import {
  PawPrint,
  X,
  Check,
  PencilLineIcon,
  Trash,
  MessageCircle,
  MessageCircleX,
  MessagesSquare,
} from "lucide-react";
import { Button } from "../ui/button";
import { JSX } from "react";
import { ErrorPage } from "../ErrorPage";
import EmptyNotificationsBar from "../ErrorPage/EmptyNotificationsBar";
import { Loading } from "../Loader/Loading";

const NotificationsPage = () => {
  const {
    data: notificationsData,
    isPending,
    isError,
    error,
  } = useAllNotificationsQuery();
  const notifications = notificationsData?.data || [];

  const renderNotification = (n: NotificationPayload) => {
    const icons: Record<string, JSX.Element> = {
      WELCOME: <PawPrint className="size-6" />,
      PET_APPROVED: <Check className="size-6" />,
      PET_REJECTED: <X className="size-6" />,
      PET_UPDATED: <PencilLineIcon className="size-6" />,
      PET_DELETED: <Trash className="size-6" />,
      CONVERSATION_STARTED: <MessageCircle className="size-6" />,
      CONVERSATION_DELETED: <MessageCircleX className="size-6" />,
      NEW_MESSAGES: <MessagesSquare className="size-6" />,
    };

    const titles: Record<string, string> = {
      WELCOME: "Welcome",
      PET_APPROVED: "Pet Listing Approved",
      PET_REJECTED: "Pet Listing Rejected",
      PET_UPDATED: "Pet Listing Updated",
      PET_DELETED: "Pet Listing Removed",
      CONVERSATION_STARTED: "Conversation Started",
      CONVERSATION_DELETED: "Conversation Ended",
      NEW_MESSAGES: "New Messages",
    };

    const bgColors: Record<string, string> = {
      WELCOME: "bg-red-600",
      PET_APPROVED: "bg-green-600",
      PET_REJECTED: "bg-red-600",
      PET_UPDATED: "bg-blue-600",
      PET_DELETED: "bg-red-600",
      CONVERSATION_STARTED: "bg-blue-600",
      CONVERSATION_DELETED: "bg-red-600",
      NEW_MESSAGES: "bg-green-600",
    };

    return (
      <div
        key={n.id}
        className="group relative flex items-start gap-3 pl-10 pr-4 py-3 w-[80%] rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
      >
        {/* Checkbox (always visible, top-left) */}
        <label className="absolute top-2 left-3">
          <input type="checkbox" className="peer hidden" />
          <span className="w-4 h-4 inline-block border-2 border-gray-300 rounded-md peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-colors"></span>
        </label>

        {/* Icon circle */}
        <div
          className={`flex items-center justify-center ${
            bgColors[n.type]
          } text-white rounded-full w-10 h-10 shrink-0`}
        >
          {icons[n.type]}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1">
          <p className="text-sm">
            <span className="font-semibold text-gray-800">
              {titles[n.type]}
            </span>
            <br />
            <span className="text-gray-600">{n.message}</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {formatDistanceToNow(parseISO(n.createdAt), { addSuffix: true })}
          </p>
        </div>

        {/* Trashcan (hover only, top-right) */}
        <button
          disabled
          className="absolute top-7 right-8 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
        >
          <Trash size={24} />
        </button>
      </div>
    );
  };

  if (isError) return <ErrorPage isError={isError} error={error} />;
  if (isPending) return <Loading />;
  if (notifications.length === 0) return <EmptyNotificationsBar />;

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold mx-8 my-4">My Notifications</h2>
        </div>
        <div className="flex justify-between items-center border-t border-b border-gray-200 gap-3 bg-gray-50 px-4 py-2 rounded-xl shadow-sm">
          <h2 className="text-3xl font-semibold mx-8 my-4">3 Selected</h2>
        </div>
      </div>

      <div className="flex flex-col items-center my-3 gap-3 ">
        {notifications.map((n) => renderNotification(n))}

        {/* floatingbuttons */}
        <button
          disabled
          className="fixed bottom-6 left-6 w-14 h-14 flex items-center justify-center rounded-full bg-white text-blue-500 shadow-lg hover:bg-gray-100 transition-all"
     >
      <Check/>
        </button>
        <button
          disabled
          className="fixed bottom-6 right-6 w-14 h-14 flex items-center justify-center rounded-full text-red-500 bg-white shadow-lg hover:bg-gray-100 transition-all"
        >
          <Trash size={20} />
        </button>
      </div>
    </>
  );
};

export default NotificationsPage;
//TODO Build delete function for messages and improve styling
//TODO start admin panel after this
