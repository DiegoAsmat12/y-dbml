'use client'

const { createContext, useContext, useState } = require("react");

const DBMLContext = createContext({
    entities: [],
    setEntities: () => {}
})

export const DBMLContextProvider = ({children}) => {

    const [entities, setEntities] = useState([]);

    return (
        <DBMLContext.Provider value={{entities, setEntities}}>
            {children}
        </DBMLContext.Provider>
    )
}

export const useDBMLContext = () => useContext(DBMLContext);