import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";
const pets = [
  {
    petId: 1,
    name: "Buddy",
    type: "Dog",
    breed: "Labrador",
    location: "Bidar",
    adopted: true,
    owner: "John Doe",
    description: "Buddy is a friendly and playful Labrador who loves being around people and other pets.",
    imageUrl: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg",
  },
  {
    petId: 2,
    name: "Mittens",
    type: "Cat",
    breed: "Siamese",
    location: "Mumbai",
    adopted: false,
    owner: "N/A",
    description: "Mittens is a curious Siamese cat who enjoys sunbathing and playing with toys.",
    imageUrl: "https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg",
  },
  {
    petId: 3,
    name: "Max",
    type: "Dog",
    breed: "Beagle",
    location: "Delhi",
    adopted: false,
    owner: "N/A",
    description: "Max loves going for walks and has a playful and loving personality.",
    imageUrl: "https://cdn.pixabay.com/photo/2016/02/19/11/19/beagle-1209282_1280.jpg",
  },
  {
    petId: 4,
    name: "Luna",
    type: "Cat",
    breed: "Persian",
    location: "Bangalore",
    adopted: true,
    owner: "Sara K.",
    description: "Luna is a calm Persian cat who enjoys cuddles and quiet naps.",
    imageUrl: "https://cdn.pixabay.com/photo/2017/09/25/13/12/cat-2785383_1280.jpg",
  },
  {
    petId: 5,
    name: "Charlie",
    type: "Dog",
    breed: "Golden Retriever",
    location: "Pune",
    adopted: false,
    owner: "N/A",
    description: "Charlie is energetic and loves to play fetch and socialize with other dogs.",
    imageUrl: "https://cdn.pixabay.com/photo/2016/02/19/11/19/golden-retriever-1209249_1280.jpg",
  },
  {
    petId: 6,
    name: "Cleo",
    type: "Cat",
    breed: "Maine Coon",
    location: "Chennai",
    adopted: true,
    owner: "Alex P.",
    description: "Cleo is a gentle Maine Coon who loves being petted and exploring her surroundings.",
    imageUrl: "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg",
  },
];


const GeneralPetListing = () => {
  return (
    <section>
         <h3 className="ml-6 my-2 text-xl font-semibold">Showing results for: </h3>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 px-4 pb-12">
        
          {pets.map((pet, index) => (
            <Link key={pet.petId} to={`/pets/${pet.petId}`}>
              <Card key={index} className="border border-gray-500 rounded-2xl shadow hover:shadow-lg transition overflow-hidden w-[380px] h-[380px] pt-4">
                {/* Image */}
                <CardContent className="px-4 py-0">
                  <img
                    src={pet.imageUrl}
                    alt={pet.name}
                    className="w-full h-48 object-cover mb-2"
                  />
                  {/* Card Info */}
                  <div className="ml-1">
                    <CardHeader className="p-0">
                      <CardTitle className="text-xl font-semibold text-gray-800">
                        {pet.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600 text-sm">
                        {pet.type} - {pet.breed}
                      </CardDescription>
                    </CardHeader>
                    <p className="text-gray-500 text-sm mt-1">Location: {pet.location}</p>
                    {pet.adopted && (
                      <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">
                        Adopted
                      </span>
                    )}

                    <p className="text-gray-500 text-sm mt-2">Owner: {pet.owner}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>


        <div className="flex justify-center items-center gap-3 my-6">
      {/* Previous button */}
      <Button className="hover:cursor-pointer" disabled>
        Previous
      </Button>

      {/* Page numbers */}
      <div className="flex gap-2 ">
        <Button className="hover:cursor-pointer bg-red-600 text-white">1</Button>
        <Button className="hover:cursor-pointer bg-red-600 text-white">2</Button>
        <Button className="hover:cursor-pointer bg-red-600 text-white">3</Button>
        <span className="px-2 py-1 text-gray-500">...</span>
        <Button className="hover:cursor-pointer bg-gray-200 text-gray-700">10</Button>
      </div>

      {/* Next button */}
      <Button className="hover:cursor-pointer">Next</Button>
    </div>
    </section>
  );
};


export default GeneralPetListing;
