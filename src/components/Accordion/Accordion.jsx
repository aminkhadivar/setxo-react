import { useEffect, useState, createContext, useContext, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown2 } from 'iconsax-reactjs'
import './Accordion.css'

export const AccordionContext = createContext()

const Accordion = ({ children, color = 'lightPrimary', className = '', data = [], multiple = '' }) => {
    const colorClass = {
        light: 'accordion-light',
        gray: 'accordion-gray',
        dark: 'accordion-dark',
        primary: 'accordion-primary',
        success: 'accordion-success',
        danger: 'accordion-danger',
        warning: 'accordion-warning',
        info: 'accordion-info',
        purple: 'accordion-purple',
        lightPrimary: 'accordion-light-primary',
        lightSuccess: 'accordion-light-success',
        lightDanger: 'accordion-light-danger',
        lightWarning: 'accordion-light-warning',
        lightInfo: 'accordion-light-info',
        lightPurple: 'accordion-light-purple',
        custom: '',
    }[color]

    const [items, setItems] = useState(
        data.map((item, index) => ({
            ...item,
            uniqueId: `${item.id || `accordion-item-${index + 1}`}`,
        }))
    )

    const handleClick = (id) => {
        setItems(
            items.map((item) =>
                item.uniqueId === id
                    ? { ...item, show: !item.show }
                    : multiple
                    ? item
                    : { ...item, show: false }
            )
        )
    }

    return (
        <AccordionContext.Provider value={{ className, children, multiple, colorClass }}>
            <div className={'accordion'}>
                {children || (
                    <>
                        {items.map(({ title, uniqueId, id, show, content }) => (
                            <div className="accordion-item" id={id || uniqueId} key={id || uniqueId}>
                                <button
                                    className={`accordion-button ${show ? `${colorClass}${className ? ` ${className}` : ''}` : 'accordion-default'}`}
                                    type="button"
                                    aria-expanded={show ? 'true' : 'false'}
                                    onClick={() => handleClick(uniqueId)}
                                >
                                    <div className="font-medium text-base">{title}</div>
                                    <div className="flex items-center">
                                        <ArrowDown2
                                            className={`h-5 w-5 ${show ? 'rotate-180' : 'text-gray-500 dark:text-gray-400'} transform duration-300`}
                                        />
                                    </div>
                                </button>
                                <AnimatePresence initial={false}>
                                    {show && (
                                        <motion.div
                                            className="overflow-hidden"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                        >
                                            <motion.div
                                                className="accordion-body"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                {content}
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </AccordionContext.Provider>
    )
}

const AccordionItem = ({ children, title, id, alwaysOpen }) => {
    const postAccordionId = useId()
    const { colorClass, className } = useContext(AccordionContext)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (alwaysOpen) setOpen(true)
    }, [])

    const toggleOpen = () => setOpen((prev) => !prev)

    return (
        <div className="accordion-item" id={id || postAccordionId} key={id || postAccordionId}>
            <button
                className={`accordion-button ${open ? `${colorClass}${className ? ` ${className}` : ''}` : 'accordion-default'}`}
                type="button"
                aria-expanded={open ? 'true' : 'false'}
                onClick={toggleOpen}
            >
                <div className="font-medium text-base">{title}</div>
                <div className="flex items-center">
                    <ArrowDown2
                        className={`h-5 w-5 ${open ? 'rotate-180' : 'text-gray-500 dark:text-gray-400'} transform duration-300`}
                    />
                </div>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <motion.div
                            className="accordion-body"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {children}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

Accordion.Item = AccordionItem

export default Accordion