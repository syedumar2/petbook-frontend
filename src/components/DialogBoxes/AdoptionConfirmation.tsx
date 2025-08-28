import { usePet } from "@/hooks/usePet";
import { Button } from "../ui/button";
import {
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";

type AdoptionConfirmationBoxProps = {
  petId: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  adoptionStatus: boolean | undefined;
};
export const AdoptionConfirmation = ({
  petId,
  open,
  setOpen,
  adoptionStatus,
}: AdoptionConfirmationBoxProps) => {
  const { loading, submitPet } = usePet({ mode: "adoption" });

  const handleAdoptionToggle = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!adoptionStatus) await submitPet({}, undefined, petId, true);
    else await submitPet({}, undefined, petId, false);
    setOpen(false);
  };

  return (
    <>
      <DialogTrigger onClick={() => setOpen(true)}>
        {adoptionStatus ? "Mark as Not Adopted" : "Mark as Adopted"}
      </DialogTrigger>

      <DialogContent className="bg-white">
        <DialogHeader className={undefined}>
          <DialogTitle className={undefined}>
            {adoptionStatus
              ? "Mark pet as Not Adopted?"
              : "Mark pet as Adopted?"}
          </DialogTitle>
          <DialogDescription className={undefined}>
            {adoptionStatus
              ? "This will revert the pet’s status back to available for adoption."
              : "This will mark the pet as adopted and remove it from active listings."}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className={undefined}>
          <Button
            type="button"
            className={`px-4 py-2 font-medium tracking-wide text-white rounded-full 
          ${
            adoptionStatus
              ? "bg-yellow-600 hover:bg-yellow-700"
              : "bg-green-800 hover:bg-green-700"
          }
        `}
            onClick={handleAdoptionToggle}
            disabled={loading}
            variant={undefined}
            size={undefined}
          >
            {loading
              ? "Updating..."
              : adoptionStatus
              ? "Mark as Not Adopted"
              : "Mark as Adopted"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};
