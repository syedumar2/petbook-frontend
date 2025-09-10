import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { PetFilters, SortDirection } from "@/types/petListing";
import { Dispatch, SetStateAction } from "react";

type SortDropdownProps = {
  sortDirection: SortDirection;
  setSortDirection: Dispatch<SetStateAction<SortDirection>>;
  sortField: keyof PetFilters;
  setSortField: Dispatch<SetStateAction<keyof PetFilters>>;
};

export default function SortDropdown({
  sortDirection,
  sortField,
  setSortDirection,
  setSortField,
}: SortDropdownProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <p className="font-medium text-sm text-center">Sort By:</p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className={"border"} variant={undefined} size="sm">
            {String(sortField).charAt(0).toUpperCase() +
              String(sortField).slice(1)}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-white">
          <DropdownMenuItem
            className="flex justify-between items-center"
            inset={undefined}
            onClick={() => setSortField("name")}
          >
            <span>Name</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex justify-between items-center"
            inset={undefined}
            onClick={() => setSortField("breed")}
          >
            <span>Breed</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex justify-between items-center"
            inset={undefined}
            onClick={() => setSortField("type")}
          >
            <span>Type</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex justify-between items-center"
            inset={undefined}
            onClick={() => setSortField("location")}
          >
            <span>Location</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex justify-between items-center"
            inset={undefined}
            onClick={() => setSortField("location")}
          >
            <span>Adopted</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex justify-between items-center"
            inset={undefined}
            onClick={() => setSortField("gender")}
          >
            <span>Gender</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        className="border p-1 transition-transform duration-300 ease-in-out"
        onClick={() =>
          setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        }
        variant={undefined}
        size="sm"
      >
        <ChevronUp
          size={18}
          className={`transform transition-transform duration-300 ${
            sortDirection === "asc" ? "rotate-0" : "rotate-180"
          }`}
        />
      </Button>
    </div>
  );
}
