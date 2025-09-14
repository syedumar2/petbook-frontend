import { useAllNotificationsQuery } from "@/hooks/useAllNotificationsQuery";
import { authService } from "@/services/authService";
import { NotificationPayload } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow, parseISO } from "date-fns";
import {
  Check,
  CheckCheck,
  CircleAlert,
  MessageCircle,
  MessageCircleX,
  MessagesSquare,
  PawPrint,
  PencilLineIcon,
  Trash,
  X,
  XIcon,
} from "lucide-react";
import { JSX, useState } from "react";
import { toast } from "sonner";
import { ErrorPage } from "../ErrorPage";
import { EmptyNotificationsPage } from "../ErrorPage/EmptyNotificationsPage";
import { Loading } from "../Loader/Loading";

const NotificationsPage = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const queryClient = useQueryClient();

  const deleteSingleNotification = async (id: number) => {
    const res = await authService.deleteUserNotifications({ ids: [id] });
    if (res.success) {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      return toast.success(res.message);
    } else {
      return toast.error(res.message);
    }
  };

  const deleteBulkNotifications = async () => {
    if (selectedIds.length === 0) return;
    const res = await authService.deleteUserNotifications({ ids: selectedIds });
    if (res.success) {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      setSelectedIds([]);
      return toast.success(res.message);
    } else {
      return toast.error(res.message);
    }
  };

  const markAsRead = async (notificationId: number) => {
    const res = await authService.markNotificationRead(notificationId);
    if (res.success) {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      return toast.success(res.message);
    } else {
      return toast.error(res.message);
    }
  };

  const handleChange = (notificationId: number) => {
    if (!selectedIds.includes(notificationId)) {
      setSelectedIds((prev) => [...prev, notificationId]);
    } else {
      setSelectedIds((prev) => prev.filter((id) => id !== notificationId));
    }
  };

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
          <input
            type="checkbox"
            className="peer hidden"
            checked={selectedIds.includes(n.id)}
            onClick={() => handleChange(n.id)}
          />
          <span
            className="w-4 h-4 inline-block border-2 border-gray-300 rounded-md relative 
    peer-checked:border-blue-500
    after:content-[''] after:absolute after:left-[3px] after:top-[0px] 
    after:w-[6px] after:h-[10px] after:border-r-2 after:border-b-2 after:border-blue-500 
    after:rotate-45 after:opacity-0 peer-checked:after:opacity-100 transition-all"
          ></span>
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
          {/* Title row */}
          <div className="flex items-center gap-2">
            {!n.read && <CircleAlert size={18} className="text-red-500" />}
            <span className="font-semibold text-gray-800 text-sm">
              {titles[n.type]}
            </span>
          </div>

          {/* Message */}
          <p className="text-gray-600 text-sm mt-1 leading-snug">{n.message}</p>

          {/* Timestamp */}
          <p className="text-xs text-gray-400 mt-2">
            {formatDistanceToNow(parseISO(n.createdAt), { addSuffix: true })}
          </p>
        </div>

        <button
          onClick={() => deleteSingleNotification(n.id)}
          className="absolute top-8.5 right-8 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
        >
          <Trash size={24} />
        </button>
        <button
          onClick={() => markAsRead(n.id)}
          className={
            !n.read
              ? "absolute top-8.5 right-18 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-green-500"
              : "hidden"
          }
        >
          <Check size={24} />
        </button>
      </div>
    );
  };

  if (isError) return <ErrorPage isError={isError} error={error} />;
  if (isPending) return <Loading />;
  if (notifications.length === 0) return <EmptyNotificationsPage />;

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold mx-8 my-4">My Notifications</h2>
        </div>
        {selectedIds.length > 0 ? (
          <div className="flex justify-between items-center border-t border-b border-gray-200 gap-3 bg-gray-50 px-4 py-2 rounded-xl shadow-sm">
            <h2 className="text-3xl font-semibold mx-8 my-4">
              {selectedIds.length} Selected
            </h2>

            <button className="mx-8" onClick={() => setSelectedIds([])}>
              {" "}
              <XIcon size={"35"} />{" "}
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="flex flex-col items-center my-3 gap-3 ">
        {notifications.map((n) => renderNotification(n))}

        {/* floatingbuttons */}
        <button
          onClick={() => {
            if (notificationsData.data)
              setSelectedIds(notificationsData.data?.map((n) => Number(n.id)));
            else return;
          }}
          className={
            selectedIds.length > 0
              ? "fixed bottom-6 left-6 w-14 h-14 flex items-center justify-center rounded-full bg-white text-blue-500 shadow-lg hover:bg-gray-100 transition-all"
              : "hidden"
          }
        >
          <CheckCheck />
        </button>
        <button
          onClick={() => deleteBulkNotifications()}
          className={
            selectedIds.length > 0
              ? "fixed bottom-6 right-6 w-14 h-14 flex items-center justify-center rounded-full text-red-500 bg-white shadow-lg hover:bg-gray-100 transition-all"
              : "hidden"
          }
        >
          <Trash size={20} />
        </button>
      </div>
    </>
  );
};

export default NotificationsPage;
//TODO start admin panel PRONTO
//TODO show unread messages badge on chat icon in navbar and conversations. do this while making responsive
