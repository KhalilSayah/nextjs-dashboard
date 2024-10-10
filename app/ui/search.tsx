"use client";

import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDataContext } from "@/components/data-provider";

const RECENT_SEARCHES_KEY = "recentSearches";

export default function Search(){
  const {searchQuery, setSearchQuery} = useDataContext()
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [debouncedValue, setDebouncedValue] = useState<string | undefined>(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(debouncedValue);
    }, 300); // 300ms debounce delay

    return () => {
      clearTimeout(handler); // Clear the timeout if the component is re-rendered or unmounted
    };
  }, [debouncedValue]);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder="search for a token ..."
        value={debouncedValue}
        onChange={(e) => {
          setDebouncedValue(e.target.value)
          setShowSuggestions(true); 
        }}
        onFocus={() => setShowSuggestions(true)} // Show suggestions when the input is focused
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />

      {/* Recent Search Suggestions */}
      
    </div>
  );
}
