import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { formatDistanceToNow, parseISO } from "date-fns";

import { usePrivatePets } from "@/hooks/usePrivatePets";

import { PetFilters, SortDirection } from "@/types/petListing";
import { EmptyPage } from "@/components/ErrorPage";
import { Loading } from "@/components/Loader/Loading";
import Pagination from "@/components/Pagination/Pagination";
import SortDropdown from "@/components/ui/SortDropDown";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const PrivatePetListing = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const [sortField, setSortField] = useState<keyof PetFilters>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handlePageChange = (page: number) => setCurrentPage(page);

  const { data, isPending, isError, error } = usePrivatePets({
    mode: true,
    params: {
      page: currentPage,
      size: 4,
      sortField,
      sortDirection,
    },
  });
  console.log(data?.data)
  return (
    <section className="flex flex-col ">
      <div className="flex justify-between items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold mx-8 my-4">My Pets</h2>
        <SortDropdown
          sortDirection={sortDirection}
          sortField={sortField}
          setSortDirection={setSortDirection}
          setSortField={setSortField}
        />
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 px-4 pb-12 justify-items-center">
        {isPending ? (
          <Loading />
        ) : data?.data?.content ? (
          data.data.content.map((pet) => (
            <Link key={pet.id} to={`/profile/pets/${pet.id}`}>
              <Card
                key={pet.id}
                className="border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden w-[380px] h-[440px] bg-white"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={
                      pet?.imageUrl
                        ? pet.imageUrl
                        : "/placeholder-image.png"
                    }
                    alt={pet.name}
                    className="w-full h-48 object-cover mb-2 rounded-lg"
                  />

                  {pet.adopted && (
                    <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                      Adopted
                    </span>
                  )}
                </div>

                <CardContent className="p-4">
                  {/* Pet Info */}
                  <CardHeader className="p-0 mb-2">
                    <CardTitle className="text-xl font-bold text-gray-800 truncate">
                      {pet.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600 text-sm leading-relaxed">
                      <span className="font-medium">{pet.type}</span> <br />
                      {pet.breed ?? (
                        <span className="italic text-gray-400">
                          Breed not defined
                        </span>
                      )}{" "}
                      <br />
                      {pet.gender
                        ? pet.gender.charAt(0) +
                          pet.gender.slice(1).toLowerCase()
                        : "Unknown"}
                    </CardDescription>
                  </CardHeader>

                  {/* Location & Owner */}
                  <div className="flex flex-col gap-1 text-sm text-gray-500">
                    <p>
                      <span className="font-medium text-gray-700">
                        Location:
                      </span>{" "}
                      {pet.location}
                    </p>
                    <p>
                      <span className="font-medium text-gray-700">Owner:</span>{" "}
                      {pet.owner}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-gray-500">
                    <p className="mt-2 text-sm">
                      Status:{" "}
                      {pet.approved && pet.approvedAt ? (
                        <span className="px-2 py-1 rounded-full bg-green-500 text-white font-semibold text-xs">
                          Approved{" "}
                          {formatDistanceToNow(parseISO(pet.approvedAt), {
                            addSuffix: true,
                          })}
                        </span>
                      ) : !pet.approvedAt && !pet.rejectedAt ? (
                        <span className="px-2 py-1 rounded-full bg-gray-400 text-white font-semibold text-xs">
                          No action taken
                        </span>
                      ) : pet.rejectedAt ? (
                        <span className="px-2 py-1 rounded-full bg-red-500 text-white font-semibold text-xs">
                          Rejected{" "}
                          {formatDistanceToNow(parseISO(pet.rejectedAt), {
                            addSuffix: true,
                          })}
                        </span>
                      ) : null}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <EmptyPage />
        )}
      </section>
      <Link to="/profile/pets/add">
        <button
          className="group fixed bottom-10 right-10 z-50 flex items-center 
               rounded-full px-4 py-3 shadow-lg bg-red-700 text-white
               text-sm font-medium hover:bg-red-800 active:scale-95
               transition-all duration-300 ease-in-out"
        >
          <Plus className="w-5 h-5" />
          <span
            className="opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-[100px]
                 transition-all duration-300 ease-in-out whitespace-nowrap"
          >
            Add Pet
          </span>
        </button>
      </Link>

      <Pagination
        className={
          data?.data ? "flex justify-center items-center gap-3 my-6" : "hidden"
        }
        currentPage={(data?.data?.pageNumber ?? 0) + 1}
        totalPages={data?.data?.totalPages ?? 1}
        onPageChange={(page) => handlePageChange(page - 1)}
      />
    </section>
  );
};

export default PrivatePetListing;
