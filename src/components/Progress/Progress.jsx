import './Progress.css'

export default function Progress({ className = '', disabled = '', height = '16', children, withLabel = false, striped = '', animated = '', color = 'primary', rounded = 'full', value = '60', ...props }) {

    const colorClass = {
        light: 'progress-bar-light',
        gray: 'progress-bar-gray',
        dark: 'progress-bar-dark',
        primary: 'progress-bar-primary',
        success: 'progress-bar-success',
        danger: 'progress-bar-danger',
        warning: 'progress-bar-warning',
        info: 'progress-bar-info',
        purple: 'progress-bar-purple',
    }[color]

    const roundedClass = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        rounded: 'rounded',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
    }[rounded]

    const indeterminateClass = {
        light: 'progress-indeterminate-light',
        gray: 'progress-indeterminate-gray',
        dark: 'progress-indeterminate-dark',
        primary: 'progress-indeterminate-primary',
        success: 'progress-indeterminate-success',
        danger: 'progress-indeterminate-danger',
        warning: 'progress-indeterminate-warning',
        info: 'progress-indeterminate-info',
        purple: 'progress-indeterminate-purple',
    }[color]

    return (
        <div className={`progress ${value == null ? `${indeterminateClass}` : ''}` + ` ${roundedClass}`}
            style={{ height: `${height}px` }}
        >
            <div
                {...props}
                className={
                    `progress-bar ${color && colorClass} ${striped && 'progress-bar-striped'} ${animated && 'progress-bar-animated'}` + ` ${roundedClass}` + `${className && ` ` + className}`
                }
                style={{ width: `${value}%`, height: `${height}px`, maxWidth: '100%' }}
                role="progressbar"
            >
                {withLabel &&
                    <div className="progress-label">
                        {`${value}%`}
                    </div>
                }
            </div>
        </div>
    )
}