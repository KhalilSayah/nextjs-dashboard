"use client";

import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const RECENT_SEARCHES_KEY = "recentSearches";

export default function Search({ placeholder, onSearch }: { placeholder: string; onSearch: (query: string) => void }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get('query') || "");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || "[]");
    setRecentSearches(storedSearches);
  }, []);

  function handleSearch(term: string) {
    setSearchTerm(term);
    onSearch(term); 

    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);

    const updatedSearches = [term, ...recentSearches.filter(search => search !== term)].slice(0, 5);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedSearches));
    setRecentSearches(updatedSearches); 
    setShowSuggestions(false);
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onSearch(e.target.value); 
          setShowSuggestions(true); 
        }}
        onFocus={() => setShowSuggestions(true)} // Show suggestions when the input is focused
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

      {/* Recent Search Suggestions */}
      {showSuggestions && recentSearches.length > 0 && (
        <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
          {recentSearches.map((search, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSearch(search)} // On click, search for the recent query
            >
              {search}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
