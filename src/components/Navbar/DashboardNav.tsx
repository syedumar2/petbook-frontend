import { MessageCircle, PawPrint, User } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const DashboardNav = () => {
  const location = useLocation(); // to determine active link

  return (
    <nav className="bg-white px-8 pt-2 shadow-md">
      <div className="flex justify-start">
        <Link
          to="/profile"
          className={`flex items-center gap-2 text-sm py-3 mr-8 no-underline text-teal-dark 
            border-b-2 ${
              location.pathname === "/profile"
                ? "border-teal-dark"
                : "border-transparent"
            } 
            hover:border-teal-dark hover:text-teal-dark transition-colors`}
        >
          <User />
          My Profile
        </Link>

        <Link
          to="/profile/pets"
          className={`flex items-center gap-2 text-sm py-3 mr-8 no-underline text-teal-dark 
            border-b-2 ${
              location.pathname.includes("/profile/pets")
                ? "border-red-700"
                : "border-transparent"
            } 
            hover:border-red-700 hover:text-red-700 transition-colors`}
        >
          <PawPrint />
          My Pet Listings
        </Link>

        <Link
          to="/profile/conversations"
          className={`flex items-center gap-2 text-sm py-3 mr-8 no-underline text-teal-dark 
            border-b-2 ${
              location.pathname === "/profile/conversations"
                ? "border-teal-dark"
                : "border-transparent"
            } 
            hover:border-teal-dark hover:text-teal-dark transition-colors`}
        >
          <MessageCircle />
          My Conversations
        </Link>
      </div>
    </nav>
  );
};

export default DashboardNav;
