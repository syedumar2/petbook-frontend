import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ImageCarousel } from "../ImageCarousel/ImageCarousel";

export const UploadImages = () => {
  return (
    <div className="space-y-4 flex flex-col items-center">
      <div>
        <h3 className="text-lg text-center mb-4 py-6 ">
          Upload your Pets Images here
        </h3>
        <p>
          <span className="text-gray-600">
            Image should be in JPG, JPEG, or PNG format.
          </span>
        </p>

        <ImageCarousel
          images={[
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png",
          ]}
          className="w-full my-8 "
        />
      </div>
      <div>
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
        />
      </div>
    </div>
  );
};
