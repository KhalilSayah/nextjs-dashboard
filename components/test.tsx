'use client'
import { TestContext, testContext } from "@/contexts/test_context";
import { useContext, useEffect, useState } from "react";

export default function Counter () {

    const {count,setCount} = useContext<TestContext>(testContext)

    function incrementation(){
        setCount(count + 1)
    }

    return(
        <>
        <button onClick={incrementation}>-</button>
        <span>{count}</span>
        </>
    )
    
}
