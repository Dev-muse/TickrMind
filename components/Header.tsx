import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavItems from "./NavItems";
import MenuDropdown from "./MenuDropdown";
import { searchStocks } from "@/lib/actions/finnhub.actions";

const Header = async({user}:{user:User}) => {
  const initialStocks = await searchStocks()
  return (
    <header className="sticky top-0 header">
      <div className="container header-wrapper">
        <Link href={"/"}>
          <Image
            src="/assets/icons/logo-tickrMind.svg"
            alt="logo"
            width={140}
            height={32}
            className="h-10 w-auto cursor-pointer "
          />
        </Link>
        <nav className="hidden sm:block">
          {/* navitems */}

          <NavItems initialStocks={initialStocks} />
        </nav>
      {/* dropdown */}

      <div className="block ">
        <MenuDropdown initialStocks={initialStocks}  user={user}/>
      </div>
      </div>
    </header>
  );
};

export default Header;
