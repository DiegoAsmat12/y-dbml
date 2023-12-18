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
        for(let entity of entities){
            let properties = [...entity[0].matchAll(NODEDEFINITIONS.property)];
            console.log(properties)
        }
        return [];
    }, [entities])

    return (
        <DBMLContext.Provider value={{entities, setEntities, dynamicNodes}}>
            {children}
        </DBMLContext.Provider>
    )
}

export const useDBMLContext = () => useContext(DBMLContext);