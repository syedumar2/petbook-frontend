import { Trash } from "lucide-react";
import { Link } from "react-router-dom";



export const EmptyPage = () => {

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      <Trash size={64} />
      <h2 className="text-center  font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
        Oops! Theres nothing here...
      </h2>
      <h2 className=" font-semibold text-lg">
       No Pet listings available
      </h2>
      <Link to={"/"} className=" font-semibold text-md text-red-600">
        <button
          type="button"
          className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white bg-red-700 rounded-lg shadow-md hover:bg-red-800 transition"
        >
          Return to Home
        </button>
      </Link>
    </div>
  );
};
