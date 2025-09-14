import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SortDirection } from "@/types/petListing";
import { ChevronUp } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { UserSortFilters } from "../Admin/Users/UsersList";

type SortDropdownProps = {
  sortDirection: SortDirection;
  setSortDirection: Dispatch<SetStateAction<SortDirection>>;
  sortField: "blacklistedAt" | "role" | "firstname";
  setSortField: Dispatch<
    SetStateAction<"blacklistedAt" | "role" | "firstname">
  >;
};

export default function UserListSortDropDown({
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
            onClick={() => setSortField("firstname")}
          >
            <span>Name</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex justify-between items-center"
            inset={undefined}
            onClick={() => setSortField("role")}
          >
            <span>Role</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="flex justify-between items-center"
            inset={undefined}
            onClick={() => setSortField("blacklistedAt")}
          >
            <span>Blacklisted at</span>
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
