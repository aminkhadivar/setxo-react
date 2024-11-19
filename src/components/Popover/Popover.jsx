import { useState, Fragment } from "react"
import { Transition } from '@headlessui/react'
import './Popover.css'

export default function Popover({ content, className = '', children, placement = 'top', color = 'dark', closeable = false }) {

    const [show, setShow] = useState(false)

    const showingPopover = () => {
        setShow((previousState) => !previousState)
    };

    const closeByClick = () => {
        if (closeable) {
            setShow(false)
        }
    };

    const placementClass = {
        top: 'popover-top',
        right: 'popover-right',
        bottom: 'popover-bottom',
        left: 'popover-left',
    }[placement]

    const translateClass = {
        top: 'translate-y-5',
        right: '-translate-x-5',
        bottom: '-translate-y-5',
        left: 'translate-x-5',
    }[placement]

    const colorClass = {
        light: 'bg-gray-200/90 text-gray-700',
        gray: 'bg-gray-500/90 text-gray-100',
        dark: 'bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-lg text-gray-800 dark:text-gray-100',
        primary: 'bg-blue-800/90 text-gray-100',
        success: 'bg-green-800/90 text-gray-100',
        danger: 'bg-red-800/90 text-gray-100',
        warning: 'bg-amber-600/90 text-gray-100',
        info: 'bg-cyan-600/90 text-gray-100',
        custom: '',
    }[color]

    return (
        <>
            <div className="relative inline-block">
                <div onClick={showingPopover}>
                    {children}
                </div>
                <Transition
                    as={Fragment}
                    show={show}
                    enter="ease-in-out duration-300"
                    enterFrom={`opacity-0 sm:scale-95 ${translateClass}`}
                    enterTo="opacity-100 sm:scale-100 translate-y-0"
                    leave="ease-in-out duration-200"
                    leaveFrom="opacity-100 sm:scale-100 translate-y-0"
                    leaveTo={`opacity-0 sm:scale-95 ${translateClass}`}
                >
                    <div className={`popover ${placementClass}` + ` ${colorClass}` + className} >
                        <div className="popover-content">
                            {content}
                        </div>
                    </div>
                </Transition>
            </div>
            {closeable && show && <div className="fixed inset-0 z-40" onClick={closeByClick}></div>}
        </>
    )
}