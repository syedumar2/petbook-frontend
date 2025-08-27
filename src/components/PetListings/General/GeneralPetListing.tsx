import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

import SortDropdown from "../../ui/SortDropDown";
import { useFetchPets } from "@/hooks/useFetchPets";
import Pagination from "../../Pagination/Pagination";
import { useState } from "react";
import { ErrorPage } from "../../ErrorPage/ErrorPage";
import {
  ListingMode,
  PetFilters,
  PetInfoPaginatedPublicResponse,
  SortDirection,
} from "@/types/petListing";
import { EmptyPage } from "../../ErrorPage/EmptyPage";
import { Loading } from "../../Loader/Loading";
import { CircleX, CrossIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { useAuth } from "@/hooks/useAuth";

type GeneralPetListingProps = {
  mode: ListingMode;
  isError: boolean;
  data: PetInfoPaginatedPublicResponse | undefined;
  error: Error | null;
  isPending: boolean;
  handlePageChange: (page: number) => void;
  setSortField: React.Dispatch<React.SetStateAction<keyof PetFilters>>;
  sortField: keyof PetFilters;
  sortDirection: SortDirection;
  setSortDirection: React.Dispatch<React.SetStateAction<SortDirection>>;
  searchValue: string;
  setMode: React.Dispatch<React.SetStateAction<ListingMode>>;
};

const GeneralPetListing = ({
  mode,
  isError,
  data,
  error,
  isPending,
  handlePageChange,
  setSortField,
  sortField,
  sortDirection,
  setSortDirection,
  searchValue,
  setMode,
}: GeneralPetListingProps) => {
  const {user} = useAuth();
  return !isError ? (
    <section>
      <div className="flex mx-auto px-6 pt-4 justify-between w-full">
        {mode === "search" ? (
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-800">
              Showing results for:{" "}
              <span className="font-semibold text-gray-900">{searchValue}</span>
            </h3>

            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-red-600 hover:bg-red-50 transition"
              onClick={() => setMode("default")}
            >
              <CircleX size={18} />
            </Button>
          </div>
        ) : mode === "advancedSearch" ? (
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-800">
              Showing Advanced Search results{" "}
            </h3>

            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-red-600 hover:bg-red-50 transition"
              onClick={() => setMode("default")}
            >
              <CircleX size={18} />
            </Button>
          </div>
        ) : (
          <div></div>
        )}
        <SortDropdown
          sortDirection={sortDirection}
          sortField={sortField}
          setSortDirection={setSortDirection}
          setSortField={setSortField}
        />
      </div>
      <section
        className={
          data?.data?.content
            ? `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 px-4 pb-12 justify-items-center`
            : ``
        }
      >
        {isPending ? (
          <Loading />
        ) : data?.data?.content ? (
          data?.data?.content.map((pet, index) => (
            <Link key={pet.id} to={user?.email === pet.owner ? `/profile/pets/${pet.id}`:`/pets/${pet.id}`}>
              <Card
                key={index}
                className="border border-gray-500 rounded-2xl shadow hover:shadow-lg transition overflow-hidden w-[380px] h-[380px] pt-4"
              >
                {/* Image */}
                <CardContent className="px-4 py-0">
                  <img
                    src={pet.imageUrls[0]}
                    alt={pet.name}
                    className="w-full h-48 object-cover mb-2 rounded-lg"
                  />
                  {/* Card Info */}
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
                    {pet.adopted && (
                      <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">
                        Adopted
                      </span>
                    )}
                    <p className="text-gray-500 text-sm mt-2">
                      Owner: {pet.owner}
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
          data?.data ? `flex justify-center items-center gap-3 my-6` : `hidden`
        }
        currentPage={(data?.data?.pageNumber ?? 0) + 1}
        totalPages={data?.data?.totalPages ?? 1}
        onPageChange={(page) => handlePageChange(page - 1)}
      />
    </section>
  ) : (
    <ErrorPage isError={isError} error={error} />
  );
};

export default GeneralPetListing;
