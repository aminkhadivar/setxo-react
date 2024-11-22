import { useState, useContext, useId } from 'react'
import Label from "../FormControl/Label"
import { FormContext } from "../Form/Form"
import './Checkbox.css'

export default function Checkbox({ id, className = '', color = '', label, disabled = ('' || useContext(FormContext)), size = '', defaultChecked = false, darkTick = '', ...props }) {

    const postCheckedId = useId()

    const [checked, setChecked] = useState(defaultChecked)

    const toggleCheked = () => {
        setChecked(!checked)
    }

    const colorClass = {
        light: 'checkbox-light',
        gray: 'checkbox-gray',
        dark: 'checkbox-dark',
        primary: 'checkbox-primary',
        success: 'checkbox-success',
        danger: 'checkbox-danger',
        warning: 'checkbox-warning',
        info: 'checkbox-info',
        purple: 'checkbox-purple',
    }[color]

    const sizeClass = {
        sm: 'checkbox-sm',
        lg: 'checkbox-lg',
    }[size]

    return (
        <div className="form-check">
            <Label htmlFor={id || postCheckedId} value={label} className={`${disabled ? ' disabled' : ''}`}>
                <input
                    {...props}
                    type="checkbox"
                    id={id || postCheckedId}
                    className={`form-check-input` + `${className && ` ` + className}` + `${color && ` ` + colorClass}` + `${size && ` ` + sizeClass}` + `${darkTick && ` form-tick-black`}`}
                    defaultChecked={checked}
                    disabled={disabled}
                    onChange={toggleCheked}
                />
            </Label>
        </div>
    )
}