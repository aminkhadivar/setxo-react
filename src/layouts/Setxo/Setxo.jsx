import { useState, useEffect } from 'react'
import ThemeContext from './ThemeContext'

const Setxo = ({ children }) => {

    const getLocalStorage = localStorage.getItem("theme")

    const [isDarkMode, setIsDarkMode] = useState(getLocalStorage)

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [])

    return (
        <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode , getLocalStorage }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default Setxo