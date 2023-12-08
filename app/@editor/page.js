'use client'

import { useEffect, useRef, useState } from "react"

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




    return (
        <div className="col-span-1">
            <textarea className="h-0 w-0 absolute" onChange={(e) => setCode(e.target.value)} value={code} ref={textRef} onKeyDown={KeyDownHandler}/>
            <div className="bg-[#2c2c2e] text-lg text-white p-2 font-mono h-full cursor-pointer whitespace-pre-wrap" onClick={() => textRef.current.focus()}>
                {/* Create html like elements */}
                {code}
            </div>
        </div>
        
    )
}