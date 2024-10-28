import { useState, useContext } from 'react'
import Label from "../FormControl/Label"
import { FormContext } from "../Form/Form"
import './Radio.css'
export default function Checkbox({ children, value, id, className = '', color = '', size = '', label, disabled = ('' || useContext(FormContext)), defaultChecked = false, ...props }) {

    const [checked, setChecked] = useState(defaultChecked)

    const toggleCheked = (e) => {
        setChecked(e.target.value)
    }

    const colorClass = {
        light: 'radio-light',
        gray: 'radio-gray',
        dark: 'radio-dark',
        primary: 'radio-primary',
        success: 'radio-success',
        danger: 'radio-danger',
        warning: 'radio-warning',
        info: 'radio-info',
        purple: 'radio-purple',
    }[color]

    const sizeClass = {
        sm: 'radio-sm',
        lg: 'radio-lg',
    }[size]

    return (
        <div className="form-radio">
            <Label className={`${disabled ? ' disabled' : ''}`}>
                <input
                    {...props}
                    type="radio"
                    value={value}
                    className={`form-radio-input` + `${className && ` ` + className}` + `${color && ` ` + colorClass}` + `${size && ` ` + sizeClass}`
                    }
                    defaultChecked={checked}
                    disabled={disabled}
                    onChange={toggleCheked}
                />
                {children}
            </Label>
        </div>
    )
}