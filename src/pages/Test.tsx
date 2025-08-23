import { useState } from "react";

import { SearchPageSortParams } from "@/types/petListing";
import { useSearchPets } from "@/hooks/useSearchPets";

export default function Test() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // search form state
  const [filterField, setFilterField] = useState<"location" | "name" | "breed" | "type">("location");
  const [filterValue, setFilterValue] = useState("");
  const [searchParams, setSearchParams] = useState<Record<string, string>>({});

  // query params
  const params: SearchPageSortParams = {
    page,
    size,
    sortField: "name",
    sortDirection,
    ...searchParams,
  };

  const { data, isLoading, isError, error } = useSearchPets(params);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0); // reset to first page
    setSearchParams(filterValue.trim() ? { [filterField]: filterValue.trim() } : {});
  };

  if (isLoading) return <p>Loading pets...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Pet Search</h1>

      {/* Search form */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <select
          value={filterField}
          onChange={(e) => setFilterField(e.target.value as any)}
          className="border rounded px-2 py-1"
        >
          <option value="location">Location</option>
          <option value="name">Name</option>
          <option value="breed">Breed</option>
          <option value="type">Type</option>
        </select>

        <input
          type="text"
          placeholder={`Search by ${filterField}...`}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="border rounded px-3 py-1 flex-grow"
        />

        <button
          type="submit"
          className="px-4 py-1 bg-blue-600 text-white rounded"
        >
          Search
        </button>
      </form>

      {/* Sorting & Page Size */}
      <div className="flex justify-between items-center mb-4">
        <label className="text-sm">
          Page Size:{" "}
          <select
            value={size}
            onChange={(e) => {
              setSize(Number(e.target.value));
              setPage(0);
            }}
            className="border rounded px-2 py-1 ml-1"
          >
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </label>

        <button
          onClick={() =>
            setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
          }
          className="px-3 py-1 border rounded"
        >
          Sort: {sortDirection.toUpperCase()}
        </button>
      </div>

      {/* Results */}
      {data?.data?.content?.length ? (
        <ul className="space-y-2">
          {data.data.content.map((pet) => (
            <li key={pet.id} className="border p-3 rounded shadow-sm">
              <p className="font-semibold text-lg">{pet.name}</p>
              <p className="text-sm text-gray-600">
                {pet.type} {pet.breed ? `- ${pet.breed}` : ""}
              </p>
              <p className="text-sm text-gray-500">📍 {pet.location}</p>
              <p className="text-sm text-gray-500">Owner: {pet.owner}</p>
              {pet.adopted && (
                <span className="text-green-600 text-xs font-semibold">
                  ✅ Adopted
                </span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No pets found</p>
      )}

      {/* Pagination */}
      <div className="flex gap-2 mt-4">
        <button
          disabled={data?.data?.pageNumber === 0}
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <button
          disabled={data?.data?.last}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-2">
        Page {data?.data?.pageNumber! + 1} of {data?.data?.totalPages}
      </p>
    </div>
  );
}
