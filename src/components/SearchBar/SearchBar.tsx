import { motion } from "framer-motion";
import {
  FindPetByExampleRequest,
  ListingMode,
  PetInfoPaginatedPublicResponse,
  SearchFilters,
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
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative w-full bg-[#e6dbcc]"
    >
      {/* Background Image */}
      <img
        src={`${import.meta.env.BASE_URL}images/searchBanner.png`}
        alt="Search Banner"
        className="absolute inset-0 w-full h-full object-contain rounded-md"
      />

      {/* Overlay */}
      <div className="absolute inset-0 md:bg-[#e6dbcc]/10 rounded-md h-full"></div>

      {/* Foreground Content */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.25 },
          },
        }}
        className="relative z-10 flex flex-col items-center text-center px-6 py-12 space-y-6"
      >
        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-sans text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl sm:leading-none"
        >
          Looking for a dog or a cat near you?
        </motion.h2>

        <motion.section
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            show: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="container mx-auto px-8 py-4 flex flex-col space-y-4 bg-black/60 rounded-2xl h-fit"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              show: { opacity: 1, y: 0 },
            }}
            className="flex flex-col items-center md:flex-row justify-between rounded-xl px-1 py-2"
          >
            <h2 className="hidden md:block text-white font-semibold text-lg">
              Search By
            </h2>

            <div className="flex items-center gap-4">
              {["name", "type", "breed", "location"].map((field) => (
                <motion.button
                  key={field}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={clsx(
                    "text-white rounded-full px-5 py-2 text-sm font-medium shadow hover:bg-red-800 transition",
                    searchField === field ? "bg-red-700 " : ""
                  )}
                  onClick={() => setSearchField(field as SearchFilters)}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 15 },
              show: { opacity: 1, y: 0 },
            }}
            className="flex flex-col md:flex-row"
          >
            <form
              className="flex flex-col items-center gap-2 md:flex-row w-full"
              onSubmit={handleSubmit}
            >
              <div className="flex w-full md:flex-1">
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

                <SearchInput
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  searchField={searchField}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-fit my-2 inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white bg-red-700 rounded-lg shadow-md hover:bg-red-800 transition md:ml-4"
              >
                Search
              </motion.button>
            </form>

            <motion.div
              variants={{
                hidden: { opacity: 0, x: 15 },
                show: { opacity: 1, x: 0 },
              }}
            >
              <AdvancedSearchDropDown
                mode={mode}
                setMode={setMode}
                advancedSearchBody={advancedSearchBody}
                setAdvancedSearchBody={setAdvancedSearchBody}
              />
            </motion.div>
          </motion.div>
        </motion.section>
      </motion.div>
    </motion.section>
  );
};

export default SearchBar;
