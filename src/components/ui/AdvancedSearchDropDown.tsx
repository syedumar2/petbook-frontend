import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FindPetByExampleRequest, ListingMode } from "@/types/petListing";
import { SetStateAction, useState } from "react";

type AdvancedSearchDropdownProps = {
  advancedSearchBody: FindPetByExampleRequest;
  setAdvancedSearchBody: React.Dispatch<
    React.SetStateAction<FindPetByExampleRequest>
  >;
  mode: ListingMode;
  setMode: React.Dispatch<SetStateAction<ListingMode>>;
};

export default function AdvancedSearchDropdown({
  mode,
  setMode,
  advancedSearchBody,
  setAdvancedSearchBody,
}: AdvancedSearchDropdownProps) {
  const [formData, setFormData] = useState<FindPetByExampleRequest>({
    name: "",
    breed: "",
    type: "",
    location: "",
    adopted: false,
    ownerEmail: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const filteredBody = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value !== "")
    ) as FindPetByExampleRequest;
    setMode("advancedSearch");
    setAdvancedSearchBody(filteredBody);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="ml-4 inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white bg-red-700 rounded-lg shadow-md hover:bg-red-800 transition"
          variant={undefined}
          size={undefined}
        >
          Advanced ▼
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 p-4 space-y-3 bg-white">
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Name Input */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Name</label>
            <Input
              placeholder="Enter pet name"
              className={undefined}
              type="text"
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData((prev) => ({ ...prev, name: e.target.value }));
              }}
            />
          </div>

          {/* Type Select */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Type</label>
            <Select
              value={formData.type}
              onValueChange={(value: string) => {
                setFormData((prev) => ({ ...prev, type: value }));
              }}
            >
              <SelectTrigger className={undefined}>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Dog" className={undefined}>
                  Dog
                </SelectItem>
                <SelectItem value="Cat" className={undefined}>
                  Cat
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Breed Input */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Breed</label>
            <Input
              placeholder="Enter breed"
              className={undefined}
              type="text"
              value={formData.breed}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData((prev) => ({ ...prev, breed: e.target.value }));
              }}
            />
          </div>

          {/* Location Input */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Location</label>
            <Input
              placeholder="Enter location"
              className={undefined}
              type="text"
              value={formData.location}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData((prev) => ({ ...prev, location: e.target.value }));
              }}
            />
          </div>

          {/* Owner Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Owner Email</label>
            <Input
              placeholder="Enter email"
              className={undefined}
              type="email"
              value={formData.ownerEmail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormData((prev) => ({
                  ...prev,
                  ownerEmail: e.target.value,
                }));
              }}
            />
          </div>

          {/* Adopted Select */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Adopted</label>
            <Select
              value={String(formData.adopted)}
              onValueChange={(value: string) => {
                setFormData((prev) => ({ ...prev, adopted: value === "true" }));
              }}
            >
              <SelectTrigger className={undefined}>
                <SelectValue placeholder="Select adopted status" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="true" className={undefined}>
                  Yes
                </SelectItem>
                <SelectItem value="false" className={undefined}>
                  No
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <Button
            className=" items-center justify-center h-12 px-6 w-full font-medium tracking-wide text-white bg-red-700 rounded-lg"
            variant={undefined}
            size={undefined}
            type="submit"
          >
            Search
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
