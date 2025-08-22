import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
const UserDisplay = () => {
  const { user } = useAuth();
  return (
    <div className="hidden md:flex md:items-center gap-2 ml-2">
      <div>
        <Avatar className={"size-9"}>
          <AvatarImage
            src={user?.profileImageUrl}
            className={undefined}
          />
          <AvatarFallback className="bg-cyan-700 p-2 text-2xl text-white">
            {user?.firstname.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>

      <span>{user?.firstname} {user?.lastname}</span>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {" "}
          <ChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent className={"bg-white"}>
          <DropdownMenuLabel className={undefined} inset={undefined}>
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator className={undefined} />
          <DropdownMenuItem className={undefined} inset={undefined}>
            <Link to={"/profile"}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className={undefined} inset={undefined}>
            My Pets
          </DropdownMenuItem>
          <DropdownMenuItem className={undefined} inset={undefined}>
            Team
          </DropdownMenuItem>
          <DropdownMenuItem className={undefined} inset={undefined}>
            Settings
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDisplay;
