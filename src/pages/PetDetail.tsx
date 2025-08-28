import { Footer, Header, PetDetailsComponent } from "@/components";

import { useParams } from "react-router-dom";

const PetDetail = () => {
    const { petId } = useParams(); 
  return (
    <div>
      <Header />

        <PetDetailsComponent />

      <Footer />
    </div>
  );
};

export default PetDetail;
