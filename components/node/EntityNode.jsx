import { memo } from "react";
import { Handle } from "reactflow";

export default memo(({data}) => {

    const {entity, parentEntity, properties} = data;
    return (
        <>
        <div className="relative bg-slate-50 text-black rounded-sm resize-none hover:resize overflow-hidden min-w-[18rem] border-solid border-2">
            <h2 className="p-2 bg-slate-900 text-gray-200 text-xl text-center text-ellipsis whitespace-nowrap overflow-hidden custom-drag-heading">
                {entity} {parentEntity? `- ${parentEntity}`: null}
            </h2>
            
            {
                properties.map(({name, nullable, type}, index) => (
                    <div className="relative p-2 flex items-center gap-2" key={index+name}>
                        {/* Putting a handle in a "space" */}
                        <div className="flex-1">
                            <span className="text-gray-700 text-base">{name}: </span><span className="text-base text-blue-300 whitespace-nowrap">{type}</span> 

                        </div>
                        <span className="text-ellipsis whitespace-nowrap opacity-25 w-2/6">{JSON.stringify({default: 'min', values: ['NODE', 'EDGE', 'MORE']})} </span>
                        <Handle position="right" className="px-1" type="source" id={name+"-right"}/>
                        <Handle position="left" className="px-1" type="target" id={name+"-left"}/>

                    </div>
                ))
            }
            
            
            
        </div>
        </>
        
    )
})