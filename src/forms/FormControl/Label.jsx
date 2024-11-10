import './Label.css'

export default function Label({ value, required = '', className = '', children, ...props }) {
    return (
        <label
            {...props}
            className={`form-label` + `${className && ` ` + className}` + `${required && ` required`}`}>
            {children}
            {value}
        </label>
    );
}
