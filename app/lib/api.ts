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