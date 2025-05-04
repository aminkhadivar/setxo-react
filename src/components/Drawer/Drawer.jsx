import { Fragment, useState } from 'react'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import CloseButton from "../CloseButton/CloseButton"
import './Drawer.css'

export default function Drawer({ children, className = '', title, content, footer, trigger, show = false, width = '', placement = 'top', dir = '', closeable = true, onClose = () => { }, ...props }) {

    const getBody = document.querySelector("body")

    const [showingDrawer, setshowingDrawer] = useState(false)
    const showDrawer = () => {
        setshowingDrawer(true)
        getBody.style.overflow = 'unset'
    }

    const close = () => {
        if (closeable) {
            setshowingDrawer(false) || onClose()
        } else {
            var getDrawerDialog = document.querySelector('.drawer-dialog')
            getDrawerDialog.classList.add("backdrop-effect")
            setTimeout(() => {
                getDrawerDialog.classList.remove("backdrop-effect")
            }, 250)
        }
    }

    const closeButton = () => {
        setshowingDrawer(false) || onClose()
    }

    const alignClass = {
        default: {
            enter: "ease-out duration-300",
            enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
            enterTo: "opacity-100 translate-y-0 sm:scale-100",
            leave: "ease-in duration-300",
            leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
            leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        },
        top: {
            enter: "enter-motion",
            enterFrom: "-translate-y-full",
            enterTo: "translate-y-0",
            leave: "leave-motion",
            leaveFrom: "translate-y-0",
            leaveTo: "-translate-y-full"
        }
        ,
        bottom: {
            enter: "enter-motion",
            enterFrom: "translate-y-full",
            enterTo: "translate-y-0",
            leave: "leave-motion",
            leaveFrom: "translate-y-0",
            leaveTo: "translate-y-full"
        },
        left: {
            enter: "enter-motion",
            enterFrom: "-translate-x-full",
            enterTo: "translate-x-0",
            leave: "leave-motion",
            leaveFrom: "translate-x-0",
            leaveTo: "-translate-x-full"
        },
        right: {
            enter: "enter-motion",
            enterFrom: "translate-x-full",
            enterTo: "translate-x-0",
            leave: "leave-motion",
            leaveFrom: "translate-x-0",
            leaveTo: "translate-x-full"
        },
    }[placement]

    const placementClass = {
        top: 'drawer-dialog-top',
        bottom: 'drawer-dialog-bottom',
        left: 'drawer-dialog-left',
        right: 'drawer-dialog-right',
    }[placement]

    return (
        <>
            {trigger &&
                <div onClick={showDrawer}>
                    {trigger}
                </div>
            }
            <Transition show={showingDrawer || show} as={Fragment}>
                <Dialog
                    as="div"
                    className="drawer"
                    onClose={close}
                    dir={dir}
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
                        <div className={`drawer-backdrop ${closeable ? ' cursor-pointer' : ''}`} />
                    </TransitionChild>

                    <TransitionChild
                        as={Fragment}
                        placement={placement}
                        enter={`${alignClass.enter}`}
                        enterFrom={`${alignClass.enterFrom}`}
                        enterTo={`${alignClass.enterTo}`}
                        leave={`${alignClass.leave}`}
                        leaveFrom={`${alignClass.leaveFrom}`}
                        leaveTo={`${alignClass.leaveTo}`}
                    >
                        <DialogPanel {...props}
                            className={`drawer-dialog ${placementClass} ${width} ${className && ` ` + className}`}
                        >
                            {title &&
                                <div className="drawer-title">
                                    <h4>{title}</h4>
                                    <CloseButton color="transparent" size="md" rounded="full" onClick={closeButton} />
                                </div>
                            }
                            <div className="drawer-content">
                                {content}
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </Dialog>
            </Transition>
        </>
    )
}