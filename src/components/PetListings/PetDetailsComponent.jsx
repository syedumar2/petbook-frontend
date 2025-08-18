import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    description:
      "Buddy is a friendly and playful Labrador who loves being around people and other pets.",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg",
  },
  {
    petId: 2,
    name: "Mittens",
    type: "Cat",
    breed: "Siamese",
    location: "Mumbai",
    adopted: false,
    owner: "N/A",
    description:
      "Mittens is a curious Siamese cat who enjoys sunbathing and playing with toys.",
    imageUrl:
      "https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg",
  },
  {
    petId: 3,
    name: "Max",
    type: "Dog",
    breed: "Beagle",
    location: "Delhi",
    adopted: false,
    owner: "N/A",
    description:
      "Max loves going for walks and has a playful and loving personality.",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/02/19/11/19/beagle-1209282_1280.jpg",
  },
  {
    petId: 4,
    name: "Luna",
    type: "Cat",
    breed: "Persian",
    location: "Bangalore",
    adopted: true,
    owner: "Sara K.",
    description:
      "Luna is a calm Persian cat who enjoys cuddles and quiet naps.",
    imageUrl:
      "https://cdn.pixabay.com/photo/2017/09/25/13/12/cat-2785383_1280.jpg",
  },
  {
    petId: 5,
    name: "Charlie",
    type: "Dog",
    breed: "Golden Retriever",
    location: "Pune",
    adopted: false,
    owner: "N/A",
    description:
      "Charlie is energetic and loves to play fetch and socialize with other dogs.",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/02/19/11/19/golden-retriever-1209249_1280.jpg",
  },
  {
    petId: 6,
    name: "Cleo",
    type: "Cat",
    breed: "Maine Coon",
    location: "Chennai",
    adopted: true,
    owner: "Alex P.",
    description:
      "Cleo is a gentle Maine Coon who loves being petted and exploring her surroundings.",
    imageUrl:
      "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg",
  },
];
const PetDetailsComponent = ({ petId }) => {
  const pet = pets.find((p) => p.petId === parseInt(petId));
  if (!pet) return <p className="text-center mt-10">Pet not found!</p>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 ">
      {/* Left Column: Pet Details */}
      <div>
        <div className="flex items-center justify-center">
          <img
            src={pet.imageUrl}
            alt={pet.name}
            className=" w-full h-96 object-cover rounded-2xl shadow-md"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="mt-4">
            <h1 className="text-3xl font-bold">{pet.name}</h1>
            <p className="text-gray-600">
              {pet.type} - {pet.breed}
            </p>
            <p className="text-gray-500 mt-1">Location: {pet.location}</p>
            {pet.adopted && (
              <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">
                Adopted
              </span>
            )}
            <p className="mt-4 text-gray-700">{pet.description}</p>
          </div>

          <Card className="border rounded-2xl shadow-md p-4 flex flex-col h-fit w-3/8 mt-6">
            <CardHeader className="p-0">
              <CardTitle className="text-xl font-semibold mb-2">
                Owner Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex flex-col">
              <p className="text-gray-700">Name: {pet.owner}</p>
              <p className="text-gray-500 mt-1">Contact info hidden</p>

              <div className="flex justify-end mt-4">
                <a href="/login">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    Chat with Owner
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PetDetailsComponent;
