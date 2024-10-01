'use client';
import { Children, ReactNode, createContext, useEffect, useState } from 'react';

// Context
export interface TestContext {
  count : number
  setCount : (count:number)=>void
}

export const testContext = createContext<TestContext>(null!);

// Provider
export interface TestProviderProps {
    children:ReactNode
  
}
export const TestProvider = ({
    children
 
}: TestProviderProps) => {
  // Hooks
  const [count, setCount] = useState<number>(0)
  
  return (
    <testContext.Provider
      value={{
        count,setCount
      }}
    >
        {children}
    </testContext.Provider>
  );
};