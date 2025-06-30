import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import './Popover.css'

export default function Popover({
    content,
    className = '',
    children,
    placement = 'top',
    color = 'default',
    dir = '',
    closeable = false,
}) {
    const [show, setShow] = useState(false)

    const togglePopover = () => setShow(prev => !prev)
    const closeByClickOutside = () => closeable && setShow(false)

    const placementClass = {
        top: 'popover-top',
        right: 'popover-right',
        bottom: 'popover-bottom',
        left: 'popover-left',
    }[placement]

    const colorClass = {
        default: 'popover-default',
        light: 'bg-gray-200/90 text-gray-700',
        gray: 'bg-gray-500/90 text-gray-100',
        dark: 'popover-dark',
        primary: 'bg-blue-800/90 text-gray-100',
        success: 'bg-green-800/90 text-gray-100',
        danger: 'bg-red-800/90 text-gray-100',
        warning: 'bg-amber-600/90 text-gray-100',
        info: 'bg-cyan-600/90 text-gray-100',
        custom: '',
    }[color]

    const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 1024

    const motionVariants = {
        top: {
            initial: { opacity: 0, y: 10, scale: 0.95, x: isMobile() ? '0' : '-50%' },
            animate: { opacity: 1, y: 0, scale: 1, x: isMobile() ? '0' : '-50%' },
            exit: { opacity: 0, y: 10, scale: 0.95, x: isMobile() ? '0' : '-50%' },
        },
        right: {
            initial: { opacity: 0, x: -10, scale: 0.95, y: isMobile() ? '0' : '-50%' },
            animate: { opacity: 1, x: 0, scale: 1, y: isMobile() ? '0' : '-50%' },
            exit: { opacity: 0, x: -10, scale: 0.95, y: isMobile() ? '0' : '-50%' },
        },
        bottom: {
            initial: { opacity: 0, y: -10, scale: 0.95, x: isMobile() ? '0' : '-50%' },
            animate: { opacity: 1, y: 0, scale: 1, x: isMobile() ? '0' : '-50%' },
            exit: { opacity: 0, y: -10, scale: 0.95, x: isMobile() ? '0' : '-50%' },
        },
        left: {
            initial: { opacity: 0, x: 10, scale: 0.95, y: isMobile() ? '0' : '-50%' },
            animate: { opacity: 1, x: 0, scale: 1, y: isMobile() ? '0' : '-50%' },
            exit: { opacity: 0, x: 10, scale: 0.95, y: isMobile() ? '0' : '-50%' },
        },
    }[placement]

    return (
        <>
            <div className="relative inline-block">
                <div className="popover-trigger" onClick={togglePopover}>
                    {children}
                </div>

                <AnimatePresence>
                    {show && (
                        <motion.div
                            key="popover"
                            initial={motionVariants.initial}
                            animate={motionVariants.animate}
                            exit={motionVariants.exit}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className={`popover ${placementClass} ${colorClass} ${className}`}
                        >
                            <div className="popover-arrow" />
                            <div className="popover-content" dir={dir}>
                                {content}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {closeable && show && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={closeByClickOutside}
                />
            )}
        </>
    )
}