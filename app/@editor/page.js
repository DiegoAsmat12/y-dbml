'use client'

import { Fragment, useEffect, useMemo, useRef, useState } from "react"

export default function Editor() {

    const [code, setCode] = useState("")
    const textRef = useRef();

    const KeyDownHandler = (e) => {
        if(e.key == 'Tab'){
            e.preventDefault();
            

            let start = e.target.selectionStart;
            let end = e.target.selectionEnd;

            setCode(
                code.substring(0, start) +
                "\t" +
                code.substring(end)
            )
            
            e.target.selectionStart = e.target.selectionEnd = start + 1

        }


    }


    const concatenateReducer = (previous, current) => {
        console.log({previous})
        console.log({current})
        if(current !== " " && current !== "\t" && current !== "\n"){
            previous[previous.length-1] = previous[previous.length-1] + current
        }
            
        else previous = [...previous, current, ""];

        return previous;
    }

    const codeArray = useMemo(() => {
        return code.split("").reduce(concatenateReducer, [""])
    }, [code])


    return (
        <div className="col-span-1">
            <textarea className="h-0 w-0 absolute" onChange={(e) => setCode(e.target.value)} value={code} ref={textRef} onKeyDown={KeyDownHandler}/>
            <div className="bg-[#2c2c2e] text-lg text-white p-2 font-mono h-full cursor-pointer whitespace-pre-wrap" onClick={() => textRef.current.focus()}>
                {/* Create html like elements */}
                {codeArray.map((val, index) => 
                (
                    <Fragment key={index+val} >
                        {
                            val !== " " && val !== "\t" && val !== "\n" ? 
                            <span className="text-green-100">{val}</span> : <>{val}</>

                        }
                    
                    </Fragment>
                
                ))}
            </div>
        </div>
        
    )
}