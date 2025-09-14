import { adminService } from "@/services/adminService";
import { ApiResponse, PageResponse } from "@/types/admin";
import { PrivatePetInfoResponse, PrivatePetListing } from "@/types/petListing";
import { useQuery } from "@tanstack/react-query";

const useApprovedPetsQuery = ({
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
    queryKey: ["approved", page, size, sortField, sortDirection],
    queryFn: () =>
      adminService.getApprovedPets({
        page,
        size,
        sortField,
        sortDirection,
      }),
    staleTime: 5 * 60 * 1000,
  });
};
export default useApprovedPetsQuery;
