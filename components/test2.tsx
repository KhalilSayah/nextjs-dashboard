'use client';

import { TestContext, testContext } from "@/contexts/test_context";
import { useContext, useEffect, useMemo, useState } from "react"

export default function Test2 () {
    const {count} = useContext<TestContext>(testContext)
    const color = useMemo<'green'| 'orange'| 'red'>(changeColor,[count])


    function changeColor(){
        if (count<5){
            return 'green'
        }
        else if (count <10) {
            return 'orange'
        }
        else {
            return 'red'
        }

    }

    return(
        <span style={{color}}>{count}</span>
    )
}