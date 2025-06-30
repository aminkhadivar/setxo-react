import { useState, useRef, useEffect, createContext, useContext, Fragment } from 'react'
import { Link } from '@inertiajs/react'
import { AnimatePresence, motion } from 'framer-motion'
import './Dropdown.css'

const DropDownContext = createContext()

const Dropdown = ({ children, placement = 'bottom', className = '', autoClose = true, dropdownBgColor = 'light' }) => {

    const autoCloseClass = {
        true: true,
        false: false,
        inside: false,
        outside: true,
        hover: true,
    }[autoClose]

    const ref = useRef()

    const [open, setOpen] = useState(false)

    const toggleOpen = () => {
        setOpen((previousState) => !previousState)
    }

    const showDropdownOnHover = () => {
        setOpen(true)
    }

    const hideDropdownOnHover = () => {
        setOpen(false);
    }

    useEffect(() => {
        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if ((autoCloseClass == true || autoCloseClass == 'outside') && open && ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [open])

    const placementClass = {
        top: 'dropup-start',
        'top-center': 'dropup-center',
        'top-end': 'dropup-end',
        right: 'dropend-start',
        'right-center': 'dropend-center',
        'right-end': 'dropend-end',
        bottom: 'dropdown-start',
        'bottom-center': 'dropdown-center',
        'bottom-end': 'dropdown-end',
        left: 'dropstart-start',
        'left-center': 'dropstart-center',
        'left-end': 'dropstart-end'
    }[placement]

    return (
        <DropDownContext.Provider value={{ open, setOpen, hideDropdownOnHover, showDropdownOnHover, toggleOpen, autoClose, dropdownBgColor, placement, placementClass }}>
            <div
                onMouseEnter={autoClose == 'hover' ? showDropdownOnHover : () => null} onMouseLeave={autoClose == 'hover' ? hideDropdownOnHover : () => null} className={'relative' + `${className && ` ` + className}`} ref={ref}
            >{children}</div>
        </DropDownContext.Provider>
    )
}

const Trigger = ({ className = '', children, ...props }) => {

    const { toggleOpen, open } = useContext(DropDownContext)

    const autoClose = useContext(DropDownContext)

    return (
        <div
            {...props}
            className={'drop-trigger' + `${className && ` ` + className}`}
            onClick={autoClose.autoClose == 'hover' ? null : toggleOpen}
        >
            {children}
        </div>
    )
}

const Content = ({ width = '192', contentClasses = 'bg-white', children }) => {

    const { open, setOpen, autoClose, dropdownBgColor, placement, placementClass } = useContext(DropDownContext)

    let widthClasses = ''
    const customWidth = `${width}px`

    if (width === '48') {
        widthClasses = 'w-48'
    } else {
        widthClasses = customWidth
    }

    const dropdownBgcolorClass = {
        light: 'bg-white dark:bg-gray-800',
        dark: 'bg-gray-800 dark',
    }[dropdownBgColor]

    const animationVariants = {
        top: { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 10 } },
        'top-center': { initial: { opacity: 0, y: 10, x: '-50%' }, animate: { opacity: 1, y: 0, x: '-50%' }, exit: { opacity: 0, y: 10, x: '-50%' } },
        'top-end': { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 10 } },
        bottom: { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } },
        'bottom-center': { initial: { opacity: 0, y: -10, x: '-50%' }, animate: { opacity: 1, y: 0, x: '-50%' }, exit: { opacity: 0, y: -10, x: '-50%' } },
        'bottom-end': { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } },
        left: { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 10 } },
        'left-center': { initial: { opacity: 0, x: 10, y: '-50%' }, animate: { opacity: 1, x: 0, y: '-50%' }, exit: { opacity: 0, x: 10, y: '-50%' } },
        'left-end': { initial: { opacity: 0, x: 10 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 10 } },
        right: { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -10 } },
        'right-center': { initial: { opacity: 0, x: -10, y: '-50%' }, animate: { opacity: 1, x: 0, y: '-50%' }, exit: { opacity: 0, x: -10, y: '-50%' } },
        'right-end': { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -10 } },
    }[placement]


    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    key="dropdown"
                    initial={animationVariants.initial}
                    animate={animationVariants.animate}
                    exit={animationVariants.exit}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className={`dropmenu ${placementClass} ${dropdownBgColor === 'dark' ? 'border border-transparent dark:border-gray-700' : 'border border-gray-300 dark:border-gray-700'}`}
                    style={{ width: customWidth }}
                    onClick={(autoClose === true || autoClose === 'inside' || autoClose === 'hover') ? () => setOpen(false) : undefined}
                >
                    <div className={`drop-content ${dropdownBgcolorClass} ${contentClasses}`}>
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

const DropdownLink = ({ className = '', children, ...props }) => {

    const { setOpen, autoClose } = useContext(DropDownContext)

    return (
        <div onClick={(autoClose == true || autoClose == 'inside' || autoClose == 'hover') ? () => setOpen(false) : () => null}>
            <Link
                preserveState
                preserveScroll
                {...props}
                className={
                    'dropdown-link' + `${className && ' ' + className}`
                }
            >
                {children}
            </Link>
        </div>
    )
}

Dropdown.Trigger = Trigger
Dropdown.Content = Content
Dropdown.Link = DropdownLink

export default Dropdown