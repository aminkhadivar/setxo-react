import { createContext, useState } from 'react'

export const ThemeContext = createContext()

export default function Setxo({ children }) {

    const getLocalStorage = localStorage.getItem("theme")

    const [isDarkMode, setIsDarkMode] = useState(getLocalStorage)

    return (
        <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode, getLocalStorage }}>
            {children}
        </ThemeContext.Provider>
    )
}