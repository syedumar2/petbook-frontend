import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function SortDropdown() {
  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Sort By</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="bg-white">
          <DropdownMenuItem className="flex justify-between items-center">
            <span>Name</span>
            <ChevronDown size={18} />
          </DropdownMenuItem>

          <DropdownMenuItem className="flex justify-between items-center">
            <span>Breed</span>
            <ChevronDown size={18} />
          </DropdownMenuItem>

          <DropdownMenuItem className="flex justify-between items-center">
            <span>Type</span>
            <ChevronDown size={18} />
          </DropdownMenuItem>

          <DropdownMenuItem className="flex justify-between items-center">
            <span>Location</span>
            <ChevronDown size={18} />
          </DropdownMenuItem>
             <DropdownMenuItem className="flex justify-between items-center">
            <span>Adopted</span>
            <ChevronDown size={18} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
