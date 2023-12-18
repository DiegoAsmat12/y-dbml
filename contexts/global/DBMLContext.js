'use client'

import { NODEDEFINITIONS } from "@/utils/textEditor";

const { createContext, useContext, useState, useMemo } = require("react");

const DBMLContext = createContext({
    entities: [],
    setEntities: () => {},
    dynamicNodes: []
})

export const DBMLContextProvider = ({children}) => {

    const [entities, setEntities] = useState([]);

    const dynamicNodes = useMemo(() => {
        return entities.map((entity) => {
            let propertiesTemp = [...entity[0].matchAll(NODEDEFINITIONS.property)];
            console.log(propertiesTemp);
            let properties = propertiesTemp? propertiesTemp.map((property) => ({
                name: property[1],
                nullable: property[2]? true:false,
                type: property[3]
            })): []
            
            return {
                entity: entity[1],
                parentEntity: entity[2],
                properties
            }
        })
    
    }, [entities])

    return (
        <DBMLContext.Provider value={{entities, setEntities, dynamicNodes}}>
            {children}
        </DBMLContext.Provider>
    )
}

export const useDBMLContext = () => useContext(DBMLContext);