import { createContext, useContext } from 'react'
import { Link } from '@inertiajs/react'
import './Pagination.css'

const PaginationContext = createContext()

const Pagination = ({ children, className = '', color = 'light', rounded = 'rounded', size = 'default' }) => {
    return (
        <PaginationContext.Provider value={{ className, children, color, rounded , size }}>
            <nav aria-label="navigation">
                <ul className={'pagination' + (className && ` ${className}`)}>
                    {children}
                </ul>
            </nav>
        </PaginationContext.Provider>
    );
};

const PaginationItem = ({ children, className = '', active = '', disabled = '', href, ...props }) => {

    const { color, rounded , size } = useContext(PaginationContext)

    const colorClass = {
        light: 'page-link-light',
        gray: 'page-link-gray',
        dark: 'page-link-dark',
        primary: 'page-link-primary',
        success: 'page-link-success',
        danger: 'page-link-danger',
        warning: 'page-link-warning',
        info: 'page-link-info',
        purple: 'page-link-purple',
    }[color]

    const roundedClass = {
        none: 'rounded-none',
        rounded: 'rounded',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
    }[rounded]

    const sizeClass = {
        sm: 'text-sm px-3 h-8',
        md: 'px-3 h-9',
        default: 'px-4 h-10',
        lg: 'text-lg px-4 h-11',
        xl: 'text-xl px-5 h-12',
    }[size]

    return (
        <li
            {...props}
            className={'page-item' + `${active && ' active'}` + `${disabled && ' disabled'}`}
        >
            {href
                ?
                <>
                    <Link
                        className={`page-link ${colorClass} ${sizeClass} ` + className + roundedClass}
                        href={href}
                    >
                        {children}
                    </Link>
                </>
                :
                <>
                    <div className={`page-link ${colorClass} ${sizeClass} ` + className + roundedClass}>
                        {children}
                    </div>
                </>
            }
        </li>
    )
}

Pagination.Item = PaginationItem

export default Pagination