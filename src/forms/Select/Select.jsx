import { useContext } from 'react'
import { FormContext } from "../Form/Form"
import './Select.css'

export default function Select({ children, id, className = '', label = '', defaultValue, rounded = 'rounded', size = 'default', value, disabled = ('' || useContext(FormContext)), ...props }) {

    const roundedClass = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        rounded: 'rounded',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
    }[rounded]

    const sizeClass = {
        sm: 'form-select-sm',
        default: 'form-select-default',
        lg: 'form-select-lg',
    }[size]

    return (
        <select {...props} id={id} className={`form-select` + ` ${sizeClass}` + ` ${roundedClass}` + `${disabled ? ' disabled' : ''}`} aria-label={label} defaultValue={defaultValue} disabled={disabled} size={size}>
            {children}
        </select>
    )
}