import { useContext, useEffect } from 'react'
import { Moon, Sun1, MaskLeft } from 'iconsax-reactjs'
import Dropdown from '../../components/Dropdown/Dropdown'
import ThemeContext  from "../Setxo/ThemeContext"

export default function DarkModeToggle() {

    const { isDarkMode, setIsDarkMode, getLocalStorage } = useContext(ThemeContext)

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [])

    function switchLightTheme() {
        setIsDarkMode(!isDarkMode)
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light'
    }

    function switchDarkTheme() {
        setIsDarkMode(!isDarkMode)
        document.documentElement.classList.add('dark')
        localStorage.theme = 'dark'
    }

    function switchSystemTheme() {
        localStorage.removeItem('theme')
        if (window.matchMedia('(prefers-color-scheme: dark)')) {
            document.documentElement.classList.add('dark')
            setIsDarkMode(!isDarkMode)

        } else {
            document.documentElement.classList.remove('dark')
            setIsDarkMode(!isDarkMode)
        }
    }

    return (
        <Dropdown placement="bottom-center">
            <Dropdown.Trigger>
                <button id="theme-toggle" type="button"
                    className={`text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 h-10 w-10 rounded-full flex items-center justify-center duration-300 cursor-pointer`}>
                    <span className="dark:hidden block">
                        <Sun1 id="theme-toggle-light-icon" size={20} />
                    </span>
                    <span className="dark:block hidden">
                        <Moon id="theme-toggle-dark-icon" size={20} />
                    </span>
                </button>
            </Dropdown.Trigger>
            <Dropdown.Content width="120">
                <div className="flex flex-col gap-2 p-2">
                    <button className={`flex items-center w-full duration-300 text-base gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-100 ${(getLocalStorage == 'light') ? 'bg-gray-100 !text-gray-800' : 'cursor-pointer'}`} onClick={switchLightTheme}>
                        <Sun1 size={20} />Light
                    </button>
                    <button className={`flex items-center w-full duration-300 text-base gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-100 ${(getLocalStorage == 'dark') ? 'bg-gray-600 !text-gray-100' : 'cursor-pointer'}`} onClick={switchDarkTheme}>
                        <Moon size={20} />Dark
                    </button>
                    <button className={`flex items-center w-full duration-300 text-base gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-100 ${(getLocalStorage == null) ? 'bg-gray-100 dark:bg-gray-600 !text-gray-100' : 'cursor-pointer'}`} onClick={switchSystemTheme}>
                        <MaskLeft size={20} />System
                    </button>
                </div>
            </Dropdown.Content>
        </Dropdown>
    )
}