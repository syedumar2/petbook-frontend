import {
  FindPetByExampleRequest,
  ListingMode,
  PetFilters,
  PetInfoPaginatedPublicResponse,
  SearchFilters,
  SearchKeys,
  SortDirection,
} from "@/types/petListing";
import AdvancedSearchDropDown from "../ui/AdvancedSearchDropDown";
import { SetStateAction, useState } from "react";
import { toast } from "sonner";
import { clsx } from "clsx";
import { SearchInput } from "./SearchInput";

type SearchProps = {
  mode: ListingMode;
  setMode: React.Dispatch<SetStateAction<ListingMode>>;
  isError: boolean;
  data: PetInfoPaginatedPublicResponse | undefined;
  error: Error | null;
  isPending: boolean;
  handlePageChange: (page: number) => void;
  searchParams: Record<string, string>;
  setSearchParams: React.Dispatch<SetStateAction<Record<string, string>>>;
  advancedSearchBody: FindPetByExampleRequest;
  setAdvancedSearchBody: React.Dispatch<
    React.SetStateAction<FindPetByExampleRequest>
  >;
};

const SearchBar = ({
  mode,
  setMode,
  isError,
  data,
  error,
  isPending,
  handlePageChange,
  searchParams,
  setSearchParams,
  advancedSearchBody,
  setAdvancedSearchBody,
}: SearchProps) => {
  const [searchField, setSearchField] = useState<SearchFilters>("name");
  const [searchValue, setSearchValue] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchField === null || searchValue === null) {
      return toast.error("Please enter a search term");
    }
    setMode("search");
    return setSearchParams(
      searchValue.trim() ? { [searchField]: searchValue.trim() } : {}
    );
  };

  return (
    <section className="w-full min-h-[267px] rounded-md  bg-center md:bg-[url('/images/searchBanner.png')]">
      <h2 className="text-center py-8 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
        Looking for a dog or a cat near you?
      </h2>
      <section className="container mx-auto  px-8 py-4 flex flex-col space-y-4 bg-black/60 rounded-2xl h-fit ">
        <div className="flex items-center justify-between  rounded-xl px-1 py-2">
          {/* Title */}
          <h2 className="text-white font-semibold text-lg">Search By</h2>

          {/* Filter options */}
          <div className="flex items-center gap-4">
            <button
              className={clsx(
                "text-white rounded-full px-5 py-2 text-sm font-medium shadow hover:bg-red-800 active:scale-95 transition",
                searchField === "name" ? "bg-red-700 " : ""
              )}
              onClick={() => setSearchField("name")}
            >
              Name
            </button>
            <button
              className={clsx(
                "text-white rounded-full px-5 py-2 text-sm font-medium shadow hover:bg-red-800 active:scale-95 transition",
                searchField === "type" ? "bg-red-700 " : ""
              )}
              onClick={() => setSearchField("type")}
            >
              Type
            </button>
            <button
              className={clsx(
                "text-white rounded-full px-5 py-2 text-sm font-medium shadow hover:bg-red-800 active:scale-95 transition",
                searchField === "breed" ? "bg-red-700 " : ""
              )}
              onClick={() => setSearchField("breed")}
            >
              Breed
            </button>
            <button
              className={clsx(
                "text-white rounded-full px-5 py-2 text-sm font-medium shadow hover:bg-red-800 active:scale-95 transition",
                searchField === "location" ? "bg-red-700 " : ""
              )}
              onClick={() => setSearchField("location")}
            >
              Location
            </button>
          </div>
        </div>
        <div className="flex">
          <form className="flex w-full items-center" onSubmit={handleSubmit}>
            {/* icon + input wrapper */}
            <div className="flex flex-1">
              {/* icon */}
              <span className="flex items-center justify-center w-12 border border-r-0 border-gray-300 bg-white h-12">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M21 21l-4.3-4.3m1.3-5.4a6.7 6.7 0 11-13.4 0 6.7 6.7 0 0113.4 0z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </span>

              {/* input */}
              <SearchInput
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                searchField={searchField}
              />
            </div>

            {/* button */}
            <button
              type="submit"
              className="ml-4 inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white bg-red-700 rounded-lg shadow-md hover:bg-red-800 transition"
            >
              Search
            </button>
          </form>
          <AdvancedSearchDropDown
            mode={mode}
            setMode={setMode}
            advancedSearchBody={advancedSearchBody}
            setAdvancedSearchBody={setAdvancedSearchBody}
          />
        </div>
      </section>
    </section>
  );
};

export default SearchBar;
