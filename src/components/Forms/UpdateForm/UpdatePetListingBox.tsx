import { useFetchUserPetById } from "@/hooks/useFetchUserPetById";
import { UpdatePetRequest } from "@/types/petListing";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useQueryClient } from "@tanstack/react-query";
import { usePet } from "@/hooks/usePet";
import { LoadingOverlay } from "@/components/Overlays/LoadingOverlay";
import { UpdatePetImage, UpdatePetListingForm } from "@/components";

export const UpdatePetListingBox = () => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch current pet data
  const { data, isError, isPending } = useFetchUserPetById(Number(petId));

  // Form state
  const [formData, setFormData] = useState<UpdatePetRequest>({
    name: data.data?.name ?? "",
    type: data.data?.type ?? "",
    breed: data.data?.breed ?? "",
    description: data.data?.description ?? "",
    location: data.data?.location ?? "",
    adopted: data.data?.adopted ?? false,
  });

  const [images, setImages] = useState<File[]>(); // New images uploaded
  const [errors, setErrors] = useState<{
    name?: string;
    type?: string;
    breed?: string;
    description?: string;
    location?: string;
    files?: string;
    adopted?: string;
  }>({});
  const { loading, submitPet } = usePet({ mode: "update" });

  // Extract current pet image URLs from backend data
  const currentPetImageUrls: string[] = [];
  if (data.data?.imageUrls) {
    for (const url of data.data.imageUrls) {
      for (const key of Object.keys(url)) {
        currentPetImageUrls.push(key);
      }
    }
  }
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = await submitPet(formData, images, Number(petId));
    if (errors) {
      setErrors(errors);
    }
  };

  // If data is not available
  if (!data || data === null) {
    return <p className="text-center mt-10">Pet not found!</p>;
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-10">
      {/* Loading Modal */}
      {loading && <LoadingOverlay message="Updating Pet Details..." />}

      <form
        className="w-full max-w-5xl flex flex-col lg:flex-row border-2 rounded-2xl border-red-600 shadow-lg overflow-hidden p-4"
        onSubmit={handleSubmit}
      >
        {/* Image Section */}
        <div className="w-1/2">
          <UpdatePetImage
            images={images}
            errors={errors}
            setImages={setImages}
            currentPetImageUrls={currentPetImageUrls}
          />
        </div>

        {/* Metadata Section */}
        <div className="w-1/2">
          <h3 className="text-2xl text-center mb-4 py-6">
            Update Existing Pet Listing
          </h3>
          <UpdatePetListingForm
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
