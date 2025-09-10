import { Input } from "../../ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddPetRequest, PetGender } from "@/types/petListing";

const PET_NAME_REGEX = /^[A-Za-z]+( [A-Za-z]+)?$/;
const PET_BREED = /^[A-Za-z]+( [A-Za-z]+)?$/;
const LOCATION_REGEX =
  /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*,\s*[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/;

type PetListingFormProps = {
  formData: AddPetRequest;
  setFormData: React.Dispatch<React.SetStateAction<AddPetRequest>>;
  errors: {
    name?: string;
    type?: string;
    breed?: string;
    description?: string;
    location?: string;
    gender?: string;
  };
  setErrors: React.Dispatch<
    React.SetStateAction<{
      name?: string;
      type?: string;
      breed?: string;
      description?: string;
      location?: string;
      gender?: string;
    }>
  >;
  loading: boolean;
};

export const AddPetListingForm = ({
  formData,
  setFormData,
  errors,
  setErrors,
  loading,
}: PetListingFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "name") {
      setErrors((prev) => ({
        ...prev,
        name: PET_NAME_REGEX.test(value) ? "" : "Enter a valid Pet name",
      }));
    } else if (name === "breed") {
      setErrors((prev) => ({
        ...prev,
        breed: PET_BREED.test(value) ? "" : "Enter a valid Pet Breed",
      }));
    } else if (name === "location") {
      setErrors((prev) => ({
        ...prev,
        location: LOCATION_REGEX.test(value) ? "" : "Enter a valid Location",
      }));
    }
  };

  return (
    <div className="space-y-4 px-8 pt-6 pb-8 mb-4 ">
      <div>
        <Label htmlFor="name" className={undefined}>
          Pet Name:
        </Label>
        <Input
          name="name"
          className="mt-2"
          type="text"
          placeholder="John"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.name && (
          <p className="text-xs text-red-500 mt-2">{errors.name}</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="type" className={undefined}>
          Type:{" "}
        </Label>
        <Select
          onValueChange={(value: string) =>
            setFormData({ ...formData, type: value })
          }
        >
          <SelectTrigger className="w-[160px] mt-2" disabled={loading}>
            <SelectValue placeholder="Pet Type" />
          </SelectTrigger>
          <SelectContent className={"bg-white"}>
            <SelectItem value="Cat" className={undefined}>
              Cat
            </SelectItem>
            <SelectItem value="Dog" className={undefined}>
              Dog
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.type && (
          <p className="text-xs text-red-500 mt-2">{errors.type}</p>
        )}

        <Label htmlFor="gender" className={undefined}>
          Gender:{" "}
        </Label>
        <Select
          onValueChange={(value: PetGender) =>
            setFormData({ ...formData, gender: value })
          }
        >
          <SelectTrigger className="w-[160px] mt-2" disabled={loading}>
            <SelectValue placeholder="Pet Gender" />
          </SelectTrigger>
          <SelectContent className={"bg-white"}>
            <SelectItem value={PetGender.Male} className={undefined}>
              Male
            </SelectItem>
            <SelectItem value={PetGender.Female} className={undefined}>
              Female
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.gender && (
          <p className="text-xs text-red-500 mt-2">{errors.gender}</p>
        )}
      </div>
      <div>
        <Label htmlFor="breed" className={undefined}>
          Pet Breed:
        </Label>
        <Input
          type="text"
          name="breed"
          className="mt-2"
          placeholder="German Shepherd"
          value={formData.breed}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.breed && (
          <p className="text-xs text-red-500 mt-2">{errors.breed}</p>
        )}
      </div>
      <div>
        <Label htmlFor="description" className={undefined}>
          Description:
        </Label>
        <Textarea
          type="text"
          name="description"
          className="mt-2"
          placeholder="Describe your pet’s personality, behavior, and health details (e.g., vaccinations, neutered/spayed, special needs)."
          value={formData.description}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.description && (
          <p className="text-xs text-red-500 mt-2">{errors.description}</p>
        )}
      </div>
      <div>
        <Label htmlFor="location" className={undefined}>
          Location:
        </Label>
        <Input
          type="text"
          name="location"
          className="mt-2"
          placeholder="District, State"
          value={formData.location}
          onChange={handleChange}
          disabled={loading}
        />

        {errors.location && (
          <p className="text-xs text-red-500 mt-2">{errors.location}</p>
        )}
      </div>
      <div className="mb-6 mt-6 text-center">
        <button
          className="w-full px-4 py-2 font-medium tracking-wide text-white bg-red-700 rounded-full hover:bg-red-800 focus:outline-none focus:shadow-outline"
          disabled={loading}
          type="submit"
        >
          Add Pet
        </button>
      </div>
    </div>
  );
};
