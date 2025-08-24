import { publicService } from "@/services/publicService";
import { SearchFilters } from "@/types/petListing";
import { useDebounce } from "@uidotdev/usehooks";
import { SetStateAction, useEffect, useState } from "react";

type SearchInputProps = {
  searchField: SearchFilters;
  searchValue: string;
  setSearchValue: React.Dispatch<SetStateAction<string>>;
};

export const SearchInput = ({
  searchField,
  searchValue,
  setSearchValue,
}: SearchInputProps) => {
  const debouncedSearchTerm = useDebounce(searchValue, 1000);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Fetch suggestions on debounced search term
  useEffect(() => {
    const searchSuggestions = async () => {
      setIsSearching(true);
      if (debouncedSearchTerm.trim() === "") {
        setSuggestions([]);
        setIsSearching(false);
        return;
      }

      const res = await publicService.searchSuggestions({
        field: searchField,
        value: debouncedSearchTerm.trim(),
      });

      setSuggestions(res || []);
      setIsSearching(false);
    };

    searchSuggestions();
  }, [debouncedSearchTerm]);

  return (
    <div className="relative w-full flex flex-col">
      <input
        type="search"
        placeholder="Type a breed, name, or city to start your search"
        aria-label="Search"
        className="h-12 w-full border border-gray-300 bg-white px-4 focus:outline-none focus:ring-2 focus:ring-red-500"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          setDropdownVisible(true); 
        }}
      />

      {dropdownVisible && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 shadow-md z-10 max-h-60 overflow-y-auto">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => {
                setSearchValue(s);
                setDropdownVisible(false); 
              }}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {s}
            </li>
          ))}
        </ul>
      )}

    </div>
  );
};
