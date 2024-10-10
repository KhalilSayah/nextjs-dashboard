"use client";

import fetchAllDataFromApi, { filtreData, handleSearch, sortedTokenData, TokenData, TokensResponse } from "@/app/lib/api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useEffect, useState, ReactNode, useContext } from "react";

type sortValues = "ASC" | "DESC" | undefined

interface DataContextValue {
    data?: string[],
    sortOrder?: string, 
    setSortOrder:(v?:sortValues)=>void,
    searchQuery?: string, 
    setSearchQuery :(v?:string)=>void
}

const DataContext = createContext<DataContextValue |undefined>(undefined);

interface DataProviderProps {
    children: ReactNode, 
    _data ?: string[],

    
}
export const DataProvider = ({children,_data}:DataProviderProps ) => {
    const [data, setData] = useState<string[] | undefined>(_data);
    const [searchQuery, setSearchQuery] = useState<string | undefined>();
    const [sortOrder, setSortOrder] = useState<sortValues>();

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    useEffect(() => {
        const dataList = filtreData(_data,searchQuery)
        const sortedData = sortedTokenData(dataList,sortOrder)
        setData(sortedData)
        
    }, [sortOrder, searchQuery]); 

    useEffect(()=> {
        console.log(pathname)
        const url = new URL(pathname, 'http://localhost:3000')
        if(searchQuery){
            url.searchParams.append('query',searchQuery)
        }
        else{
            url.searchParams.delete('query')
        }

        replace(url.toString())
    }, [searchQuery])

    const value = {
        data,sortOrder, setSortOrder,searchQuery,setSearchQuery
    }
    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (context === null) {
        console.log("Error: No data available in context.");
    }
    return context as DataContextValue;
};

