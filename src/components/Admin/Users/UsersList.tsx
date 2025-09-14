import Pagination from "@/components/Pagination/Pagination";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UserListSortDropDown from "@/components/ui/UserListSortDropDown";
import useUsersQuery from "@/hooks/useUsersQuery";
import { adminService } from "@/services/adminService";
import { SortDirection } from "@/types/petListing";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export type UserSortFilters = "createdAt" | "firstname" | "role";
const UsersList = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(0);
  const [sortField, setSortField] = useState<UserSortFilters>("createdAt");
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleWhitelist = async (userId: number) => {
    const res = await adminService.whiteListUser(userId);
    if (res.success) {
      queryClient.invalidateQueries({
        queryKey: ["blacklisted-users"],
      });
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    return;
  };
  const [blacklistDialogopen, setBlacklistDialogOpen] = useState(false);
  const [blackListData, setBlackListData] = useState<{
    userId: number;
    reason: string;
  }>({
    userId: 0,
    reason: "",
  });

  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const {
    data: users,
    isPending,
    isError,
    error,
  } = useUsersQuery({
    page: currentPage,
    size: 10,
    sortField,
    sortDirection,
  });
  const handleBlacklist = async (
    e: React.FormEvent,
    data: { userId: number; reason: string }
  ) => {
    e.preventDefault();

    if (!data.reason) {
      toast.error("Enter a reason for blacklisting");
      return;
    }

    if (!data.userId) {
      toast.error("Invalid user id");
      return;
    }

    const res = await adminService.blackListUser(data.userId, data.reason);

    if (res.success) {
      toast.success(res.message);
      setBlacklistDialogOpen(false);
      setBlackListData({ userId: 0, reason: "" });
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      {/* Page Header */}
      <div className="flex flex-col item-start gap-6 justify-between mb-6">
        <div className="flex w-full items-center justify-between py-2 ">
          <h1 className="text-2xl ml-4 font-bold">Users</h1>
          <UserListSortDropDown
            sortDirection={sortDirection}
            sortField={sortField}
            setSortDirection={setSortDirection}
            setSortField={setSortField}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full bg-white border border-gray-700 rounded-lg">
          <thead className="bg-gray-700 text-gray-100 text-sm uppercase tracking-wider sticky top-0">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Profile</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.data?.content.map((user, index) => (
              <tr
                key={user.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50 transition`}
              >
                <td className="p-3 text-gray-600">{user.id}</td>
                <td className="p-3">
                  <img
                    src={
                      user.profileImageUrl ??
                      "https://www.svgrepo.com/show/109737/profile-user.svg"
                    }
                    alt={`${user.firstname} ${user.lastname}`}
                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                  />
                </td>
                <td className="p-3 font-medium">{`${user.firstname} ${user.lastname}`}</td>
                <td className="p-3 text-gray-600">{user.email}</td>
                <td className="p-3 text-gray-600">{user.location}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "ADMIN"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-3 text-gray-500 text-sm">
                  {new Date(user.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="p-3 text-gray-600">
                  <Dialog
                    open={blacklistDialogopen}
                    onOpenChange={setBlacklistDialogOpen}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="bg-gray-700 text-white rounded-full text-sm font-medium shadow hover:bg-red-800 active:scale-95"
                          variant={undefined}
                          size={undefined}
                        >
                          Actions
                          <ChevronDown />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white">
                        <DropdownMenuItem
                          className={undefined}
                          inset={undefined}
                          onClick={() => handleWhitelist(user.id)}
                        >
                          ✅ Whitelist
                        </DropdownMenuItem>
                        <DialogTrigger asChild>
                          <DropdownMenuItem
                            className={undefined}
                            inset={undefined}
                          >
                            ❌ Blacklist
                          </DropdownMenuItem>
                        </DialogTrigger>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent className="bg-white p-6 rounded-2xl shadow-lg">
                      <DialogHeader className={"mb-0"}>
                        <DialogTitle className="text-lg font-semibold text-gray-800">
                          Blacklist User:{" "}
                          <span className="font-bold text-red-600">
                            {user.firstname} {user.lastname}
                          </span>
                        </DialogTitle>
                        <p className="text-sm text-gray-500 mt-1">
                          Please provide a reason for blacklisting this user.
                        </p>
                      </DialogHeader>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setBlackListData((prev) => {
                            const updated = { ...prev, userId: user.id };
                            handleBlacklist(e, updated); // pass the updated object
                            return updated;
                          });
                        }}
                      >
                        <div className="grid gap-3 pb-3">
                          <Label
                            htmlFor="reason"
                            className="text-sm font-medium text-gray-700"
                          >
                            Reason
                          </Label>
                          <Textarea
                            id="reason"
                            name="reason"
                            value={blackListData?.reason || ""}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setBlackListData((prev) => ({
                                ...prev,
                                reason: e.target.value,
                              }))
                            }
                            placeholder="Enter reason for ban"
                            className="min-h-[100px] rounded-lg border-gray-300 "
                          />
                        </div>

                        <DialogFooter className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            className="rounded-lg"
                            onClick={() => setBlacklistDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="bg-red-600 hover:bg-red-700 text-white rounded-lg"
                          >
                            Confirm
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {users?.data && (
        <Pagination
          className={
            users?.data
              ? `flex justify-center items-center gap-3 my-6`
              : `hidden`
          }
          currentPage={(users?.data.pageNumber ?? 0) + 1}
          totalPages={users?.data.totalPages ?? 1}
          onPageChange={(page) => handlePageChange(page - 1)}
        />
      )}
    </div>
  );
};

export default UsersList;
//TODO IMplement search functionality in the future
