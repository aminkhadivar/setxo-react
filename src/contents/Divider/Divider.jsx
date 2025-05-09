import './Divider.css'

export default function Divider({ children, className = '', color = 'default', align = 'center', type = 'solid', size = 'sm', orientation = 'horizontal', ...props }) {

    const colorClass = {
        default: 'divider-default',
        light: 'divider-light',
        gray: 'divider-gray',
        dark: 'divider-dark',
        primary: 'divider-primary',
        success: 'divider-success',
        danger: 'divider-danger',
        warning: 'divider-warning',
        info: 'divider-info',
        purple: 'divider-purple',
    }[color]

    const alignClass = {
        right: 'divider-right',
        center: 'divider-center',
        left: 'divider-left',
    }[align]

    const typeClass = {
        solid: 'divider-solid',
        dubble: 'divider-dubble',
        dotted: 'divider-dotted',
        dashed: 'divider-dashed',
    }[type]

    const sizeClass = {
        sm: 'divider-sm',
        md: 'divider-md',
        lg: 'divider-lg',
        xl: 'divider-xl',
    }[size]

    const orientationClass = {
        horizontal: 'divider-horizontal',
        vertical: 'divider-vertical',
    }[orientation]

    return (
        <>
            {children ?
                <div className={`divider-wrapper` + `${color && ` ` + colorClass}` + `${className && ' ' + className}` + `${align && ` ` + alignClass}` + `${type && ` ` + typeClass}` + `${size && ` ` + sizeClass}`}>
                    <div className="divider-content">{children}</div>
                </div>
                :
                <hr {...props}
                    className={`${orientationClass}` + `${color && ` ` + colorClass}` + `${className && ' ' + className}` + `${type && ` ` + typeClass}` + `${size && ` ` + sizeClass}`} />
            }
        </>
    )
}