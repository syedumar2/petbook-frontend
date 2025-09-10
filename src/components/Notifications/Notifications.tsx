import { useNotificationsQuery } from "@/hooks/useNotificationsQuery";
import { useWSNotifications } from "@/hooks/useWSNotifications";
import { authService } from "@/services/authService";
import { NotificationPayload } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Badge } from "../ui/badge";
import {
  Bell,
  Check,
  MessageCircle,
  MessageCircleX,
  MessagesSquare,
  PawPrint,
  PencilLineIcon,
  Trash,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { ErrorPage } from "../ErrorPage";
import EmptyNotificationsBar from "../ErrorPage/EmptyNotificationsBar";
import { Loading } from "../Loader/Loading";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import "./Notifications.css";
import { useAuth } from "@/hooks/useAuth";

export const Notifications = () => {
  const { user } = useAuth();
  const {
    data: prevNotifications,
    isPending,
    error,
    isError,
  } = useNotificationsQuery();
  const { state: newNotifications, markAsRead: markWSNotificationAsRead } =
    useWSNotifications(user?.email as string);

  const queryClient = useQueryClient();
  const renderNotification = (n: NotificationPayload) => {
    switch (n.type) {
      case "WELCOME":
        return (
          <DropdownMenuItem
            key={n.id}
            className="relative flex items-center gap-2 px-4 border border-gray-400 w-full py-4"
            inset={undefined}
            onSelect={(e: Event) => e.preventDefault()}
          >
            <div className="flex items-center justify-center bg-red-600 text-white rounded-full p-1 scale-85">
              <PawPrint className="size-6" />
            </div>
            <div className="flex flex-col w-full">
              <p className="ml-2">
                <span className="text-sm font-semibold">Welcome</span>
                <br />
                {n.message}
              </p>
              <p className="flex justify-end text-xs text-gray-500">
                {formatDistanceToNow(parseISO(n.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <Button
              type="button"
              className="absolute top-1 right-1 rounded-full p-1 hover:text-red-600"
              size="xs"
              variant={undefined}
              onClick={() => markAsRead(n.id)}
            >
              <X />
            </Button>
          </DropdownMenuItem>
        );

      case "PET_APPROVED":
        return (
          <DropdownMenuItem
            key={n.id}
            className="relative flex items-center gap-2 px-4 border border-gray-400 w-full py-4"
            inset={undefined}
            onSelect={(e: Event) => e.preventDefault()}
          >
            <div className="flex items-center justify-center bg-green-600 text-white rounded-full p-1 scale-85">
              <div className="rounded-full flex items-center justify-center p-1">
                <Check className="size-6" />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <p className="ml-2">
                <span className="text-sm font-semibold">
                  Pet Listing Approved
                </span>
                <br />
                {n.message}
              </p>
              <p className="flex justify-end text-xs text-gray-500">
                {formatDistanceToNow(parseISO(n.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <Button
              type="button"
              className="absolute top-1 right-1 rounded-full p-1 hover:text-red-600"
              size="xs"
              variant={undefined}
              onClick={() => markAsRead(n.id)}
            >
              <X />
            </Button>
          </DropdownMenuItem>
        );

      case "PET_REJECTED":
        return (
          <DropdownMenuItem
            key={n.id}
            className="relative flex items-center gap-2 px-4 border border-gray-400 w-full py-4"
            inset={undefined}
            onSelect={(e: Event) => e.preventDefault()}
          >
            <div className="flex items-center justify-center bg-red-600 text-white rounded-full p-1 scale-85">
              <div className="rounded-full flex items-center justify-center p-1">
                <X className="size-6" />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <p className="ml-2">
                <span className="text-sm font-semibold">
                  Pet Listing Rejected
                </span>
                <br />
                {n.message}
              </p>
              <p className="flex justify-end text-xs text-gray-500">
                {formatDistanceToNow(parseISO(n.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <Button
              type="button"
              className="absolute top-1 right-1 rounded-full p-1 hover:text-red-600"
              size="xs"
              variant={undefined}
              onClick={() => markAsRead(n.id)}
            >
              <X />
            </Button>
          </DropdownMenuItem>
        );

      case "PET_UPDATED":
        return (
          <DropdownMenuItem
            key={n.id}
            className="relative flex items-center gap-2 px-4 border border-gray-400 w-full py-4"
            inset={undefined}
            onSelect={(e: Event) => e.preventDefault()}
          >
            <div className="flex items-center justify-center bg-blue-600 text-white rounded-full p-1 scale-85">
              {" "}
              <div className="rounded-full flex items-center justify-center p-1">
                {" "}
                <PencilLineIcon className="size-6 mr-0.5" />{" "}
              </div>{" "}
            </div>
            <div className="flex flex-col w-full">
              <p className="ml-2">
                <span className="text-sm font-semibold">
                  Pet Listing Updated
                </span>
                <br />
                {n.message}
              </p>
              <p className="flex justify-end text-xs text-gray-500">
                {formatDistanceToNow(parseISO(n.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <Button
              type="button"
              className="absolute top-1 right-1 rounded-full p-1 hover:text-red-600"
              size="xs"
              variant={undefined}
              onClick={() => markAsRead(n.id)}
            >
              <X />
            </Button>
          </DropdownMenuItem>
        );

      case "PET_DELETED":
        return (
          <DropdownMenuItem
            key={n.id}
            className="relative flex items-center gap-2 px-4 border border-gray-400 w-full py-4"
            inset={undefined}
            onSelect={(e: Event) => e.preventDefault()}
          >
            <div className="flex items-center justify-center bg-red-600 text-white rounded-full p-1 scale-85">
              <div className="rounded-full flex items-center justify-center p-1">
                <Trash className="size-6" />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <p className="ml-2">
                <span className="text-sm font-semibold">
                  Pet Listing Removed
                </span>
                <br />
                {n.message}
              </p>
              <p className="flex justify-end text-xs text-gray-500">
                {formatDistanceToNow(parseISO(n.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <Button
              type="button"
              className="absolute top-1 right-1 rounded-full p-1 hover:text-red-600"
              size="xs"
              variant={undefined}
              onClick={() => markAsRead(n.id)}
            >
              <X />
            </Button>
          </DropdownMenuItem>
        );

      case "CONVERSATION_STARTED":
        return (
          <DropdownMenuItem
            key={n.id}
            className="relative flex items-center gap-2 px-4 border border-gray-400 w-full py-4"
            inset={undefined}
            onSelect={(e: Event) => e.preventDefault()}
          >
            <div className="flex items-center justify-center bg-blue-600 text-white rounded-full p-1 scale-85">
              <div className="rounded-full flex items-center justify-center p-1">
                <MessageCircle className="size-6" />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <p className="ml-2">
                <span className="text-sm font-semibold">
                  Conversation Started
                </span>
                <br />
                {n.message}
              </p>
              <p className="flex justify-end text-xs text-gray-500">
                {formatDistanceToNow(parseISO(n.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <Button
              type="button"
              className="absolute top-1 right-1 rounded-full p-1 hover:text-red-600"
              size="xs"
              variant={undefined}
              onClick={() => markAsRead(n.id)}
            >
              <X />
            </Button>
          </DropdownMenuItem>
        );

      case "CONVERSATION_DELETED":
        return (
          <DropdownMenuItem
            key={n.id}
            className="relative flex items-center gap-2 px-4 border border-gray-400 w-full py-4"
            inset={undefined}
            onSelect={(e: Event) => e.preventDefault()}
          >
            <div className="flex items-center justify-center bg-red-600 text-white rounded-full p-1 scale-85">
              <div className="rounded-full flex items-center justify-center p-1">
                <MessageCircleX className="size-6" />{" "}
              </div>{" "}
            </div>
            <div className="flex flex-col w-full">
              <p className="ml-2">
                <span className="text-sm font-semibold">
                  Conversation Ended
                </span>
                <br />
                {n.message}
              </p>
              <p className="flex justify-end text-xs text-gray-500">
                {formatDistanceToNow(parseISO(n.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <Button
              type="button"
              className="absolute top-1 right-1 rounded-full p-1 hover:text-red-600"
              size="xs"
              variant={undefined}
              onClick={() => markAsRead(n.id)}
            >
              <X />
            </Button>
          </DropdownMenuItem>
        );

      case "NEW_MESSAGES":
        return (
          <DropdownMenuItem
            key={n.id}
            className="relative flex items-center gap-2 px-4 border border-gray-400 w-full py-4"
            inset={undefined}
            onSelect={(e: Event) => e.preventDefault()}
          >
            <div className="flex items-center justify-center bg-green-600 text-white rounded-full p-1 scale-85">
              <div className="rounded-full flex items-center justify-center p-1">
                <MessagesSquare className="size-6" />{" "}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <p className="ml-2">
                <span className="text-sm font-semibold">New Messages</span>
                <br />
                {n.message}
              </p>
              <p className="flex justify-end text-xs text-gray-500">
                {formatDistanceToNow(parseISO(n.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <Button
              type="button"
              className="absolute top-1 right-1 rounded-full p-1 hover:text-red-600"
              size="xs"
              variant={undefined}
              onClick={() => markAsRead(n.id)}
            >
              <X />
            </Button>
          </DropdownMenuItem>
        );

      default:
        return null;
    }
  };

  const markAsRead = async (notificationId: number) => {
    markWSNotificationAsRead(notificationId);
    const res = await authService.markNotificationRead(notificationId);
    if (res.success && prevNotifications?.data) {
      queryClient.setQueryData(["notification"], (oldData: any) => {
        if (!oldData?.data) return oldData;
        return {
          ...oldData,
          data: oldData.data.filter(
            (notification: NotificationPayload) =>
              notification.id !== notificationId
          ),
        };
      });
    } else {
      toast.error("Failed to clear notification");
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {" "}
          <div className="relative inline-block mt-2">
            <Bell size={24} />
            {prevNotifications && prevNotifications.data && newNotifications ? (
              <Badge
                className={`absolute -top-1 -right-1 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums flex items-center justify-center text-xs scale-85 bg-red-600 text-white ${(prevNotifications?.data?.length || 0) +
                    (newNotifications?.notifications?.length || 0) ===
                    0
                    ? "hidden"
                    : ""}`} variant={undefined}              >
                {(prevNotifications?.data?.length || 0) +
                  (newNotifications?.notifications?.length || 0)}
              </Badge>
            ) : (
              <></>
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-lg py-2 flex flex-col gap-1 items-center bg-white hide-scrollbar">
          <DropdownMenuLabel className={undefined} inset={undefined}>
            Notifications
          </DropdownMenuLabel>
          {isError ? (
            <ErrorPage isError={isError} error={error} />
          ) : isPending ? (
            <Loading />
          ) : (prevNotifications.data && prevNotifications.data?.length > 0) ||
            (newNotifications.notifications &&
              newNotifications.notifications.length > 0) ? (
            <>
              {prevNotifications.data &&
                prevNotifications?.data.map((n) => renderNotification(n))}
              {newNotifications.notifications.map((n) => renderNotification(n))}
            </>
          ) : (
            <EmptyNotificationsBar />
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
//TODO: Unread Messages needs different markAsRead function Body
//BUG:  getting 2 notification count instead of getting 1 Solution here is to turn off strict mode becuz useEffects run twice
