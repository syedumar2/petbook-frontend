import React from "react";

const mockUsers = [
  {
    id: 1,
    firstname: "Alice",
    lastname: "Johnson",
    email: "alice@example.com",
    location: "Bangalore",
    profileImageUrl: "https://i.pravatar.cc/150?img=1",
    role: "ADMIN",
    createdAt: "2025-08-01T10:30:00",
  },
  {
    id: 2,
    firstname: "Bob",
    lastname: "Smith",
    email: "bob@example.com",
    location: "Mumbai",
    profileImageUrl: "https://i.pravatar.cc/150?img=2",
    role: "USER",
    createdAt: "2025-07-28T14:15:00",
  },
  {
    id: 3,
    firstname: "Charlie",
    lastname: "Brown",
    email: "charlie@example.com",
    location: "Delhi",
    profileImageUrl: "https://i.pravatar.cc/150?img=3",
    role: "USER",
    createdAt: "2025-07-15T09:00:00",
  },
];

const UsersList = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="relative w-64">
          <input
            type="search"
            placeholder="Search users..."
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
              <th className="p-3 text-left">Profile</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user, index) => (
              <tr
                key={user.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50 transition`}
              >
                <td className="p-3 text-gray-600">{user.id}</td>
                <td className="p-3">
                  <img
                    src={user.profileImageUrl}
                    alt={`${user.firstname} ${user.lastname}`}
                    className="w-10 h-10 rounded-full object-cover border border-gray-300"
                  />
                </td>
                <td className="p-3 font-medium">{`${user.firstname} ${user.lastname}`}</td>
                <td className="p-3 text-gray-600">{user.email}</td>
                <td className="p-3 text-gray-600">{user.location}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === "ADMIN"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="p-3 text-gray-500 text-sm">
                  {new Date(user.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
