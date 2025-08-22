import { Button } from "@/components/ui/button";
import { LogOut, MessageCircle, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import UserDisplay from "./UserDisplay";
import { useAuth } from "@/hooks/useAuth";

const UserNavbar = () => {
  const { logout } = useAuth();


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

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-2">
            <section className="flex justify-between gap-8 items-center">
              <Link to={"/profile/conversations"}>
                <MessageCircle />
              </Link>
                 <div className="w-1/4 md:w-auto md:flex text-right">
             
               <UserDisplay/>
              </div>
              <Button className="bg-red-700 text-white rounded-full px-8 py-2 text-sm font-medium shadow hover:bg-red-800 active:scale-95" variant={undefined} size={undefined}>
                <Plus /> Add Pet
              </Button>
              <LogOut onClick={()=>logout()}/>
            </section>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
