import { Button } from "../ui/button";
import { Link, useParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFetchUserPetById } from "@/hooks/useFetchUserPetById";
import { EmptyPage } from "../ErrorPage/EmptyPage";
import { ImageCarousel } from "../ImageCarousel/ImageCarousel";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PrivatePetDetails = () => {
  const { petId } = useParams();
  const { data, isError, isPending } = useFetchUserPetById(Number(petId));

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
    <section className="max-w-6xl mx-auto px-4 py-8">
      {/* Pet Image */}
      {!data || !data.data ? (
        <EmptyPage />
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2/3 → Pet details */}
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

            <div className="flex flex-col gap-8">
              <Card className="border rounded-2xl shadow-md p-6 h-fit">
                <CardContent className="p-0 flex flex-col space-y-4">
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
                        <Link to={`/profile/pets/update/${data?.data?.id}`}>Update Post</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className={"text-red-700"}
                        inset={undefined}
                      >
                        <Link to={`/profile/pets/delete/${data?.data?.id}`}>Delete Post</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className={"text-green-700"}
                        inset={undefined}
                      >
                        Mark as Adopted
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>

              <Card className="border rounded-2xl shadow-md p-6 h-fit ">
                <CardContent className="p-0 flex flex-col space-y-4">
                  <CardTitle className={undefined}>
                    Conversations related to this Post
                  </CardTitle>
                  {/* Conversation 1 */}
                  <div className="flex items-center gap-3 py-8 px-2 bg-gray-200 rounded w-full h-16">
                    <Avatar className={"size-10"}>
                      <AvatarImage className={undefined} />
                      <AvatarFallback className="bg-cyan-700 text-2xl text-white">
                        J
                      </AvatarFallback>
                    </Avatar>
                    <div className="w-full">
                      <div className="text-lg font-semibold">John Doe</div>
                      <span className="text-gray-500">
                        For Pet Listing: *petName*
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* Right 1/3 → Owner details */}
        </>
      )}{" "}
    </section>
  );
};

export default PrivatePetDetails;
