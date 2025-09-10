import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
type ImageCarouselProps = {
  images: string[];
  className?: string;
};

export const ImageCarousel = ({ images, className }: ImageCarouselProps) => {
  const [currentImage, setCurrentImage] = useState<string>();
  return (
    <div className={className}>
      <Carousel className="relative">
        <CarouselContent className={undefined}>
          {images.map((img, index) => (
            <CarouselItem key={index} className="basis-full">
              <div className="flex justify-center">
                <Dialog>
                  <DialogTrigger>
                    <img
                      src={img}
                      alt={`Slide ${index}`}
                      className="object-cover rounded-2xl shadow-md w-full h-64 sm:h-80"
                      onClick={() => setCurrentImage(img)}
                    />
                  </DialogTrigger>
                  <DialogTitle className="hidden"></DialogTitle>
                  <DialogContent className="flex justify-center items-center bg-gray-950/40">
                    <img src={currentImage} />
                  </DialogContent>
                </Dialog>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow p-2" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow p-2" />
      </Carousel>
    </div>
  );
};
