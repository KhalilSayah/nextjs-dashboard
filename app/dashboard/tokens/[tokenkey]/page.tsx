"use client";  // Mark this as a Client Component

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';  // For extracting dynamic route params
import fetchAllDataFromApi from '../../../lib/api'; // Adjust path if needed

interface TokenAllocation {
  batches: Array<{
    date: string;
    is_tge: boolean;
    unlock_percent: number;
  }>;
}

interface TokenData {
  allocations: TokenAllocation[];
}

interface TokensResponse {
  tokens: {
    data: Record<string, TokenData>;
  };
}

export default function TokenDetailsPage() {
  const { tokenkey } = useParams();  // Get dynamic `tokenkey` param
  const [tokenData, setTokenData] = useState<TokenData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data: TokensResponse = await fetchAllDataFromApi();
      if (data && data.tokens && data.tokens.data && tokenkey) {
        setTokenData(data.tokens.data[tokenkey as string]);
      }
    };
    fetchData();
  }, [tokenkey]);

  if (!tokenData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Token Details for {tokenkey}</h1>
      

      {/* Display entire TokenData as a JSON string */}
      <div className="mt-8">
        <h2 className="text-lg font-medium">Raw Token Data:</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          {JSON.stringify(tokenData, null, 2)}
        </pre>
      </div>
    </div>
  );
}
