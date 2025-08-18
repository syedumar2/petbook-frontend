import { Header, SearchBar, Footer, GeneralPetListing } from "@/components";
import React from "react";

const PetListing = () => {
  return (
    <div>
      <Header />
      <main>
        <SearchBar />
       
        <GeneralPetListing/>
      </main>
      <Footer />
    </div>
  );
};

export default PetListing;
