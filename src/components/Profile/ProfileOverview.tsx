import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";

const ProfileOverview = () => {
  const { user } = useAuth();
  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow mt-4">
      <h2 className="text-2xl font-semibold mb-6">My Profile</h2>

      <div className="flex items-center gap-6 mb-6">
        <Avatar className={"size-18"}>
          <AvatarImage src={user?.profileImageUrl} className={undefined} />
          <AvatarFallback className="bg-cyan-700 p-2 text-2xl text-white">
            {user?.firstname.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-lg font-medium">
            {user?.firstname} {user?.lastname}
          </p>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <p className="text-sm text-gray-500">{user?.roles[0]?.authority}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Created At</label>
          <input
            type="text"
            value={user?.createdAt}
            className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
            readOnly
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            value={user?.location}
            className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
            readOnly
          />
        </div>{" "}
        <div className="flex justify-end mt-2">
          <Button
            className="bg-red-700 text-white rounded-full px-8 py-2 text-sm font-medium shadow hover:bg-red-800 active:scale-95"
            variant={undefined}
            size={undefined}
          >
            Update Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
