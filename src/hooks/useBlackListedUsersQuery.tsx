import { adminService } from "@/services/adminService";
import { ApiResponse, PageResponse, UserDetailsResponse } from "@/types/admin";
import { useQuery } from "@tanstack/react-query";

const useBlackListedUsersQuery = ({
  page,
  size,
  sortField,
  sortDirection,
}: {
  page: number;
  size?: number;
  sortField: string;
  sortDirection: "asc" | "desc";
}) => {
  return useQuery<ApiResponse<PageResponse<UserDetailsResponse>>, Error>({
    queryKey: ["blacklisted-users", page, size, sortField, sortDirection],
    queryFn: () =>
      adminService.getBlackListedUsers({
        page,
        size,
        sortField,
        sortDirection,
      }),
    staleTime: 5 * 60 * 1000,
  });
};

export default useBlackListedUsersQuery;
