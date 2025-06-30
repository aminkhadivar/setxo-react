import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import CloseButton from '../CloseButton/CloseButton'
import Typography from '../../contents/Typography/Typography'
import './Drawer.css'

export default function Drawer({
    children,
    className = '',
    title,
    content,
    footer,
    trigger,
    show = false,
    width = '',
    placement = 'right',
    dir = '',
    closeable = true,
    onClose = () => { },
    ...props
}) {
    const [isOpen, setIsOpen] = useState(show)

    useEffect(() => {
        setIsOpen(show);
    }, [show]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        };
    }, [isOpen])

    useEffect(() => {
        if (!isOpen) return

        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && closeable) {
                close()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, closeable])

    const showDrawer = () => {
        setIsOpen(true)
    }

    const close = () => {
        if (closeable) {
            setIsOpen(false) || onClose()
        } else {
            var getDrawerDialog = document.querySelector('.drawer-dialog')
            getDrawerDialog.classList.add("backdrop-effect")
            setTimeout(() => {
                getDrawerDialog.classList.remove("backdrop-effect")
            }, 250)
        }
    }

    const closeButton = () => {
        setIsOpen(false) || onClose()
    }

    const drawerVariants = {
        right: {
            hidden: { opacity: 0, x: 100 },
            visible: { opacity: 1, x: 0 },
        },
        left: {
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
        },
        top: {
            hidden: { opacity: 0, y: -100 },
            visible: { opacity: 1, y: 0 },
        },
        bottom: {
            hidden: { opacity: 0, y: 100 },
            visible: { opacity: 1, y: 0 },
        },
    }

    const placementClasses = {
        right: "top-0 right-0 h-full",
        left: "top-0 left-0 h-full",
        top: "top-0 left-0 w-full",
        bottom: "bottom-0 left-0 w-full",
    }[placement]


    const drawerContent = (
        <AnimatePresence>
            {(isOpen || show) && (
                <div
                    className="drawer"
                    dir={dir}
                    role="dialog"
                    tabIndex="-1"
                    aria-modal={isOpen ? 'true' : 'false'}
                >
                    <motion.div
                        className="fixed inset-0 z-40 bg-black/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease: 'easeInOut', duration: 0.3 }}
                    >
                        <div className={`drawer-backdrop ${closeable ? ' cursor-pointer' : ''}`} onClick={close} />
                    </motion.div>
                    <motion.div
                        className={`fixed z-50 ${placementClasses}`}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={drawerVariants[placement]}
                        transition={{ ease: 'easeInOut', duration: 0.3 }}
                        key="drawer-panel"
                    >
                        <div
                            className={`drawer-dialog drawer-dialog-${placement} ${width} ${className}`}
                            {...props}
                        >
                            {title && (
                                <div className="drawer-title">
                                    <Typography as="heading" variant="h4">{title}</Typography>
                                    <CloseButton
                                        color="transparent"
                                        size="md"
                                        rounded="full"
                                        onClick={closeButton}
                                        aria-label="Close Drawer"
                                    />
                                </div>
                            )}
                            <div className="drawer-content">{content || children}</div>

                            {footer && <div className="drawer-footer">{footer}</div>}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )

    return (
        <>
            {trigger && <div onClick={showDrawer}>{trigger}</div>}
            {createPortal(drawerContent, document.body)}
        </>
    )
}