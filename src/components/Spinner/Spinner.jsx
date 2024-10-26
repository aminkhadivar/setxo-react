import './Spinner.css'

export default function Spinner({ as = 'border', className = '', color = '', size = 'default', ...props }) {

    const colorClass = {
        default: 'spinner-default',
        light: 'spinner-light',
        gray: 'spinner-gray',
        dark: 'spinner-dark',
        primary: 'spinner-primary',
        success: 'spinner-success',
        danger: 'spinner-danger',
        warning: 'spinner-warning',
        info: 'spinner-info',
        purple: 'spinner-purple',
        custom: ''
    }[color]

    const sizeClass = {
        sm: 'spinner-sm',
        default: '',
        lg: 'spinner-lg',
    }[size]

    return (
        <>
            <div
                {...props}
                className={`${as === 'border' ? 'spinner-border' : 'spinner-grow'}` + `${className && ` ` + className}` + `${color ? ` ` + colorClass : ' spinner-default'}` + `${size && ` ` + sizeClass}`}
                role="status"
            >
                <span className="hidden">Loading...</span>
            </div>
        </>
    )
}