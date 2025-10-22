"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import useDebounce from "@/hooks/useDebounce";
import { searchStocks } from "@/lib/actions/finnhub.actions";
import { Loader2, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { set } from "mongoose";

export function SearchCommand({
  renderAs = "button",
  initialStocks = [
    {
      exchange: "NASDAQ",
      symbol: "AAPL",
      name: "Apple Inc.",
      type: "Equity",
      isInWatchlist: true,
    },
  ],
  label = "Add stock",
}: SearchCommandProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] =
    useState<StockWithWatchlistStatus[]>(initialStocks);

  const isSearchMode = !!searchTerm.trim;
  const displayStocks = isSearchMode ? stocks : stocks.slice(0, 10);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearch = async () => {
    if (!isSearchMode) return setStocks(initialStocks);

    setLoading(true);

    try {
      const results = await searchStocks(searchTerm);
      setStocks(results);
    } catch (error) {
      console.log(error);
      setStocks([]);
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useDebounce(handleSearch, 300);

  // trigger debounced whenever searchTerm changes
  useEffect(() => {
    debouncedSearch();
  }, [searchTerm]);

  const handleSelectStock = () => {
     setOpen(false);
     setSearchTerm('')
     setStocks(initialStocks)
  };

  return (
    <>
      {renderAs === "text" ? (
        <span className="search-text" onClick={() => setOpen(true)}>
          {label}
        </span>
      ) : (
        <Button className="search-btn" onClick={() => setOpen(true)}>
          {label}
        </Button>
      )}

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="search-dialog"
      >
        <div className="search-field">
          <CommandInput
            value={searchTerm}
            onValueChange={setSearchTerm}
            placeholder="Search Stocks.."
            className="search-input"
          />
          {loading && <Loader2 className="search-loader" />}
        </div>
        <CommandList className="search-list">
          {loading ? (
            <CommandEmpty className="search-list-empty">
              Loading stocks...
            </CommandEmpty>
          ) : displayStocks.length === 0 ? (
            <div className="search-list-indicator">
              {isSearchMode ? "No results found" : "No stocks added yet"}
            </div>
          ) : (
            <ul>
              <div className="search-count">
                {isSearchMode ? "Search results " : "Popular stocks"}(
                {displayStocks?.length || 0})
              </div>
              {displayStocks?.map((stock, i) => (
                <li key={stock.symbol} className="search-item">
                  <Link
                    onClick={handleSelectStock}
                    href={`/stocks/${stock.symbol}`}
                    className="search-item-link"
                  >
                    <TrendingUp className="size-4 text-gray-500" />
                    <div className="flex-1">
                      <div className="search-item-name">
                        {stock.name} | {stock.symbol} | {stock.type}{" "}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <CommandGroup heading="Stocks">
            <CommandItem onSelect={handleSelectStock}>AAPL</CommandItem>
            <CommandItem onSelect={handleSelectStock}>GOOGL</CommandItem>
            <CommandItem onSelect={handleSelectStock}>AMEX</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default SearchCommand;
