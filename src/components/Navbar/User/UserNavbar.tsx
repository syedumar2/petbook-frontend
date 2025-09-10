import { useAuth } from "@/hooks/useAuth";
import { LogOut, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import UserDisplay from "./UserDisplay";

import { Notifications } from "@/components/Notifications/Notifications";

const UserNavbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="">
      <div className="max-w-6xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex space-x-8 items-center">
            <Link
              to="/pets"
              className="flex items-center text-gray-700 hover:text-gray-900"
            >
              <span className="font-bold text-2xl">PetBook</span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link to="/pets" className="text-gray-700 hover:text-gray-900">
                Available Pets
              </Link>
              <Link
                to="/adoption"
                className="text-gray-700 hover:text-gray-900"
              >
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
              <Notifications />
              <Link to={"/profile/conversations"}>
                <MessageCircle />
              </Link>
              <div className="w-1/4 md:w-auto md:flex text-right">
                <UserDisplay />
              </div>

              <LogOut onClick={() => logout()} />
            </section>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
//TODO Create rest api connections and services to fetch notifications on login and a wshook to fetch notifications in real time
//TODO in the process fix the presence indicators, we need to publish new completed map everytime a new connection is established to all sockets
