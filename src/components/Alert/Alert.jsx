import { useState, Fragment } from "react"
import { Transition } from '@headlessui/react'
import CloseButton from "../CloseButton/CloseButton"
import './Alert.css'

export default function Alert({ id, className = '', children, closeButton = 'light', dimissable = '', rounded = 'rounded', color = '', borderColor = '', accentBorder = '', ...props }) {

    const [show, setShow] = useState(true)

    const colorClass = {
        light: 'alert-light',
        gray: 'alert-gray',
        dark: 'alert-dark',
        primary: 'alert-primary',
        success: 'alert-success',
        danger: 'alert-danger',
        warning: 'alert-warning',
        info: 'alert-info',
        purple: 'alert-purple',
        lightPrimary: 'alert-light-primary',
        lightSuccess: 'alert-light-success',
        lightDanger: 'alert-light-danger',
        lightWarning: 'alert-light-warning',
        lightInfo: 'alert-light-info',
        lightPurple: 'alert-light-purple',
    }[color]

    const closeButtonColorClass = {
        light: 'light',
        gray: 'gray',
        dark: 'dark',
        primary: 'primary',
        success: 'success',
        danger: 'danger',
        warning: 'warning',
        info: 'info',
        purple: 'purple',
        lightPrimary: 'primary',
        lightSuccess: 'success',
        lightDanger: 'danger',
        lightWarning: 'warning',
        lightInfo: 'info',
        lightPurple: 'purple',
    }[color]

    const borderColorClass = {
        light: 'alert-outline-light',
        gray: 'alert-outline-gray',
        dark: 'alert-outline-dark',
        primary: 'alert-outline-primary',
        success: 'alert-outline-success',
        danger: 'alert-outline-danger',
        warning: 'alert-outline-warning',
        info: 'alert-outline-info',
        purple: 'alert-outline-purple',
    }[borderColor]

    const roundedClass = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        rounded: 'rounded',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
    }[rounded]

    const accentBorderClass = {
        top: 'border-t-4',
        right: 'border-r-4',
        bottom: 'border-b-4',
        left: 'border-l-4',
    }[accentBorder]

    return (
        <Transition
            as={Fragment}
            show={show}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            <div
                {...props}
                id={id}
                className={`alert ${color && ` ` + colorClass}` + `${className && ` ` + className}` + `${borderColor && ` ` + borderColorClass}` + `${rounded && ` ` + roundedClass}` + `${accentBorder && ` ` + accentBorderClass}`
                }
                role="alert"
            >
                <div className="alert-content">
                    {children}
                </div>
                {dimissable &&
                    <CloseButton rounded={rounded} color={`${(color || borderColor) ? (closeButtonColorClass || borderColor) : 'light'}`} onClick={() => { setShow(false) }} />
                }
            </div>
        </Transition>
    )
}