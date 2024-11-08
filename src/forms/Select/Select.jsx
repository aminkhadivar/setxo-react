import { useState, useContext } from 'react'
import { FormContext } from "../Form/Form"
import Label from "../FormControl/Label"
import './Select.css'

export default function Select({ children, id, className = '', label = '', defaultValue, color = 'default', rounded = 'rounded', size = 'default', value, multiple, disabled = ('' || useContext(FormContext)), ...props }) {

    const [selected, setSelected] = useState(defaultValue)

    const onChangeSelect = (e) => {
        if (multiple) {
            const options = [...e.target.selectedOptions];
            const values = options.map(option => option.value);
            setSelected(values);
        } else {
            setSelected(e.target.value)
        }
    }

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

    const colorClass = {
        default: 'select-default',
        light: 'select-light',
        gray: 'select-gray',
        dark: 'select-dark',
        primary: 'select-primary',
        success: 'select-success',
        danger: 'select-danger',
        warning: 'select-warning',
        info: 'select-info',
        purple: 'select-purple',
        custom: ''
    }[color]

    return (
        <div className="form-select-wrapp">
            <Label htmlFor={id} value={label} />
            <select
                {...props}
                id={id}
                className={`form-select` + ` ${sizeClass}` + ` ${colorClass}` + ` ${roundedClass}` + `${disabled ? ' disabled' : ''}`}
                aria-label={label}
                value={selected}
                disabled={disabled}
                size={size}
                multiple={multiple}
                onChange={onChangeSelect}
            >
                {children}
            </select>
        </div>
    )
}