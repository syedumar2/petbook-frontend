import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const mockPets = [
  {
    id: 3,
    name: "Rocky",
    type: "Dog",
    breed: "German Shepherd",
    location: "Delhi",
    imageUrls: [
      "https://placedog.net/500?id=3",
      "https://placedog.net/500?id=4",
    ],
    adopted: false,
    owner: "Charlie Brown",
    description:
      "Alert and loyal German Shepherd, ideal for security and companionship.",
    approved: false,
    approvedAt: null,
    rejectedAt: "2025-08-05T11:45:00",
  },
  {
    id: 4,
    name: "Milo",
    type: "Cat",
    breed: "Siamese",
    location: "Pune",
    imageUrls: [
      "https://placekitten.com/502/500",
      "https://placekitten.com/503/500",
    ],
    adopted: false,
    owner: "Diana Prince",
    description: "Playful Siamese kitten waiting for approval.",
    approved: null,
    approvedAt: null,
    rejectedAt: null,
  },
];

const UnapprovedPets = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <h1 className="text-2xl font-bold mb-6">Unapproved Pets</h1>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider sticky top-0">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Breed</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Owner</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockPets
              .filter((pet) => !pet.approved) // only unapproved
              .map((pet, index) => (
                <tr
                  key={pet.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50 transition`}
                >
                  <td className="p-3 text-gray-600">{pet.id}</td>
                  <td className="p-3">
                    <img
                      src={pet.imageUrls[0]}
                      alt={pet.name}
                      className="w-10 h-10 rounded-full object-cover border border-gray-300"
                    />
                  </td>
                  <td className="p-3 font-medium">{pet.name}</td>
                  <td className="p-3 text-gray-600">{pet.type}</td>
                  <td className="p-3 text-gray-600">{pet.breed}</td>
                  <td className="p-3 text-gray-600">{pet.location}</td>
                  <td className="p-3 text-gray-600">{pet.owner}</td>
                  <td className="p-3 text-gray-600">
                    <span
                      className={`inline-block mt-2 px-2 py-1 text-xs font-semibold text-white rounded-full
    ${
      pet.approved === true
        ? "bg-green-600"
        : pet.approved === false
        ? "bg-red-600"
        : "bg-yellow-600"
    }
  `}
                    >
                      {pet.approved === true
                        ? "Approved"
                        : pet.approved === false
                        ? "Rejected"
                        : "Pending"}
                    </span>
                  </td>
                  <td className="p-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="bg-gray-700 text-white rounded-full text-sm font-medium shadow hover:bg-red-800 active:scale-95">
                          Actions
                          <ChevronDown />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className={"bg-white"}>
                        <DropdownMenuItem
                          onClick={() => alert(`Approved ${pet.name}`)}
                        >
                          ✅ Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => alert(`Rejected ${pet.name}`)}
                        >
                          ❌ Reject
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnapprovedPets;
