import React from "react";
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
const UserDisplay = () => {
  return (
    <div className="hidden md:flex md:items-center gap-2 ml-2">
      <div>
        <Avatar className={"size-9"}>
          <AvatarImage src="https://github.com/shadcn.png" />
             <AvatarFallback className="bg-cyan-700 p-2 text-2xl text-white">J</AvatarFallback>
        </Avatar>
      </div>
      
        <span>John Doe</span>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {" "}
          <ChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent className={"bg-white"}>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem><Link to={"/profile"}>Profile</Link></DropdownMenuItem>
          <DropdownMenuItem>My Pets</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserDisplay;
