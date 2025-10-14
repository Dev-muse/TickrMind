"use client";

import { NAV_ITEMS, NavItem } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItems = () => {
  const route = usePathname();
  console.log(route)

  return (
    <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
      {NAV_ITEMS.map((item) => (
        <li
          key={item.label} 
          className={`hover:text-yellow-500 transition-colors cursor-pointer ${
            route == item.href ? "text-gray-100" : "text-slate-400"
          }`}
        >
          <Link href={item.href}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavItems;
