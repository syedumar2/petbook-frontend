import { AddPetRequest } from "@/types/petListing";
import { useState } from "react";
import { AddPetListingForm } from "./AddPetListingForm";
import { UploadImages } from "./UploadImages";
import { useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const AddPetListingBox = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<AddPetRequest>({
    name: "",
    type: "",
    breed: "",
    description: "",
    location: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    type?: string;
    breed?: string;
    description?: string;
    location?: string;
    files?: string;
  }>({});

  const [images, setImages] = useState<File[]>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const validateForm = (
    formData: AddPetRequest,
    images: File[] | undefined
  ) => {
    const newErrors: typeof errors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.type) newErrors.type = "Type is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.breed) newErrors.breed = "Breed is required";
    if (!images || images.length < 3) {
      newErrors.files = `Please upload at least 3 images`;
    }

    return newErrors;
  };

  const isFormValid =
    !errors.name &&
    !errors.breed &&
    !errors.description &&
    !errors.location &&
    !errors.description &&
    !errors.files &&
    !errors.type;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validateForm(formData, images);
    setErrors(newErrors);

    const formIsValid = Object.keys(newErrors).length === 0;
    console.log("Form is valid:", formIsValid);

    if (!formIsValid) return;

    try {

      setLoading(true);
      const res = await authService.addPet(formData, images ?? []);
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ["pets"],
        });
        navigate("/profile/pets");
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Check your connection");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-10">
      {/* Loading Modal */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent mb-4"></div>
            <p className="text-lg font-medium">Submitting your pet...</p>
          </div>
        </div>
      )}

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
