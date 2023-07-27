import { createContext, useState } from "react";

export let DataContext = createContext()

export function DataContextProvider({children}) {

    const [Search, setSearch] = useState('')
    const [DataEmployees, setDataEmployees] = useState([])

    let values = {
        Search, 
        setSearch,
        DataEmployees,
        setDataEmployees
    }

    return (
        <DataContext.Provider value={values}>
        {children}
    </DataContext.Provider>
    )
}