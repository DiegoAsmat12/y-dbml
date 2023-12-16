import { memo } from "react";
import { Handle } from "reactflow";

export default memo(({data={name: 'TEST', isRef: false, numConnections: 0}}) => {
    return (
        <>
        <div className="relative bg-slate-50 text-black rounded-sm resize-none hover:resize overflow-hidden min-w-[18rem] border-solid border-2">
            <h2 className="p-2 bg-slate-900 text-gray-200 text-xl text-center text-ellipsis whitespace-nowrap overflow-hidden custom-drag-heading">
                {data.name}
            </h2>
            
            <div className="relative p-2 flex items-center gap-2">
                {/* Putting a handle in a "space" */}
                <Handle position="left" className="px-1"/>
                <div className="flex-1">
                    <span className="text-gray-700 text-base">Property: </span><span className="text-base text-blue-300 whitespace-nowrap">String[3-25]</span>

                </div>
                <span className="text-ellipsis whitespace-nowrap opacity-25 w-2/6">{JSON.stringify({default: 'min', values: ['NODE', 'EDGE', 'MORE']})} </span>
            </div>
            
            
            
        </div>
        </>
        
    )
})