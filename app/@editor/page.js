'use client'

import { Fragment, useEffect, useMemo, useRef, useState } from "react"

const specialText = [
    {
        color: "#3270a0",
        textList: [
            "Database",
            "General",
            "Ref"
        ]
    }
]

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
        let output =  {
            color: "#ffffff",
            value: current
        };
        if(current !== " " && current !== "\t" && current !== "\n"){
            let value = previous[previous.length-1].value + current;

            for(const {color, textList} of specialText){
                if(textList.some(val => val === value)) {
                    console.log("Here")
                    output.color = color;
                    break;
                }
            }
            
            output.value = value;
            previous[previous.length-1] = output;
        }
        else previous = [...previous, output, {value: "", color: "#ffffff"}];

        return previous;
    }

    const codeArray = useMemo(() => {
        return code.split("").reduce(concatenateReducer, [{value: "", color: "#ffffff"}])
    }, [code])


    return (
        <section className="col-span-1">
            <textarea className="h-0 w-0 absolute" onChange={(e) => setCode(e.target.value)} value={code} ref={textRef} onKeyDown={KeyDownHandler}/>
            <div className="bg-[#282828] text-lg text-white p-2 font-mono h-full cursor-pointer whitespace-pre-wrap" onClick={() => textRef.current.focus()}>
                {/* Create html like elements */}
                {codeArray.map(({color, value}, index) => 
                (
                    <Fragment key={index+value} >
                        {
                            value !== " " && value !== "\t" && value !== "\n" ? (
                                <span style={{color}}>{value}</span>
                            )
                            : <>{value}</>

                        }
                    
                    </Fragment>
                
                ))}
            </div>
        </section>
        
    )
}