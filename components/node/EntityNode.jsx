import { memo } from "react";
import { Handle } from "reactflow";

export default memo(({data={name: 'TEST', isRef: false, numConnections: 0}}) => {
    return (
        <div className="relative bg-slate-50 text-black p-2 rounded-sm resize-none hover:resize-x overflow-hidden">
            <div className="relative p-2 flex justify-between ">
                {/* Putting a handle in a "space" */}
                <Handle position="left" className="bg-transparent text-transparent"/>
                <span className="text-gray-700 left-0">Property: </span><span className=" relative text-xs text-blue-300 right-0">String[3-25]</span>
                <span className="hidden">{JSON.stringify({default: 'min', values: ['NODE', 'EDGE', 'MORE']})} </span>
            </div>
            
            Este es un nodo quiza y su nombre es {data.name}
            
        </div>
    )
})