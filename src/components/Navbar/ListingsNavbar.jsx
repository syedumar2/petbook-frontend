import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ListingsNavbar = () => {
  return (
    <nav className="">
      <div className="max-w-6xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex space-x-8 items-center">
            <a
              href="#"
              className="flex items-center text-gray-700 hover:text-gray-900"
            >
              <span className="font-bold text-2xl">PetBook</span>
            </a>

            <div className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Available Pets
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                Adoption
              </a>
              <a href="#" className="text-gray-700 hover:text-gray-900">
                About Me
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-2">
            <Button className="bg-red-700 text-white rounded-full px-8 py-2 text-sm font-medium shadow hover:bg-red-800 active:scale-95">
             <Link to="/login"> Login</Link>
            </Button>
            <Button className="bg-red-700 text-white rounded-full px-8 py-2 text-sm font-medium shadow hover:bg-red-800 active:scale-95">
              <Link to="/signup">  Sign Up </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ListingsNavbar;
