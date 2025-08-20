import React from 'react'

const Footer = () => {
  return (
   <footer className="py-12 bg-gray-100 text-gray-900 ">
  <div className="max-w-6xl mx-auto px-4 space-y-6 md:space-y-12">
    <div className="grid grid-cols-12">
      {/* Replace the Petbook title with the one in navbar */}
      <div className="col-span-full md:col-span-6 mb-6 md:mb-0">
          <a
              href="#"
              className="flex items-center text-gray-700 hover:text-gray-900"
            >
              <span className="font-bold text-2xl">PetBook</span>
            </a>  
      </div>

      {/* Links */}
      <div className="col-span-6 text-center md:text-left md:col-span-3">
        <p className="mb-2 text-lg font-medium">Explore</p>
        <ul className="space-y-1">
          <li><a href="#" className="hover:text-red-600">Available Pets</a></li>
          <li><a href="#" className="hover:text-red-600">Adoption</a></li>
          <li><a href="#" className="hover:text-red-600">About Me</a></li>
        </ul>
      </div>

      <div className="col-span-6 text-center md:text-left md:col-span-3">
        <p className="mb-2 text-lg font-medium">Social</p>
        <ul className="space-y-1">
          <li><a href="#" className="hover:text-red-600">GitHub</a></li>
          <li><a href="#" className="hover:text-red-600">LinkedIn</a></li>
          <li><a href="#" className="hover:text-red-600">Email</a></li>
        </ul>
      </div>
    </div>

    {/* Bottom */}
    <div className="flex justify-center items-center pt-6 border-t border-gray-300 text-sm md:flex-row">
      <span>© 2025 PetBook. A Portfolio Project 🐾</span>
  
    </div>
  </div>
</footer>

  );
};
export default Footer