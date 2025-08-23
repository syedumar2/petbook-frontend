import {
  Header,
  SearchBar,
  GeneralPetListing,
  Footer,
  Loading,
} from "@/components";
import { useFetchPets } from "@/hooks/useFetchPets";
import { ListingMode, PetFilters, SortDirection } from "@/types/petListing";
import {  useState } from "react";


const PetListing = () => {
  const [mode, setMode] = useState<ListingMode>("default");
  const [currentPage, setCurrentPage] = useState(0);
  const [sortField, setSortField] = useState<keyof PetFilters>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [searchParams, setSearchParams] = useState<Record<string, string>>({});

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { data, isError, error, isPending } = useFetchPets({
    mode,
    page: currentPage,
    size: 4,
    sortField,
    sortDirection,
    searchParams,
  });

  return (
    <div>
      <Header />
      <main>
        <SearchBar
          mode={mode}
          setMode={setMode}
          isError={isError}
          data={data}
          error={error}
          isPending={isPending}
          handlePageChange={handlePageChange}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />

        <GeneralPetListing
          mode={mode}
          isError={isError}
          data={data}
          error={error}
          isPending={isPending}
          handlePageChange={handlePageChange}
          setSortField={setSortField}
          sortField={sortField}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          searchValue={Object.values(searchParams)[0] ?? ""}
          setMode={setMode}
        />
      </main>
      <Footer />
    </div>
  );
};

export default PetListing;
