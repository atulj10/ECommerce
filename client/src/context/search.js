import { useState, useContext, createContext } from "react"

const SearchContext = createContext()

const SearchProvider = ({ children }) => {
    const [values, setValues] = useState({
        keyword: "",
        result: []
    })

    return (
        <SearchContext.Provider value={[values, setValues]}>
            {children}
        </SearchContext.Provider>
    )
}

const useSearch = () => useContext(SearchContext)
export { useSearch, SearchProvider }