import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../../ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { usePetByIdQuery } from "@/hooks/usePetByIdQuery";
import { EmptyPage } from "../../ErrorPage/EmptyPage";
import { ImageCarousel, Loading } from "../..";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/authService";
import { toast } from "sonner";
import { useState } from "react";
import {  useQueryClient } from '@tanstack/react-query';

const PetDetailsComponent = () => {
  const queryClient = useQueryClient();
  const { petId } = useParams();
  const { user } = useAuth();

  const { data, isError, error, isFetching } = usePetByIdQuery(Number(petId));

  const navigate = useNavigate();
  const [ignore, setIgnore] = useState<boolean>(false);
  if (isFetching) return <Loading />;
  if (!data) return <p className="text-center mt-10">Pet not found!</p>;
  console.log(data.data?.description)

  const startConversation = async () => {
    if (!petId || !user || !data.data?.ownerId || ignore) return;
    setIgnore(true);
    const res = await authService.startConversation(
      user.id,
      data.data.ownerId,
      Number(petId)
    );
    if (res.success) {
       queryClient.invalidateQueries({
        queryKey: ["conversations"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["conversation"],
        refetchType: "active",
      });
      navigate("/profile/conversations");
      setIgnore(false);
    } else {
      toast.error(res.message);
      setIgnore(false);
      
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      {!data || !data.data ? (
        <EmptyPage />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
          {/* Left 2/3 → Pet details */}
          <div className="lg:col-span-2 flex flex-col h-full">
            <ImageCarousel
              images={data?.data?.imageUrls && data.data.imageUrls.length > 0 ? data.data.imageUrls : undefined}
              className="w-full mb-6"
            />
            
            <h1 className="text-3xl font-bold">{data.data.name}</h1>
            <p className="text-gray-600 text-lg mt-1">
              {data.data.type} - {data.data.breed}
            </p>
             <p className="text-gray-500 mt-1 text-sm">
              Gender: {data.data.gender.charAt(0) + data.data.gender.slice(1).toLocaleLowerCase() }
            </p>
            <p className="text-gray-500 mt-1 text-sm">
              Location: {data.data.location}
            </p>

            {data.data.adopted && (
              <span className="inline-block mt-3 px-4 py-1 text-xs font-semibold text-white bg-red-600 rounded-full w-fit">
                Adopted
              </span>
            )}

            <p className="mt-6 text-gray-700 leading-relaxed">
              {data.data.description}
            </p>
          </div>

          {/* Right 1/3 → Owner details */}
          <Card className="border rounded-2xl shadow-md p-6 h-fit">
            <CardContent className="p-0 flex flex-col space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2 ">
                Owner Details
              </h2>

              <div className="text-gray-700">
                <p>
                  <span className="font-medium">Email:</span> {data.data.owner}
                </p>
              </div>

              <Button
                className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-4 py-2 mt-4 w-full"
                variant={undefined}
                size={undefined}
                onClick={()=>startConversation()}
              >
                Chat with Owner
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
};

export default PetDetailsComponent;
