import { Link } from '@inertiajs/react'
import './Links.css'

export default function A({ href, as = '', className = '', color = '', underline = '', underlineOnHover = '', children, ...props }) {

    const colorClass = {
        light: 'link-light',
        gray: 'link-gray',
        dark: 'link-dark',
        primary: 'link-primary',
        success: 'link-success',
        danger: 'link-danger',
        warning: 'link-warning',
        info: 'link-info',
        purple: 'link-purple',
    }[color]

    const isExternal = as.toLowerCase() === 'external'

    return (
        isExternal ? (
            <a
                {...props}
                href={href}
                target="_blank"
                rel="noreferrer"
                className={`${color && colorClass}` + `${underline && ' underline'}` + `${className && ' ' + className}`}
            >
                {children}
            </a>
        ) : (
            <Link
                {...props}
                href={href}
                className={`${color && colorClass}` + `${underline && ' underline'}` + `${underlineOnHover && ' hover:underline'}` + `${className && ' ' + className}`}
            >
                {children}
            </Link>
        )
    )
}