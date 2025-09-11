import { BellOff } from "lucide-react";

export const EmptyNotificationsPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      <BellOff size={64} />
      <h2 className="text-center  font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
        No Notifications
      </h2>
      <h2 className=" font-semibold text-lg">You’re all caught up! 🎉</h2>

    </div>
  );
};
