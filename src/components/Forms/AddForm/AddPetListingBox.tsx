import { AddPetRequest, PetGender } from "@/types/petListing";
import { useState } from "react";
import { AddPetListingForm } from "./AddPetListingForm";

import { usePet } from "@/hooks/usePet";
import { LoadingOverlay } from "../../Overlays/LoadingOverlay";
import { UploadImages } from "./UploadImages";

export type FormErrors = {
  name?: string;
  type?: string;
  breed?: string;
  description?: string;
  location?: string;
  files?: string;
  adopted?:string;
  gender?:string;
};

export const AddPetListingBox = () => {
  const [formData, setFormData] = useState<AddPetRequest>({
    name: "",
    type: "",
    breed: "",
    description: "",
    location: "",
    gender: PetGender.None
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const [images, setImages] = useState<File[]>();
  const { submitPet, loading } = usePet({ mode: "add" });

  const isFormValid =
    !errors.name &&
    !errors.breed &&
    !errors.description &&
    !errors.location &&
    !errors.description &&
    !errors.files &&
    !errors.type &&
    !errors.gender;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = await submitPet(formData, images);
    if (formErrors) {
      setErrors(formErrors);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-10">
      {/* Loading Modal */}
      {loading && <LoadingOverlay message="Submitting your Listing.." />}

      <form
        className="w-full max-w-5xl flex flex-col lg:flex-row border-2 rounded-2xl border-red-600 shadow-lg overflow-hidden p-4"
        onSubmit={handleSubmit}
      >
        <div className="w-1/2 ">
          <UploadImages images={images} setImages={setImages} errors={errors} />
        </div>
        <div className="w-1/2">
          <h3 className="text-2xl text-center mb-4 py-6 ">
            Add New Pet Listing
          </h3>

          <AddPetListingForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            loading={loading}
          />
        </div>
      </form>
    </section>
  );
};
