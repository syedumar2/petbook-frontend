import { Button } from "../ui/button";
import {
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { authService } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

type EndConversationDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  conversationId: number;
};

export const EndConversationDialog = ({
  setOpen,
  open,
  conversationId,
}: EndConversationDialogProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await authService.deleteConversation(conversationId);
    if (res.success) {
      toast.success(res.message);
      setOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["conversation"],
        refetchType: "active",
      });
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <DialogTrigger
        className="text-red-700 font-medium cursor-pointer hover:bg-red-50 text-sm w-full flex px-2 py-2 "
        onClick={() => setOpen(true)}
        onSelect={(e: Event) => e.preventDefault()}
      >
        End Conversation
      </DialogTrigger>
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
            {loading ? "Deleting..." : "Delete Conversation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};
