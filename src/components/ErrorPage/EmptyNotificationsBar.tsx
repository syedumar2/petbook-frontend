import { BellOff } from "lucide-react";

const EmptyNotificationsBar = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-6">
      <BellOff size={50} className="mb-2" />
      <p className="text-lg font-medium">No Notifications</p>
      <p className="text-sm">You’re all caught up! 🎉</p>
    </div>
  );
};

export default EmptyNotificationsBar;
