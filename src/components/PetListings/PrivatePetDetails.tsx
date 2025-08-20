import React from "react";

import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data simulating PetInfoPrivateResponse
const userPets = [
  {
    id: 1,
    name: "Buddy",
    type: "Dog",
    breed: "Labrador",
    location: "Bidar",
    adopted: true,
    owner: "Syed Umar",
    description: "Buddy is friendly and playful.",
    approved: true,
    approvedAt: "2025-08-10",
    rejectedAt: null,
    imageUrls: [
      "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg",
    ],
  },
  {
    id: 2,
    name: "Mittens",
    type: "Cat",
    breed: "Siamese",
    location: "Mumbai",
    adopted: false,
    owner: "Syed Umar",
    description: "Mittens is curious and loves to play.",
    approved: false,
    approvedAt: null,
    rejectedAt: "2025-08-12",
    imageUrls: [
      "https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_1280.jpg",
    ],
  },
];

const PrivatePetDetails = () => {
  const { petId } = useParams();
  const pet = userPets.find((p) => p.id === parseInt(petId));
  if (!pet) return <p className="text-center mt-10">Pet not found!</p>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      {/* Pet Image */}
      <div className="flex items-center justify-center">
        <img
          src={pet.imageUrls[0]}
          alt={pet.name}
          className="w-full h-96 object-cover rounded-2xl shadow-md"
        />
      </div>

      {/* Pet Details */}
      <div className="flex items-start justify-between mt-6 gap-6">
        <div className="flex-1">
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
          <p className="mt-2 text-sm text-gray-500">
            Status:{" "}
            {pet.approved
              ? `Approved on ${pet.approvedAt}`
              : pet.rejectedAt
              ? `Rejected on ${pet.rejectedAt}`
              : "Pending"}
          </p>
       
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button className="bg-gray-700 text-white rounded-full w-xs text-sm font-medium shadow hover:bg-red-800 active:scale-95">
              Actions <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={"w-xs"}>
            <DropdownMenuItem className={"text-blue-800"}>
              Update Post
            </DropdownMenuItem>
            <DropdownMenuItem className={"text-red-700"}>
              Delete Post
            </DropdownMenuItem>
              <DropdownMenuItem className={"text-green-700"}>
              Mark as Adopted
            </DropdownMenuItem>
            

          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </section>
  );
};

export default PrivatePetDetails;
