import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useRef, useState } from "react";
import { UserUpdateRequest } from "@/types/user";
import { toast } from "sonner";
import { FileCheck, Upload } from "lucide-react";

export const UpdateUserDialog = () => {
  const { user, updateUser, getUser } = useAuth();
  const [formData, setFormData] = useState<UserUpdateRequest>({
    firstname: user?.firstname ?? "",
    lastname: user?.lastname ?? "",
    email: user?.email ?? "",
    location: user?.location ?? "",
  });
  const [errors, setErrors] = useState<{
    firstname?: string;
    lastname?: string;
    email?: string;
    location?: string;
  }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };
  const FNAME_REGEX = /^[A-Za-z][A-Za-z'-]{1,}$/;
  const LNAME_REGEX = /^[A-Za-z][A-Za-z'-]{1,}$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/;
  const LOCATION_REGEX = /^([A-Za-z]+( [A-Za-z]+)+),.*([A-Za-z]+( [A-Za-z]+)+)/;
  //TODO (LOW): Centralise the regex

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: EMAIL_REGEX.test(value) ? "" : "Enter a valid email",
      }));
    } else if (name == "firstname") {
      setErrors((prev) => ({
        ...prev,
        firstname: FNAME_REGEX.test(value) ? "" : "Enter a Valid First Name",
      }));
    } else if (name == "lastname") {
      setErrors((prev) => ({
        ...prev,
        lastname: LNAME_REGEX.test(value) ? "" : "Enter a Valid Last Name",
      }));
    } else if (name == "location") {
      setErrors((prev) => ({
        ...prev,
        location: LOCATION_REGEX.test(value) ? "" : "Enter a Valid Location",
      }));
    }
  };

  const isFormValid =
    !errors.email &&
    !errors.firstname &&
    !errors.lastname &&
    !errors.location;

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    try {
      setLoading(true);
      const res = await updateUser(formData, file ?? undefined);
      if (res.success) {
        toast.success(res.message);
        getUser();
         setOpen(false); 
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          className="bg-red-700 text-white rounded-full px-8 py-2 text-sm font-medium shadow hover:bg-red-800 active:scale-95"
          variant={undefined}
          size={undefined}
        >
          Update Profile
        </Button>
      </DialogTrigger>
    
        <DialogContent className="flex flex-col  bg-white ">
            <form onSubmit={onSubmitForm}>
          <DialogHeader>
            <DialogTitle className="mb-2">Edit Profile</DialogTitle>
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-1">
                <div className="flex flex-col">
                  <Avatar className={"size-24 p-3"}>
                    <AvatarImage
                      src={
                        file
                          ? URL.createObjectURL(file)
                          : user?.profileImageUrl
                      }
                      className="rounded-full"
                    />
                    <AvatarFallback className="bg-cyan-700 p-2 text-2xl text-white">
                      {user?.firstname.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <label className="block text-sm font-medium my-1">
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      ref={inputRef}
                      className="hidden"
                      onChange={(e) => {
                        const selected = e.target.files?.[0];
                        if (selected && selected.type.startsWith("image/")) {
                          setFile(selected);
                        } else {
                          alert("Please upload an image file only.");
                        }
                      }}
                    />
                    <Button
                      onClick={handleClick}
                        type="button" 
                      className=" text-white rounded-full px-8  text-sm font-medium shadow hover:bg-gray-200 active:scale-95" variant={undefined} size={undefined}                    >
                      {file ? (
                        <FileCheck className="text-gray-600" />
                      ) : (
                        <Upload className=" text-gray-600" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col mb-6 gap-1 w-full">
                <label className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData?.firstname}
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                  onChange={handleChange}
                  name="firstname"
                />
                {errors.firstname && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.firstname}
                  </p>
                )}
                <label className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData?.lastname}
                  className="w-full border rounded px-3 py-2 bg-gray-100"
                  onChange={handleChange}
                  name="lastname"
                />
                {errors.lastname && (
                  <p className="text-xs text-red-500 mt-1">{errors.lastname}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={formData?.email}
                className="w-full border rounded px-3 py-2 bg-gray-100   "
                onChange={handleChange}
                name="email"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>{" "}
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                value={formData?.location}
                className="w-full border rounded px-3 py-2 bg-gray-100   "
                onChange={handleChange}
                name="location"
              />
              {errors.location && (
                <p className="text-xs text-red-500 mt-2">{errors.location}</p>
              )}
            </div>{" "}
            <div className="flex justify-end mt-2"></div>
          </DialogHeader>
       <div className="flex justify-end gap-3">
         
              <DialogClose asChild>
                <Button variant="outline" className={undefined} size={undefined}
                onClick={()=>setFile(null)}>
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-red-700 text-white  hover:bg-red-800 active:scale-95"
                variant={undefined}
                size={undefined}
              >
                Save changes
              </Button>
       </div>
          </form>
        </DialogContent>

    </Dialog>
  );
};
