import { AddPetListingForm } from "./AddPetListingForm";
import { UploadImages } from "./UploadImages";

export const AddPetListingBox = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-10">
      <form className="w-full max-w-5xl flex flex-col lg:flex-row border-2 rounded-2xl border-red-600 shadow-lg overflow-hidden p-4">
        
        <div className="w-1/2 bg-gray-100">
        <UploadImages/>
        </div>
        <div className="w-1/2">
               <h3 className="text-2xl text-center mb-4 py-6 ">Add New Pet Listing</h3>

          <AddPetListingForm />
        </div>
      </form>
    </section>
  );
};
