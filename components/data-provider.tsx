"use client";

import fetchAllDataFromApi, { TokenData, TokensResponse } from "@/app/lib/api";
import { createContext, useEffect, useState, ReactNode, useContext } from "react";

const DataContext = createContext<TokensResponse | null>(null);

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<TokensResponse | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const fetchedData = await fetchAllDataFromApi();
                
                setData(fetchedData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
                setData(null);
            }
        };

        fetchData();
    }, []);

    return (
        
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (context === null) {
        console.log("error with data")
    }
    return context;
};
