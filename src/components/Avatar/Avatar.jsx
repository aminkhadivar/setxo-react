import Image from "../../contents/Image/Image"
import './Avatar.css'

export default function Avatar({ children, url, title, alt, size, height = '48', className = '', rounded = 'rounded', border = '', ...props }) {

    const DefaultAvatar = () => {
        return (
            <svg className="fill-gray-400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.0508 26C22.0508 23.3478 20.9972 20.8043 19.1218 18.9289C17.2465 17.0536 14.7029 16 12.0508 16C9.39862 16 6.85508 17.0536 4.97971 18.9289C3.10435 20.8043 2.05078 23.3478 2.05078 26L12.0508 26H22.0508Z" />
                <path d="M17 9C17 11.7614 14.7614 14 12 14C9.23858 14 7 11.7614 7 9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9Z" />
            </svg>
        )
    }

    const sizeClass = {
        xs: '24',
        sm: '32',
        md: '48',
        lg: '56',
        xl: '64',
        '2xl': '72',
    }[size]

    const borderClass = {
        light: 'border-light',
        gray: 'border-gray',
        dark: 'border-dark',
        primary: 'border-primary',
        success: 'border-success',
        danger: 'border-danger',
        warning: 'border-warning',
        info: 'border-info',
        purple: 'border-purple',
    }[border]

    return (
        <>
            {url ?
                <Image
                    {...props}
                    url={url}
                    className={`avatar` + `${className && ` ` + className}` + `${border && ` ` + borderClass}`}
                    alt={alt || 'User Avatar'}
                    title={title || 'User Avatar'}
                    rounded={rounded}
                    as="thumbnail"
                    thumbnailSize={size ? sizeClass : height} />
                :
                <Image
                    {...props}
                    children={children ? children : <DefaultAvatar />}
                    className={`avatar` + `${className && ` ` + className}` + `${border && ` ` + borderClass}`}
                    alt={alt || 'User Avatar'}
                    title={title || 'User Avatar'}
                    rounded={rounded}
                    as="svg"
                    height={size ? sizeClass : height}
                />
            }
        </>
    )
}