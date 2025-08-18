import React from "react";

const SearchBar = () => {
  return (
    <section class="w-full min-h-[257px] rounded-md  bg-center md:bg-[url('/images/searchBanner.png')]">
      <h2 className="text-center py-8 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
        Looking for a dog or a cat near you?
      </h2>
      <section className="container mx-auto  px-8 py-4 flex flex-col space-y-4 bg-black/60 rounded-2xl h-fit ">
        <div className="flex items-center justify-between  rounded-xl px-1 py-2">
          {/* Title */}
          <h2 className="text-white font-semibold text-lg">
            Search By
          </h2>

          {/* Filter options */}
          <div className="flex items-center gap-4">
            <button className="bg-red-700 text-white rounded-full px-5 py-2 text-sm font-medium shadow hover:bg-red-800 active:scale-95 transition">
              All
            </button>
            <button className="text-white border border-white/30 rounded-full px-5 py-2 text-sm font-medium shadow hover:bg-red-800 hover:border-red-700 active:scale-95 transition">
              Name
            </button>
            <button className="text-white border border-white/30 rounded-full px-5 py-2 text-sm font-medium shadow hover:bg-red-800 hover:border-red-700 active:scale-95 transition">
              Type
            </button>
            <button className="text-white border border-white/30 rounded-full px-5 py-2 text-sm font-medium shadow hover:bg-red-800 hover:border-red-700 active:scale-95 transition">
              Breed
            </button>
          </div>
        </div>

        <form className="flex w-full items-center">
          {/* icon + input wrapper */}
          <div className="flex flex-1">
            {/* icon */}
            <span className="flex items-center justify-center w-12 border border-r-0 border-gray-300 bg-white h-12">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M21 21l-4.3-4.3m1.3-5.4a6.7 6.7 0 11-13.4 0 6.7 6.7 0 0113.4 0z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </span>

            {/* input */}
            <input
              type="search"
              placeholder="Type a breed, name, or city to start your search”"
              aria-label="Search"
              className="h-12 flex-1 border bg-white border-gray-300 border-l-0 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* button */}
          <button
            type="submit"
            className="ml-4 inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white bg-red-700 rounded-lg shadow-md hover:bg-red-800 transition"
          >
            Search
          </button>
        </form>
      </section>
    </section>
  );
};

export default SearchBar;
