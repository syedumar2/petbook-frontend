import { FormErrors } from '@/components/Forms/AddForm/AddPetListingBox';
import { authService } from '@/services/authService';
import { AddPetRequest, PetGender, UpdatePetRequest } from '@/types/petListing';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';


interface UsePetOptions {
    mode: "add" | "update" | "delete" | "adoption";
}


const isAddRequest = (data: any): data is AddPetRequest => {
    if (!data) return false;

    const hasRequired =
        typeof data.name === "string" &&
        typeof data.type === "string" &&
        typeof data.location === "string";

    if (!hasRequired) return false;

    const hasOptional =
        (data.description === undefined || typeof data.description === "string") &&
        (data.breed === undefined || typeof data.breed === "string") &&
        (data.gender === undefined || Object.values(PetGender).includes(data.gender));

    return hasOptional;
};
const isUpdateRequest = (data: any): data is UpdatePetRequest => {
    if (!data || typeof data !== "object") return false;

    return (
        (data.name === undefined || typeof data.name === "string") &&
        (data.type === undefined || typeof data.type === "string") &&
        (data.breed === undefined || typeof data.breed === "string") &&
        (data.gender === undefined || Object.values(PetGender).includes(data.gender)) &&
        (data.description === undefined || typeof data.description === "string") &&
        (data.location === undefined || typeof data.location === "string") &&
        (data.adopted === undefined || typeof data.adopted === "boolean")
    );
};
const isBoolean = (val: unknown): val is boolean => {
    return typeof val === "boolean";
}



export const usePet = (options?: UsePetOptions) => {
    const [loading, setLoading] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const validateAddForm = (
        formData: AddPetRequest,
        images: File[] | undefined
    ) => {
        const errors: FormErrors = {};

        if (!formData.name) errors.name = "Name is required";
        if (!formData.type) errors.type = "Type is required";
        if (!formData.location) errors.location = "Location is required";
        if (!formData.description)
            errors.description = "Description is required";
        if (formData.gender === PetGender.None)
            errors.gender = "Pet Gender is required";
        if (!formData.breed) errors.breed = "Breed is required";
        if (!images || images.length < 3) {
            errors.files = `Please upload at least 3 images`;
        }

        return errors;
    };

    const validateUpdateForm = (
        formData: UpdatePetRequest,
        images: File[] | undefined
    ) => {
        const newErrors: FormErrors = {};

        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.type) newErrors.type = "Type is required";
        if (!formData.location) newErrors.location = "Location is required";
        if (!formData.description)
            newErrors.description = "Description is required";
        if (!formData.breed) newErrors.breed = "Breed is required";
        if (images && images.length < 3)
            newErrors.files = "Please upload at least 3 images";
        if (formData.adopted === null) newErrors.adopted = "Mark your Pet as adopted or not"
        if (formData.gender === PetGender.None) newErrors.gender = "Please specify Pet Gender"
        return newErrors;

    };





    const submitPet = async (
        formData: AddPetRequest | UpdatePetRequest,
        images?: File[],
        petId?: number,
        adopted?: boolean,
    ): Promise<FormErrors | void> => {
        try {
            setLoading(true);
            let res;
            let errors: FormErrors = {};

            if (options?.mode === "add") {
                if (isAddRequest(formData)) {
                    errors = validateAddForm(formData, images);
                    if (Object.keys(errors).length > 0) return errors;
                    res = await authService.addPet(formData, images ?? []);
                }
            }

            else if (options?.mode === "update") {
                if (isUpdateRequest(formData) && petId) {
                    errors = validateUpdateForm(formData, images);
                    if (Object.keys(errors).length > 0) return errors;
                    res = await authService.updatePet(formData, petId, images);
                }
            }

            else if (options?.mode === "delete" && petId) {
                res = await authService.deletePet(petId);
            }
            else if (options?.mode === "adoption" && petId && isBoolean(adopted)) {
                res = await authService.markPetAdoptionStatus(petId, adopted);
                if (res.success) queryClient.invalidateQueries({ queryKey: ["pet", petId] });
            }

            if (!res) {
                toast.error("No option selected or invalid data");
                return;
            }

            if (res.success) {
                queryClient.invalidateQueries({ queryKey: ["userPets"], refetchType: "active" })

                navigate("/profile/pets");
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        } catch {
            toast.error("Something went wrong. Check your connection");
        } finally {
            setLoading(false);
        }
    };
    return { loading, submitPet }
}
