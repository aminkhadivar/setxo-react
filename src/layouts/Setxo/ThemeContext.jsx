import { createContext } from 'react'

const ThemeContext = createContext({
  isDarkMode: false,
  setIsDarkMode: () => {},
})

export default ThemeContext