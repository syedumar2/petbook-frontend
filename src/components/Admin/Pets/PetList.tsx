import Pagination from "@/components/Pagination/Pagination";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import useAdminPets from "@/hooks/useAdminPets";
import { PetFilters, SortDirection } from "@/types/petListing";
import { useState } from "react";

const PetList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sortField, setSortField] = useState<keyof PetFilters>("name");

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const {
    data: pets,
    isError,
    error,
    isPending,
  } = useAdminPets({
    page: currentPage,
    size: 10,
    sortField,
    sortDirection,
  });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold ml-4">All Pets</h1>
        <div className="relative w-64">
          <input
            type="search"
            placeholder="Search pets..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider sticky top-0">
            <tr>
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
            {pets?.data?.content.map((pet, index) => (
              <tr
                key={pet.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50 transition`}
              >
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
      {pets?.data && (
        <Pagination
          className={
            pets?.data
              ? `flex justify-center items-center gap-3 my-6`
              : `hidden`
          }
          currentPage={(pets?.data.pageNumber ?? 0) + 1}
          totalPages={pets?.data.totalPages ?? 1}
          onPageChange={(page) => handlePageChange(page - 1)}
        />
      )}
    </div>
  );
};

export default PetList;
