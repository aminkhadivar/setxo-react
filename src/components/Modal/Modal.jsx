import { Fragment , useState } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import CloseButton from "../CloseButton/CloseButton"
import './Modal.css'

export default function Modal({ content, trigger, title, footer, id, className = '', show = false, centered = '', bodyScrollable = '', contentScrollable = '', size = 'md', closeable = true, onClose = () => { }, ...props }) {

    const getBody = document.querySelector("body")

    const [showingModal, setshowingModal] = useState(false)
    const showModal = () => {
        setshowingModal(true)
        getBody.style.overflow = 'unset'
    }

    const close = () => {
        if (closeable) {
            setshowingModal(false) || onClose()
            getBody.style.removeProperty("overflow")
        } else {
            var element = document.querySelector('.modal-dialog')
            element.classList.add("backdrop-effect")
            setTimeout(function () {
                element.classList.remove("backdrop-effect")
            }, 250)
        }
    };

    const closeButton = () => {
        setshowingModal(false) || onClose()
        getBody.style.removeProperty("overflow")
    }

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-lg',
        lg: 'sm:max-w-3xl',
        xl: 'sm:max-w-5xl',
        full: 'w-full h-screen',
    }[size]

    return (
        <>
            {trigger &&
                <div onClick={showModal}>
                    {trigger}
                </div>
            }
            <Transition show={showingModal || show} as={Fragment}>
                <Dialog
                    as="div"
                    id={id}
                    className={`modal`}
                    onClose={close}
                >
                    <TransitionChild
                        as={Fragment}
                        enter="backdrop-motion"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="backdrop-motion"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className={`modal-backdrop ${closeable && 'cursor-pointer'}`} />
                    </TransitionChild>
                    <TransitionChild
                        as={Fragment}
                        enter="enter-motion"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="leave-motion"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className={`fixed inset-0 ${bodyScrollable && 'w-screen overflow-y-auto'}`}>
                            <div className={`flex ${centered && 'min-h-full'} items-center justify-center ${size === 'full' ? '' : 'py-10 px-4'}`}>
                                <DialogPanel
                                    className={`modal-dialog ${size === 'full' ? 'rounded-none' : 'rounded-lg'} ${maxWidthClass}`}
                                >
                                    {title &&
                                        <div className="modal-title">
                                            <h4>{title}</h4>
                                            <CloseButton color="transparent" size="md" rounded="full" onClick={closeButton} />
                                        </div>
                                    }
                                    <div {...props} className={'modal-content' + `${contentScrollable && ' modal-scrollable'}` + `${className && ` ` + className}`}>
                                        {content}
                                    </div>
                                    {footer &&
                                        <div className={'modal-footer'}>
                                            {footer}
                                        </div>
                                    }
                                </DialogPanel>
                            </div>
                        </div>
                    </TransitionChild>
                </Dialog>
            </Transition>
        </>
    )
}