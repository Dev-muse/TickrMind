import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavItems from "./NavItems";
import MenuDropdown from "./MenuDropdown";

const Header = () => {
  return (
    <header className="sticky top-0 header">
      <div className="container header-wrapper">
        <Link href={"/"}>
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={140}
            height={32}
            className="h-8 w-auto cursor-pointer "
          />
        </Link>
        <nav className="hidden sm:block">
          {/* navitems */}

          <NavItems />
        </nav>
      {/* dropdown */}

      <div className="block ">
        <MenuDropdown />
      </div>
      </div>
    </header>
  );
};

export default Header;
