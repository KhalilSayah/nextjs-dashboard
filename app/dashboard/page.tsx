"use client";

import { useState } from "react";
import { List } from "@/components/list";
import Search from "../ui/search";
import { DataProvider } from "@/components/data-provider";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const [searchQuery, setSearchQuery] = useState(searchParams?.query || "");

  return (
    <DataProvider>
      <div className="container mx-auto p-4">
        <Search placeholder="Search a token..." onSearch={setSearchQuery} />
        <List searchQuery={searchQuery} />
      </div>
    </DataProvider>
  );
}
