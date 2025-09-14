import Pagination from "@/components/Pagination/Pagination";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import SortDropdown from "@/components/ui/SortDropDown";
import useApprovedPetsQuery from "@/hooks/useApprovedPetsQuery";
import { adminService } from "@/services/adminService";
import { PetFilters, SortDirection } from "@/types/petListing";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCheck, ChevronDown, CircleX } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ApprovedPets = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sortField, setSortField] = useState<keyof PetFilters>("name");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const queryClient = useQueryClient();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleChange = (petId: number) => {
    if (!selectedIds.includes(petId)) {
      setSelectedIds((prev) => [...prev, petId]);
    } else {
      setSelectedIds((prev) => prev.filter((id) => id !== petId));
    }
  };

  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const {
    data: approvedPets,
    isPending,
    isError,
    error,
  } = useApprovedPetsQuery({
    page: currentPage,
    size: 10,
    sortField,
    sortDirection,
  });
  
  const rejectPets = async () => {
    if (selectedIds.length === 0) return;
    const res = await adminService.rejectPets({ ids: selectedIds });
    if (res.success) {
      queryClient.invalidateQueries({ queryKey: ["approved"] });
      setSelectedIds([]);
      return toast.success(res.message);
    } else {
      return toast.error(res.message);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      {/* Page Header */}
      <div className="flex flex-col item-start gap-6 justify-between mb-6">
        <div className="flex w-full items-center justify-between py-2 ">
          <h1 className="text-2xl ml-4 font-bold">Approved Pets</h1>
          <SortDropdown
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
              <th className="p-3 text-center">Select</th>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Breed</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Owner</th>
              <th className="p-3 text-left">Adopted</th>
              <th className="p-3 text-left">Approved</th>
      
            </tr>
          </thead>
          <tbody>
            {approvedPets?.data?.content.map((pet, index) => (
              <tr
                key={pet.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50 transition`}
              >
                <td className="p-3 text-gray-600 text-center">
                  <Checkbox
                    checked={pet.id && selectedIds.includes(pet.id)}
                    onCheckedChange={() => {
                      if (pet.id) handleChange(pet.id);
                    }}
                    className={undefined}
                  />
                </td>
                <td className="p-3 text-gray-600">{pet.id}</td>
                <td className="p-3">
                  <img
                    src={
                      pet.imageUrls && pet.imageUrls[0]
                        ? Object.keys(pet.imageUrls[0])[0]
                        : "/placeholder-image.png"
                    }
                    alt={`${pet.name}`}
                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                  />
                </td>
                <td className="p-3 font-medium">{`${pet.name}`}</td>
                <td className="p-3 text-gray-600">{pet.type}</td>
                <td className="p-3 text-gray-600">{pet.breed}</td>
                <td className="p-3 text-gray-600">{pet.location}</td>
                <td className="p-3 text-gray-600">{pet.owner}</td>

                <td className="p-3 text-gray-600">
                  {pet.adopted ? (
                    <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-white bg-green-600 rounded-full">
                      Adopted
                    </span>
                  ) : (
                    <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">
                      Not Adopted
                    </span>
                  )}
                </td>
                <HoverCard>
                  <HoverCardTrigger>
                    <td className="p-3 text-gray-600">
                      {pet.approved ? (
                        <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-white bg-green-600 rounded-full">
                          Approved
                        </span>
                      ) : pet.approved === null ? (
                        <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-white bg-gray-600 rounded-full">
                          No Action taken
                        </span>
                      ) : (
                        <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">
                          Rejected
                        </span>
                      )}
                    </td>
                  </HoverCardTrigger>
                  <HoverCardContent className={"bg-white w-full"}>
                    <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                      <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                        <tr>
                          <th className="px-6 py-3 text-left">Approved At</th>
                          <th className="px-6 py-3 text-left">Rejected At</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t hover:bg-gray-50">
                          <td className="px-6 py-4 text-gray-800">
                            {(pet.approvedAt &&
                              new Date(pet.approvedAt).toLocaleString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              })) ||
                              "—"}
                          </td>
                          <td className="px-6 py-4 text-gray-800">
                            {(pet.rejectedAt &&
                              new Date(pet.rejectedAt).toLocaleString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              })) ||
                              "—"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </HoverCardContent>
                </HoverCard>
          
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {approvedPets?.data && (
        <Pagination
          className={
            approvedPets?.data
              ? `flex justify-center items-center gap-3 my-6`
              : `hidden`
          }
          currentPage={(approvedPets?.data.pageNumber ?? 0) + 1}
          totalPages={approvedPets?.data.totalPages ?? 1}
          onPageChange={(page) => handlePageChange(page - 1)}
        />
      )}
      <button
        onClick={() => {
          if (approvedPets && approvedPets.data)
            setSelectedIds(
              approvedPets.data?.content?.map((n) => Number(n.id))
            );
          else return;
        }}
        className={
          selectedIds.length > 0
            ? "fixed bottom-6 left-6 w-14 h-14 flex items-center justify-center rounded-full bg-white text-blue-500 shadow-lg hover:bg-gray-100 transition-all"
            : "hidden"
        }
      >
        <CheckCheck />
      </button>
      <button
        onClick={() => rejectPets()}
        className={
          selectedIds.length > 0
            ? "fixed bottom-6 right-6 w-14 h-14 flex items-center justify-center rounded-full text-white bg-red-500 shadow-lg hover:bg-red-600 transition-all"
            : "hidden"
        }
      >
        <CircleX size={40} />
      </button>
    </div>
  );
};

export default ApprovedPets;
