import { useState } from "react";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { usePet } from "@/hooks/usePet";

type DeleteDialogBoxProps = {
  petId: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteDialogBox = ({ petId, open, setOpen }: DeleteDialogBoxProps) => {
  const { loading, submitPet } = usePet({ mode: "delete" });

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await submitPet({}, undefined, petId);
    setOpen(false);
  };

  return (
    <>
      <DialogTrigger onClick={() => setOpen(true)}>Delete Post</DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader className={undefined}>
          <DialogTitle className={undefined}>
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className={undefined}>
            This action cannot be undone. Are you sure you want to permanently
            delete this post from our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className={undefined}>
          <Button
            type="button"
            className=" px-4 py-2 font-medium tracking-wide text-white bg-red-700 rounded-full hover:bg-red-800 focus:outline-none focus:shadow-outline"
            variant={undefined}
            size={undefined}
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete Pet"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default DeleteDialogBox;
