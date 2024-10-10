import { ReadonlyURLSearchParams } from "next/navigation";
import { list } from "postcss";

// types.ts or similar
export interface TokenAllocation {
    batches: Array<{
      date: string; // ISO date string
      is_tge: boolean; // Boolean flag
      unlock_percent: number; // Percentage value
    }>;
  }
  
  export interface TokenData {
    allocations: TokenAllocation[]; // Array of allocations
  }
  
  export interface TokensResponse {
    tokens: {
      data: Record<string, TokenData>; // Key is the token name (e.g., 'ape-coin')
    };
  }
  
export default async function fetchAllDataFromApi(): Promise<TokensResponse> {
    try {
      console.log("fetching data ...")
      const response = await fetch('https://tokenmonitoring-4b3ac-default-rtdb.europe-west1.firebasedatabase.app/.json');
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data: TokensResponse = await response.json();
      console.log("Fetched data: ",  data);
      return data;
    } catch (error) {
      console.error('Failed to fetch data:', error);
      throw error;
    }
  }


export function sortedTokenData(data?:string[],sortOrder?:string){
  if (!data || !sortOrder){
    return data
  }
  return data.sort(([keyA], [keyB]) => {
    if (sortOrder === "ASC") {
        return keyA.localeCompare(keyB);
    } else {
        return keyB.localeCompare(keyA);
    }
});

}


export function filtreData(data?:string[], searchQuery?:string){

  if (!data || !searchQuery){
    return data
  }

  return data.filter((tokenKey) =>
    tokenKey.toLowerCase().includes(searchQuery.toLowerCase())
  );
}

export function storeRecentSearch(query: string) {
  const storedSearches = JSON.parse(localStorage.getItem("recentSearches") || "[]");
  const updatedSearches = [query, ...storedSearches.filter((q: string) => q !== query)].slice(0, 5);
  localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
}

export function handleSearch(searchParams:ReadonlyURLSearchParams,term?: string) {

  const params = new URLSearchParams(searchParams);
  if (term) {
    params.set("query", term);
  } else {
    params.delete("query");
  }
  return params

  
}
