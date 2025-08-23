import { Footer, Header, Loading, PetDetailsComponent } from "@/components";
import { Suspense } from "react";
import { useParams } from "react-router-dom";

const PetDetail = () => {
    const { petId } = useParams(); 
  return (
    <div>
      <Header />
      <Suspense fallback={<Loading/>}>
        <PetDetailsComponent  />
      </Suspense>
      <Footer />
    </div>
  );
};

export default PetDetail;
