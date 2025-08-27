
import { Button } from "@/components/ui/button";


const mockPets = [
  {
    id: 1,
    name: "Buddy",
    type: "Dog",
    breed: "Labrador Retriever",
    location: "Bangalore",
    imageUrls: ["https://placedog.net/500?id=1"],
    adopted: false,
    owner: "Alice Johnson",
    description: "Friendly Labrador looking for a loving home.",
    approved: true,
    approvedAt: "2025-08-10T09:30:00",
    rejectedAt: null,
  },
  {
    id: 2,
    name: "Whiskers",
    type: "Cat",
    breed: "Persian",
    location: "Mumbai",
    imageUrls: ["https://placekitten.com/500/500"],
    adopted: true,
    owner: "Bob Smith",
    description: "Calm and affectionate Persian cat.",
    approved: true,
    approvedAt: "2025-07-20T15:00:00",
    rejectedAt: null,
  },
];

const ApprovedPets = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <h1 className="text-2xl font-bold mb-6">Approved Pets</h1>

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
              .filter((pet) => pet.approved) // only approved
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
    ${pet.approved === true ? "bg-green-600" : pet.approved === false ? "bg-red-600" : "bg-yellow-600"}
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
                 
                   <Button className="bg-red-700 text-white rounded-full text-sm font-medium shadow hover:bg-red-800 active:scale-95">
                          Reject
                        </Button>
                      
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovedPets;
