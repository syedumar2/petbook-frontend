import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const AddPetListingForm = () => {
  return (
    <div className="space-y-4 px-8 pt-6 pb-8 mb-4 ">
      <div>
        <Label htmlFor="name">Pet Name:</Label>
        <Input type="text" name="name" className="mt-2" />
      </div>
      <div>
        <Label htmlFor="type">Type: </Label>
        <Select>
          <SelectTrigger className="w-[180px] mt-2">
            <SelectValue placeholder="Pet Type" />
          </SelectTrigger>
          <SelectContent className={"bg-white"} >
            <SelectItem value="Cat" className={undefined}>
              Cat
            </SelectItem>
            <SelectItem value="Dog" className={undefined}>
              Dog
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="breed">Pet Breed:</Label>
        <Input type="text" name="breed" className="mt-2" />
      </div>
      <div>
        <Label htmlFor="description">Description:</Label>
        <Textarea type="text" name="description" className="mt-2" />
      </div>
      <div>
        <Label htmlFor="location">Location:</Label>
        <Input type="text" name="location" className="mt-2" />
      </div>
      <div className="mb-6 mt-6 text-center">
        <button
          className="w-full px-4 py-2 font-medium tracking-wide text-white bg-red-700 rounded-full hover:bg-red-800 focus:outline-none focus:shadow-outline"
          disabled
        >
          Add Pet
        </button>
      </div>
    </div>
  );
};
//TODO Plug the petListing form to rest api