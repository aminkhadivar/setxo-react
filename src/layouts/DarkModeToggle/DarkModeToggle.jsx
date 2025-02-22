import { useContext, useEffect } from 'react'
import { Moon, Sun1, MaskLeft } from 'iconsax-react'
import Dropdown from '../../components/Dropdown/Dropdown'
import { ThemeContext } from "../Setxo/Setxo"

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
                    className={`text-gray-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 h-10 w-10 rounded-full flex items-center justify-center duration-300`}>
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
                    <button className={`flex items-center w-full duration-300 text-base gap-2 p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-100 ${(getLocalStorage == 'light') ? 'bg-zinc-100 !text-zinc-800' : ''}`} onClick={switchLightTheme}>
                        <Sun1 size={20} />Light
                    </button>
                    <button className={`flex items-center w-full duration-300 text-base gap-2 p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-100 ${(getLocalStorage == 'dark') ? 'bg-zinc-600 !text-zinc-100' : ''}`} onClick={switchDarkTheme}>
                        <Moon size={20} />Dark
                    </button>
                    <button className={`flex items-center w-full duration-300 text-base gap-2 p-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-100 ${(getLocalStorage == null) ? 'bg-zinc-100 dark:bg-zinc-600 !text-zinc-100' : ''}`} onClick={switchSystemTheme}>
                        <MaskLeft size={20} />System
                    </button>
                </div>
            </Dropdown.Content>
        </Dropdown>
    )
}