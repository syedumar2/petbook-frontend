import { EmptyPage } from "@/components/ErrorPage";
import Pagination from "@/components/Pagination/Pagination";
import UserListSortDropDown from "@/components/ui/UserListSortDropDown";
import useBlackListedUsersQuery from "@/hooks/useBlackListedUsersQuery";
import { adminService } from "@/services/adminService";
import { SortDirection } from "@/types/petListing";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

const BlackListedUsers = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(0);
  const [sortField, setSortField] = useState<
    "blacklistedAt" | "role" | "firstname"
  >("blacklistedAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const {
    data: users,
    isPending,
    isError,
    error,
    refetch,
  } = useBlackListedUsersQuery({
    page: currentPage,
    size: 10,
    sortField,
    sortDirection,
  });

  const handleWhitelist = async (userId: number) => {
    const res = await adminService.whiteListUser(userId);
    if (res.success) {
      queryClient.invalidateQueries({
        queryKey: ["blacklisted-users"  ],
      });
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
    return;
  };

  if (users?.data?.totalElements === 0) return <EmptyPage />;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      {/* Page Header */}
      <div className="flex flex-col item-start gap-6 justify-between mb-6">
        <div className="flex w-full items-center justify-between py-2">
          <h1 className="text-2xl ml-4 font-bold">Blacklisted Users</h1>
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
        <table className="w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider sticky top-0">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Profile</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Created At</th>
              <th className="p-3 text-left">Blacklisted At</th>
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
                      "https://www.svgrepo.com/show/105517/user-icon.svg"
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
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                {/* ✅ Blacklisted At column */}
                <td className="p-3 text-gray-500 text-sm">
                  {user.blacklistedAt
                    ? new Date(user.blacklistedAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "-"}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleWhitelist(user.id)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    Whitelist
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {users?.data && (
        <Pagination
          className={
            users?.data
              ? "flex justify-center items-center gap-3 my-6"
              : "hidden"
          }
          currentPage={(users?.data.pageNumber ?? 0) + 1}
          totalPages={users?.data.totalPages ?? 1}
          onPageChange={(page) => handlePageChange(page - 1)}
        />
      )}
    </div>
  );
};

export default BlackListedUsers;
