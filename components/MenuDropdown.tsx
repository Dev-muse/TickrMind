"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "@/lib/actions/auth.actions";
import { LogOut } from "lucide-react";
import NavItems from "./NavItems";

const MenuDropdown = ({ user , initialStocks }: { user: User, initialStocks: StockWithWatchlistStatus[] }) => {
  const router = useRouter();
  const handleSignOut = async() => {

    // Sign out logic here

    await signOut() 
    router.push("/sign-in");
  };
   return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-3 text-gray-300 hover:bg-yellow-500 "
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold ">
              {user?.name}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-base font-medium text-gray-400">
              {user?.name}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-gray-400 " align="start">
        <DropdownMenuLabel>
          <div className="flex item-center relative gap-3 py-2">
            <Avatar className="size-10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold ">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col ">
              <span className="text-base font-medium text-gray-400">
                {user.name}
              </span>
              <span className="text-sm-text-gray-500">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-gray-600" />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-gray-100 text-md font-medium focus: bg-transparent focus:text-yellow-500 transition-all "
        >
          <LogOut className="size-4 mr-2 hidden sm:block  " />
          Log out
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-gray-600 hidden smg:block " />
        <nav className="sm:hidden">
          <NavItems initialStocks={initialStocks} />
        </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuDropdown;
