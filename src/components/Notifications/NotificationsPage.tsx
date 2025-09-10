import { useAllNotificationsQuery } from '@/hooks/useAllNotificationsQuery';
import { NotificationPayload } from '@/types/user';
import { formatDistanceToNow, parseISO } from 'date-fns';
import {
  PawPrint,
  X,
  Check,
  PencilLineIcon,
  Trash,
  MessageCircle,
  MessageCircleX,
  MessagesSquare,
} from 'lucide-react';
import { Button } from '../ui/button';
import { JSX } from 'react';
import { ErrorPage } from '../ErrorPage';
import EmptyNotificationsBar from '../ErrorPage/EmptyNotificationsBar';
import { Loading } from '../Loader/Loading';




const NotificationsPage = () => {
  const { data: notificationsData, isPending, isError, error } = useAllNotificationsQuery();
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
      WELCOME: 'Welcome',
      PET_APPROVED: 'Pet Listing Approved',
      PET_REJECTED: 'Pet Listing Rejected',
      PET_UPDATED: 'Pet Listing Updated',
      PET_DELETED: 'Pet Listing Removed',
      CONVERSATION_STARTED: 'Conversation Started',
      CONVERSATION_DELETED: 'Conversation Ended',
      NEW_MESSAGES: 'New Messages',
    };

    const bgColors: Record<string, string> = {
      WELCOME: 'bg-red-600',
      PET_APPROVED: 'bg-green-600',
      PET_REJECTED: 'bg-red-600',
      PET_UPDATED: 'bg-blue-600',
      PET_DELETED: 'bg-red-600',
      CONVERSATION_STARTED: 'bg-blue-600',
      CONVERSATION_DELETED: 'bg-red-600',
      NEW_MESSAGES: 'bg-green-600',
    };

    return (
      <div
        key={n.id}
        className="relative flex items-center gap-2 px-4 border border-gray-400 w-full py-4"
      >
        <div className={`flex items-center justify-center ${bgColors[n.type]} text-white rounded-full p-1 scale-85`}>
          <div className="rounded-full flex items-center justify-center p-1">{icons[n.type]}</div>
        </div>

        <div className="flex flex-col w-full">
          <p className="ml-2">
            <span className="text-sm font-semibold">{titles[n.type]}</span>
            <br />
            {n.message}
          </p>
          <p className="flex justify-end text-xs text-gray-500">
            {formatDistanceToNow(parseISO(n.createdAt), { addSuffix: true })}
          </p>
        </div>

        <Button
          type="button"
          className="absolute top-1 right-1 rounded-full p-1 hover:text-red-600"
          size="xs"
          variant={undefined}
        disabled
>
          <X />
        </Button>
      </div>
    );
  };

  if (isError) return <ErrorPage isError={isError} error={error} />;
  if (isPending) return <Loading />;
  if (notifications.length === 0) return <EmptyNotificationsBar />;

  return <>{notifications.map((n) => renderNotification(n))}</>;
};

export default NotificationsPage;
//TODO Build delete function for messages and improve styling   
//TODO start admin panel after this 