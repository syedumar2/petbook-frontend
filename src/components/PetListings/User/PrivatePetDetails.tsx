import { Button } from "../../ui/button";
import { Link, useParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserPetByIdQuery } from "@/hooks/useUserPetByIdQuery";
import { EmptyPage } from "../../ErrorPage/EmptyPage";
import { ImageCarousel } from "../../ImageCarousel/ImageCarousel";
import { Card, CardContent, CardTitle } from "../../ui/card";
import {
  AdoptionConfirmation,
  DeleteDialogBox,
} from "@/components/DialogBoxes";
import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { useConversationsQuery } from "@/hooks/useConversationsQuery";
import { PrivatePetListingConversations } from "./PrivatePetListingConversations";

const PrivatePetDetails = () => {
  const { petId } = useParams();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [adoptionDialogOpen, setAdoptionDialogOpen] = useState<boolean>(false);

  const { data, isError, isPending } = useUserPetByIdQuery(Number(petId));
  const { data: conversations } = useConversationsQuery();

  const petListingConversations = conversations.data?.filter((conv)=> (conv.petId === Number(petId)));




  if (!data || data === null)
    return <p className="text-center mt-10">Pet not found!</p>;
  const parsedImageUrls: string[] = [];
  if (data.data?.imageUrls) {
    for (const url of data.data?.imageUrls) {
      for (const key of Object.keys(url)) {
        parsedImageUrls.push(key);
      }
    }
  }

  return (
    <section className="h-[80vh] w-full mx-auto  ">
      {/* Pet Image */}
      {!data || !data.data ? (
        <EmptyPage />
      ) : (
        <div className="flex justify-center my-18 gap-6">
          <div className="w-1/2 gap-8">
      
            <div className="lg:col-span-2 flex flex-col">
              <ImageCarousel
                images={
                  data.data.imageUrls && data.data.imageUrls.length > 0
                    ? parsedImageUrls
                    : [
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png",
                      ]
                }
                className="w-full mb-6"
              />
              <h1 className="text-3xl font-bold">{data.data.name}</h1>
              <p className="text-gray-600 text-lg mt-1">
                {data.data.type} - {data.data.breed}
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
              <p className="mt-2 text-sm text-gray-500">
                Status:{" "}
                {data.data.approved && data.data.approvedAt
                  ? `Approved on ${new Date(data.data.approvedAt)}`
                  : data.data.rejectedAt && data.data.rejectedAt
                  ? `Rejected on ${new Date(data.data.rejectedAt)}`
                  : "Pending"}
              </p>
            </div>

          
          </div>



            <div className="flex flex-col items-start gap-8 max-w-full">
              <Card className="border rounded-2xl shadow-md p-6 h-fit w-full ">
                <CardContent className="px-3 flex flex-col space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Owner Details
                  </h2>
                  <div className="text-gray-700">
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      {data.data.owner}
                    </p>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button
                        className="bg-gray-700 text-white rounded-full w-xs text-sm font-medium shadow hover:bg-red-800 active:scale-95"
                        variant={undefined}
                        size={undefined}
                      >
                        Actions <ChevronDown />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={"w-xs bg-white"}>
                      <DropdownMenuItem
                        className={"text-blue-800"}
                        inset={undefined}
                      >
                        <Link to={`/profile/pets/update/${data?.data?.id}`}>
                          Update Post
                        </Link>
                      </DropdownMenuItem>
                      <Dialog
                        open={deleteDialogOpen}
                        onOpenChange={setDeleteDialogOpen}
                      >
                        <DropdownMenuItem
                          className={"text-red-700"}
                          inset={undefined}
                          onSelect={(e: Event) => e.preventDefault()}
                        >
                          <DeleteDialogBox
                            petId={Number(petId)}
                            open={deleteDialogOpen}
                            setOpen={setDeleteDialogOpen}
                          />
                        </DropdownMenuItem>
                      </Dialog>
                      <Dialog
                        open={adoptionDialogOpen}
                        onOpenChange={setAdoptionDialogOpen}
                      >
                        <DropdownMenuItem
                          className={"text-green-700"}
                          inset={undefined}
                          onSelect={(e: Event) => e.preventDefault()}
                        >
                          <AdoptionConfirmation
                            open={adoptionDialogOpen}
                            setOpen={setAdoptionDialogOpen}
                            adoptionStatus={data.data?.adopted}
                            petId={Number(petId)}
                          />
                        </DropdownMenuItem>
                      </Dialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>

              <Card className="border  rounded-2xl shadow-md p-6 h-fit w-full ">
                <CardContent className="p-0 flex flex-col space-y-4 ">
                  <CardTitle className={undefined}>
                    Conversations related to this Post
                  </CardTitle>
                  {/* Conversation 1 */}
                  {petListingConversations && petListingConversations?.length> 0 ?
               <PrivatePetListingConversations data={petListingConversations}/> : <p className="font bold text-center p-2"><span>No Conversations available</span></p>
                }</CardContent>
              </Card>
            </div>
          {/* Right 1/3 → Owner details */}
        </div>
      )}{" "}
    </section>
  );
};

export default PrivatePetDetails;
