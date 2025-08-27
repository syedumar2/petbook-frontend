import { useRef, useState } from "react";

import { CircleX, Cross } from "lucide-react";
import { ImageCarousel } from "@/components/ImageCarousel/ImageCarousel";
import { Button } from "@/components/ui/button";

type UpdatePetImageProps = {
  images: File[] | undefined;
  setImages: React.Dispatch<React.SetStateAction<File[] | undefined>>;
  errors: {
    name?: string;
    type?: string;
    breed?: string;
    description?: string;
    location?: string;
    files?: string;
  };
  currentPetImageUrls: string[];
};
const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const UpdatePetImage = ({
  images,
  setImages,
  errors,
  currentPetImageUrls,
}: UpdatePetImageProps) => {
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const urls = files.map((file) => URL.createObjectURL(file));
      setImages(files);
      setImageURLs(urls);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev?.filter((_, i) => i !== index));
    setImageURLs((prev) => {
      const url = prev[index];
      if (url) URL.revokeObjectURL(url);
      return prev.filter((_, i) => i !== index);
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4 flex flex-col items-center">
      <div>
        <h3 className="text-lg text-center py-6  ">
          Upload your Pets Images here
        </h3>
        <p>
          <span className="text-gray-600 w-full text-center mx-21">
            Image should be in JPG, JPEG, or PNG format.
          </span>
        </p>

        <ImageCarousel
          images={
            images?.length === 0 || !images
              ? currentPetImageUrls.length === 0 || !currentPetImageUrls
                ? [
                    "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-image-512.png",
                  ]
                : currentPetImageUrls
              : imageURLs
          }
          className="w-full my-8 "
        />
        <div className="flex gap-2 mt-4">
          {imageURLs.map((url, index) => (
            <div key={index} className="relative">
              <img src={url} alt="thumbnail" className="h-20 w-20 rounded" />
              <Button
                type="button"
                className="absolute top-0 right-0 bg-red-700 text-white rounded-full p-1"
                onClick={() => handleRemoveImage(index)}
                size={"xs"}
                variant={undefined}
              >
                <CircleX />
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center flex-col">
        <input
          type="file"
          multiple
          accept="image/*"
          className="block w-full text-sm text-gray-500 
          file:mr-4 file:py-2 file:px-4 
          file:rounded-full file:border-0 
          file:text-sm file:font-semibold 
          file:bg-red-50 file:text-red-700 
          hover:file:bg-red-100"
          onChange={handleFileChange}
        />
        <p className="text-xs text-red-500 mt-2">
          Warning: Uploading new images will replace all your existing images.
        </p>

        {errors.files && (
          <p className="text-xs text-red-500 mt-2">{errors.files}</p>
        )}
      </div>
    </div>
  );
};
