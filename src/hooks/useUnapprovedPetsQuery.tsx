import { adminService } from "@/services/adminService";
import { ApiResponse, PageResponse } from "@/types/admin";
import { PrivatePetListing } from "@/types/petListing";
import { useQuery } from "@tanstack/react-query";

const useUnapprovedPetsQuery = ({
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
  return useQuery<ApiResponse<PageResponse<PrivatePetListing>>, Error>({
    queryKey: ["unapproved", page, size, sortField, sortDirection],
    queryFn: () =>
      adminService.getUnapprovedPets({
        page,
        size,
        sortField,
        sortDirection,
      }),
    staleTime: 5 * 60 * 1000,
  });
};

export default useUnapprovedPetsQuery;
