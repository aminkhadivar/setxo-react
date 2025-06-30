import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import CloseButton from "../CloseButton/CloseButton"
import Typography from '../../contents/Typography/Typography'
import './Modal.css'

export default function Modal({
    content,
    trigger,
    title,
    footer,
    id,
    className = '',
    dir = '',
    show = false,
    centered = '',
    bodyScrollable = '',
    contentScrollable = '',
    size = 'md',
    closeable = true,
    onClose = () => { },
    ...props
}) {
    const [showingModal, setShowingModal] = useState(false)
    const isOpen = showingModal || show

    const showModal = () => {
        setShowingModal(true)
        document.body.style.overflow = 'hidden'
    }

    const close = () => {
        if (closeable) {
            setShowingModal(false) || onClose()
            document.body.style.overflow = 'unset'
        } else {
            var element = document.querySelector('.modal-dialog')
            element.classList.add("backdrop-effect")
            setTimeout(function () {
                element.classList.remove("backdrop-effect")
            }, 250)
        }
    };

    const closeButton = () => {
        setShowingModal(false) || onClose()
        document.body.style.overflow = 'unset'

    }

    const sizes = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-lg',
        lg: 'sm:max-w-3xl',
        xl: 'sm:max-w-5xl',
        full: 'w-full h-screen',
    }

    useEffect(() => {
        if (!isOpen) return
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && closeable) {
                close()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, closeable])

    const modalContent = (
        <AnimatePresence>
            {(isOpen || show) && (
                <div
                    className={`modal ${bodyScrollable && 'w-screen  overflow-y-auto'}`}
                    dir={dir}
                    onClose={close}
                    id={id}
                >
                    <div className={`relative`}>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div
                                className={`modal-backdrop ${closeable ? 'cursor-pointer' : ''}`}
                                onClick={close}
                            />
                        </motion.div>

                        {/* Modal Container */}
                        <motion.div className={`flex ${centered && 'min-h-screen'} items-center justify-center ${size === 'full' ? '' : 'py-10 px-4'}`}
                            initial={{ opacity: 0, translateY: '20px' }}
                            animate={{ opacity: 1, translateY: '0' }}
                            exit={{ opacity: 0, translateY: '20px' }}
                            transition={{ ease: 'easeInOut' }}
                        >
                            <div
                                className={`modal-dialog ${size === 'full' ? 'rounded-none' : 'rounded-lg'} ${sizes[size]} ${className}`}
                            >
                                {/* Title */}
                                {title && (
                                    <div className="modal-title">
                                        <Typography as="heading" variant="h4">{title}</Typography>
                                        <CloseButton color="transparent" size="md" rounded="full" onClick={closeButton} />
                                    </div>
                                )}

                                {/* Content */}
                                <div
                                    {...props}
                                    className={'modal-content' + `${contentScrollable && ' modal-scrollable'}` + `${className ? ` ${className}` : ''}`}
                                >
                                    {content}
                                </div>

                                {/* Footer */}
                                {footer && (
                                    <div className="modal-footer">
                                        {footer}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    )

    {/* Trigger element */ }
    return (
        <>
            {trigger && <div onClick={showModal}>{trigger}</div>}
            {createPortal(modalContent, document.body)}
        </>
    )
}