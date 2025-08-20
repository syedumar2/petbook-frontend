import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

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
      "https://cdn.pixabay.com/photo/2017/09/25/13/12/cat-2785383_1280.jpg",
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

const UserPetListing = () => {
  return (
    <section >
      <h2 className="text-2xl font-semibold mx-8 my-4">My Pets</h2>

       <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 px-4 pb-12">
        {userPets.map((pet) => (
          <Link key={pet.id} to={`/profile/pets/${pet.id}`}>
            <Card className="border border-gray-500 rounded-2xl shadow hover:shadow-lg transition overflow-hidden w-[380px] h-[380px] pt-4">
              <CardContent className="px-4 py-0">
                {/* Display first image */}
                <img
                  src={pet.imageUrls[0]}
                  alt={pet.name}
                  className="w-full h-48 object-cover mb-2"
                />
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
                  <p className="text-gray-500 text-sm mt-1">Owner: {pet.owner}</p>

                  {pet.adopted && (
                    <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">
                      Adopted
                    </span>
                  )}

                  {/* Approval status */}
                  <p className="text-sm mt-2">
                    Status:{" "}
                    {pet.approved
                      ? `Approved on ${pet.approvedAt}`
                      : pet.rejectedAt
                      ? `Rejected on ${pet.rejectedAt}`
                      : "Pending"}
                  </p>

                  <p className="text-gray-500 text-sm mt-1 truncate">{pet.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>

      <div className="flex justify-center items-center gap-3 my-6">
        <Button className="hover:cursor-pointer" disabled variant={undefined} size={undefined}>
          Previous
        </Button>

        <div className="flex gap-2 ">
          <Button className="hover:cursor-pointer bg-red-600 text-white" variant={undefined} size={undefined}>1</Button>
          <Button className="hover:cursor-pointer bg-gray-200 text-gray-700" variant={undefined} size={undefined}>2</Button>
          <span className="px-2 py-1 text-gray-500">...</span>
          <Button className="hover:cursor-pointer bg-gray-200 text-gray-700" variant={undefined} size={undefined}>10</Button>
        </div>

        <Button className="hover:cursor-pointer" variant={undefined} size={undefined}>Next</Button>
      </div>
    </section>
  );
};

export default UserPetListing;
