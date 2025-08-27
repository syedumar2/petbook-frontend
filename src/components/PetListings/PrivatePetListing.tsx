import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { usePrivatePets } from "@/hooks/usePrivatePets";
import { EmptyPage } from "../ErrorPage/EmptyPage";
import Pagination from "../Pagination/Pagination";
import { Loading } from "../Loader/Loading";
import SortDropdown from "../ui/SortDropDown";
import { PetFilters, SortDirection } from "@/types/petListing";

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
                className="border border-gray-500 rounded-2xl shadow hover:shadow-lg transition overflow-hidden w-[380px] h-[410px] pt-4"
              >
                <CardContent className="px-4 py-0">
                  <img
                    src={
                      pet.imageUrls && pet.imageUrls[0]
                        ? Object.keys(pet.imageUrls[0])[0]
                        : "/placeholder-image.png"
                    }
                    alt={pet.name}
                    className="w-full h-48 object-cover mb-2 rounded-lg"
                  />

                  <div className="ml-1">
                    <CardHeader className="p-0">
                      <CardTitle className="text-xl font-semibold text-gray-800">
                        {pet.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600 text-sm">
                        {pet.type} - {pet.breed}
                      </CardDescription>
                    </CardHeader>

                    <p className="text-gray-500 text-sm mt-1">
                      Location: {pet.location}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      Owner: {pet.owner}
                    </p>

                    {pet.adopted && (
                      <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">
                        Adopted
                      </span>
                    )}
                    <p className="mt-2 text-sm">
                      Status:{" "}
                      {pet.approved ? (
                        <span className="px-2 py-1 rounded-full bg-green-500 text-white font-semibold text-xs">
                          Approved at {pet.approvedAt}
                        </span>
                      ) : pet.approvedAt?.length === 0 &&
                        pet.rejectedAt?.length === 0 ? (
                        <span className="px-2 py-1 rounded-full bg-gray-400 text-white font-semibold text-xs">
                          No action taken
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded-full bg-red-500 text-white font-semibold text-xs">
                          Rejected at {pet.rejectedAt}
                        </span>
                      )}
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
