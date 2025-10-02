export type NavItem = {
  id: number;
  name: string;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  { id: 1, name: "Dashboard", href: "/" },
  { id: 2, name: "Search", href: "/Search" },
  { id: 3, name: "WatchList", href: "/watchlist" },
];
