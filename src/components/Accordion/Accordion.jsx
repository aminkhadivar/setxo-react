import { useEffect, useState, createContext, useContext, useId } from 'react'
import { Transition } from '@headlessui/react'
import { ArrowDown2 } from 'iconsax-react'
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
            uniqueId: `${item.id || `accordion-item-${index + 1}`}`, // Append the accordion ID to each item ID
        }))
    )

    const handleClick = (id) => {
        setItems(
            items.map((item) =>
                item.uniqueId === id ? { ...item, show: !item.show } : { ...item, show: false }
            )
        )
    }

    return (
        <AccordionContext.Provider value={{ className, children, multiple, colorClass }}>
            <div className={'accordion'}>
                {children ||
                    <>
                        {/* Use data array */}
                        {items.map(({ title, uniqueId, id, show, content }) => (
                            <div className="accordion-item"
                                id={id || uniqueId}
                                key={id || uniqueId}
                            >
                                <button
                                    className={`accordion-button ${show ? (colorClass + (className && ` ${className}`)) : 'accordion-default'}`}
                                    type="button"
                                    aria-expanded={show ? 'true' : 'false'}
                                    show={show.toString()}
                                    onClick={() => handleClick(uniqueId)}
                                >
                                    <div className="font-medium text-base">{title}</div>
                                    <div className="flex items-center">
                                        <ArrowDown2
                                            className={`h-5 w-5 ${show ? 'rotate-180' : 'text-gray-500 dark:text-gray-400'} transform duration-300`}
                                        />
                                    </div>
                                </button>
                                <Transition
                                    show={show}
                                    enter="enter-motion"
                                    enterFrom="transform max-h-0"
                                    enterTo="transform max-h-screen"
                                    leave="leave-motion"
                                    leaveFrom="transform max-h-screen"
                                    leaveTo="transform max-h-0"
                                >
                                    <div className="overflow-hidden">
                                        <div className="accordion-body">
                                            {content}
                                        </div>
                                    </div>
                                </Transition>
                            </div>
                        ))}
                    </>
                }
            </div>
        </AccordionContext.Provider>
    )
}

const AccordionItem = ({ children, title, id, alwaysOpen }) => {

    const postAccordionId = useId()

    const { multiple, colorClass, className } = useContext(AccordionContext)

    const [open, setOpen] = useState(false)

    useEffect(() => {
        if (alwaysOpen) {
            setOpen(true)
        }
    }, [])

    const toggleOpen = () => {
        setOpen((previousState) => !previousState)
    }

    return (
        <>
            {/* Multiple props for Accordion component */}
            <div
                className="accordion-item"
                id={id || postAccordionId}
                key={id || postAccordionId}>
                <button
                    className={`accordion-button ${open ? (colorClass + (className && ` ${className}`)) : 'accordion-default'}`}
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
                <Transition
                    show={open}
                    enter="enter-motion"
                    enterFrom="transform max-h-0"
                    enterTo="transform max-h-screen"
                    leave="leave-motion"
                    leaveFrom="transform max-h-screen"
                    leaveTo="transform max-h-0"
                >
                    <div className="overflow-hidden">
                        <div className="accordion-body">
                            {children}
                        </div>
                    </div>
                </Transition>
            </div>
        </>
    )
}

Accordion.Item = AccordionItem

export default Accordion