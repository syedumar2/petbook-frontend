import { Check, MessageCircle, PawPrint, User, X } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminDashboardNav = () => {
  const location = useLocation(); // to determine active link

  return (
    <nav className="bg-white px-8 pt-2 shadow-md">
      <div className="flex justify-start">
        <Link
          to="/admin"
          className={`flex items-center gap-2 text-sm py-3 mr-8 no-underline text-teal-dark 
            border-b-2 ${
              location.pathname === "/admin"
                ? "border-teal-dark"
                : "border-transparent"
            } 
            hover:border-teal-dark hover:text-teal-dark transition-colors`}
        >
          <User />
         User List
        </Link>

        <Link
          to="/admin/pets"
          className={`flex items-center gap-2 text-sm py-3 mr-8 no-underline text-teal-dark 
            border-b-2 ${
              location.pathname === ("/admin/pets")
                ? "border-red-700"
                : "border-transparent"
            } 
            hover:border-red-700 hover:text-red-700 transition-colors`}
        >
          <PawPrint />
          All Pet Listings
        </Link>
        
             <Link
          to="/admin/pets/unapproved"
          className={`flex items-center gap-2 text-sm py-3 mr-8 no-underline text-teal-dark 
            border-b-2 ${
              location.pathname.includes("/admin/pets/unapproved")
                ? "border-red-700"
                : "border-transparent"
            } 
            hover:border-red-700 hover:text-red-700 transition-colors`}
        >
          <X/>
          Unapproved Pets
        </Link>

             <Link
          to="/admin/pets/approved"
          className={`flex items-center gap-2 text-sm py-3 mr-8 no-underline text-teal-dark 
            border-b-2 ${
              location.pathname.includes("/admin/pets/approved")
                ? "border-red-700"
                : "border-transparent"
            } 
            hover:border-red-700 hover:text-red-700 transition-colors`}
        >
          <Check/>
          Approved Pets
        </Link>


    

    

    
      </div>
    </nav>
  );
};

export default AdminDashboardNav;
