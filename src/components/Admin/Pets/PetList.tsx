import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const mockPets = [
  {
    id: 1,
    name: "Buddy",
    type: "Dog",
    breed: "Labrador Retriever",
    location: "Bangalore",
    imageUrls: [
      "https://placedog.net/500?id=1",
      "https://placedog.net/500?id=2",
    ],
    adopted: false,
    owner: "Alice Johnson",
    description: "Friendly and energetic Labrador looking for a loving home.",
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
    imageUrls: [
      "https://placekitten.com/500/500",
      "https://placekitten.com/501/500",
    ],
    adopted: true,
    owner: "Bob Smith",
    description: "Calm and affectionate Persian cat, already adopted.",
    approved: true,
    approvedAt: "2025-07-20T15:00:00",
    rejectedAt: null,
  },
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
];

const PetList = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">All Pets</h1>
        <div className="relative w-64">
          <input
            type="search"
            placeholder="Search pets..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Table */}
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
              <th className="p-3 text-left">Adopted</th>
              <th className="p-3 text-left">Approved</th>
            </tr>
          </thead>
          <tbody>
            {mockPets.map((pet, index) => (
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
                    alt={`${pet.name}`}
                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                  />
                </td>
                <td className="p-3 font-medium">{`${pet.name}`}</td>
                <td className="p-3 text-gray-600">{pet.type}</td>
                <td className="p-3 text-gray-600">{pet.breed}</td>
                <td className="p-3 text-gray-600">{pet.location}</td>
                <td className="p-3 text-gray-600">{pet.owner}</td>

                <td className="p-3 text-gray-600">
                  {pet.adopted ? (
                    <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-white bg-green-600 rounded-full">
                      Adopted
                    </span>
                  ) : (
                    <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">
                      Not Adopted
                    </span>
                  )}
                </td>
                <HoverCard>
                  <HoverCardTrigger>
                    <td className="p-3 text-gray-600">
                      {pet.approved ? (
                        <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-white bg-green-600 rounded-full">
                          Approved
                        </span>
                      ) : pet.approved === null ? (
                        <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-white bg-gray-600 rounded-full">
                          No Action taken
                        </span>
                      ) : (
                        <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">
                          Rejected
                        </span>
                      )}
                    </td>
                  </HoverCardTrigger>
                  <HoverCardContent className={"bg-white w-full"}>
                    <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                      <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                        <tr>
                          <th className="px-6 py-3 text-left">Approved At</th>
                          <th className="px-6 py-3 text-left">Rejected At</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t hover:bg-gray-50">
                          <td className="px-6 py-4 text-gray-800">
                            {new Date(pet.approvedAt).toLocaleString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            }) || "—"}
                          </td>
                          <td className="px-6 py-4 text-gray-800">
                            {new Date(pet.rejectedAt).toLocaleString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            }) || "—"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </HoverCardContent>
                </HoverCard>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PetList;
