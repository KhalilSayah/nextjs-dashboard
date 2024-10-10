"use client";

import { useState } from "react";
import { List } from "@/components/list";
import { DataProvider } from "@/components/data-provider";
import SortButton from "@/components/sort-button";
import Search from "@/app/ui/search";
import { TokensResponse } from "@/app/lib/api";

interface DashboardPageProps{
    searchParams?: {
        query?: string;
      };
    data:string[];

}

export default function DashboardPage(
    {searchParams,data}:DashboardPageProps){
  const [searchQuery, setSearchQuery] = useState(searchParams?.query || "");
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC"); 
  return (
    <DataProvider sortOrder={sortOrder} _data={data} searchQuery={searchQuery}> {}
      <div className="container mx-auto p-4">
        <Search />
        <SortButton sortOrder={sortOrder} onChange={setSortOrder} /> {}
        <List />
      </div>
    </DataProvider>
  );
}
