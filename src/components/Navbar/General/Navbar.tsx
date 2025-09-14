import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // hamburger + close icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}

          <div className="flex items-center gap-12 justify-between w-fit">
            <Link
              to="/"
              className="flex items-center text-gray-700 hover:text-gray-900"
            >
              <span className="font-bold text-2xl text-center ">PetBook</span>
            </Link>
            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-6 ">
              <Link to="/pets" className="text-gray-700 hover:text-gray-900">
                Available Pets
              </Link>
              <Link to="/adoption" className="text-gray-700 hover:text-gray-900">
                Adoption
              </Link>
              <Link to="/aboutme" className="text-gray-700 hover:text-gray-900">
                About Me
              </Link>
            </div>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-2">
            
            <Button className="bg-red-700 text-white rounded-full px-6 py-2 text-sm font-medium shadow hover:bg-red-800 active:scale-95" variant={undefined} size={undefined}>
              <Link to="/login">Login</Link>
            </Button>
            <Button className="bg-red-700 text-white rounded-full px-6 py-2 text-sm font-medium shadow hover:bg-red-800 active:scale-95" variant={undefined} size={undefined}>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
          <div className="flex flex-col px-4 py-2 space-y-1">
            <Link
              to="/pets"
              className="text-gray-700 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              Available Pets
            </Link>
            <Link
              to="/signup"
              className="text-gray-700 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              Adoption
            </Link>
            <Link
              to="#"
              className="text-gray-700 hover:text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              About Me
            </Link>

            <div className="flex w-full justify-between py-2 border-t border-b border-gray-200">
              <Button
                className="bg-red-700 text-white rounded-full px-6 py-2 text-sm font-medium shadow hover:bg-red-800 active:scale-95 "
                onClick={() => setIsOpen(false)} variant={undefined} size={undefined}            >
                <Link to="/login" className="w-full text-center">
                  Login
                </Link>
              </Button>
              <Button
                className="bg-red-700 text-white rounded-full px-6 py-2 text-sm font-medium shadow hover:bg-red-800 active:scale-95 "
                onClick={() => setIsOpen(false)} variant={undefined} size={undefined}            >
                <Link to="/signup" className="w-full text-center">
                  Sign Up
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
