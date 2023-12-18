'use client'

import { useDBMLContext } from "@/contexts/global/DBMLContext";
import { NODEDEFINITIONS } from "@/utils/textEditor";
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

    const {setEntities} = useDBMLContext();
    const [code, setCode] = useState("")
    const textRef = useRef();

    const KeyDownHandler = (e) => {
        if(e.key == 'Tab'){
            e.preventDefault();
            
            const {selectionStart, selectionEnd} = e.target;

            const newText = code.substring(0, selectionStart)
                + "\t"
                + code.substring(selectionEnd);

            textRef.current.focus();

            // First we have to assign text in order to setSelectionRange to the exact location
            textRef.current.value = newText; 

            textRef.current.setSelectionRange(
                selectionStart+1,
                selectionEnd+1
            )

            setCode(newText);
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

    useEffect(() => {
        let entities = [...code.matchAll(NODEDEFINITIONS.entity)];
        setEntities(entities?.length? entities: [])
    }, [codeArray])


    return (
        <section className="col-span-1 relative">
            <textarea className="text-transparent bg-transparent caret-white absolute h-full w-full p-2 text-lg font-mono resize-none outline-none" onChange={(e) => setCode(e.target.value)} value={code} ref={textRef} onKeyDown={KeyDownHandler} />
            <div className="bg-[#120616] text-lg text-white p-2 font-mono h-full cursor-pointer whitespace-pre-wrap" onClick={() => textRef.current.focus()}>
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