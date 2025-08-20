
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AdvancedSearchDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
          <Button className="ml-4 inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white bg-red-700 rounded-lg shadow-md hover:bg-red-800 transition">Advanced ▼</Button>

      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 p-4 space-y-3 bg-white">
        {/* Name Input */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Name</label>
          <Input placeholder="Enter pet name" />
        </div>

        {/* Type Select */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Type</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent  className="bg-white">
              <SelectItem value="dog">Dog</SelectItem>
              <SelectItem value="cat">Cat</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Breed Input */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Breed</label>
          <Input placeholder="Enter breed" />
        </div>

        {/* Location Input */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Location</label>
          <Input placeholder="Enter location" />
        </div>

        {/* Search Button */}
        <Button className=" items-center justify-center h-12 px-6 w-full font-medium tracking-wide text-white bg-red-700 rounded-lg">Search</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


  
