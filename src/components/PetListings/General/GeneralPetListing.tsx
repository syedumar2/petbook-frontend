import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

import SortDropdown from "../../ui/SortDropDown";
import Pagination from "../../Pagination/Pagination";
import { ErrorPage } from "../../ErrorPage/ErrorPage";
import {
  ListingMode,
  PetFilters,
  PetInfoPaginatedPublicResponse,
  SortDirection,
} from "@/types/petListing";
import { EmptyPage } from "../../ErrorPage/EmptyPage";
import { Loading } from "../../Loader/Loading";
import { CircleX } from "lucide-react";
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
  const { user } = useAuth();
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
            ? `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 px-4  justify-items-center`
            : ``
        }
      >
        {isPending ? (
          <Loading />
        ) : data?.data?.content ? (
          data?.data?.content.map((pet, index) => (
            <Link
              key={pet.id}
              to={
                user?.email === pet.owner
                  ? `/profile/pets/${pet.id}`
                  : `/pets/${pet.id}`
              }
            >
              <Card
                key={index}
                className="border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden w-[380px] h-[410px] bg-white"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={pet.imageUrls[0]}
                    alt={pet.name}
                    className="w-full h-48 object-cover"
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
