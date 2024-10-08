"use client";

import Link from "next/link";
import TokensSkeleton from "@/app/ui/skeletons";
import { useDataContext } from "./data-provider";

export function List() {
  const {data} = useDataContext();

  if (!data) {
    return <TokensSkeleton />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">List of Tokens</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.length > 0 ? (
          data.map((tokenKey) => (
            <Link
              key={tokenKey}
              href={`/dashboard/tokens/${tokenKey}`}
            >
              <div className="p-4 max-w-sm">
                <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <h2 className="text-black dark:text-white text-lg font-medium">{tokenKey}</h2>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div>No tokens match your search.</div>
        )}
      </div>
    </div>
  );
}
