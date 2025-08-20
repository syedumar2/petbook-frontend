import { Header, SearchBar, Footer, GeneralPetListing } from "@/components";
import { Button } from "@/components/ui/button";

const PetListing = () => {
  return (
    <div>
      <Header />
      <main>
        <SearchBar />

        <GeneralPetListing />
      </main>
      <Footer />
    </div>
  );
};

export default PetListing;
