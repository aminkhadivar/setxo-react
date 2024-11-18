import { useState, useContext , useId } from 'react'
import Label from "../FormControl/Label"
import { FormContext } from "../Form/Form"
import './Switch.css'
export default function Switch({ children, id, className = '', color = '', label, disabled = ('' || useContext(FormContext)), size = '', defaultChecked = false, reverse = '', ...props }) {

    const postSwitchId = useId()

    const [checked, setChecked] = useState(defaultChecked)

    const toggleSwitch = () => {
        setChecked(!checked)
    }

    const colorClass = {
        default: 'switch-default',
        light: 'switch-light',
        gray: 'switch-gray',
        dark: 'switch-dark',
        primary: 'switch-primary',
        success: 'switch-success',
        danger: 'switch-danger',
        warning: 'switch-warning',
        info: 'switch-info',
        purple: 'switch-purple',
        custom: ''
    }[color]

    const sizeClass = {
        sm: 'switch-sm',
        lg: 'switch-lg',
    }[size]

    return (
        <div className="form-switch">
            <Label htmlFor={postSwitchId || id} value={label} className={`${reverse && ` switch-reverse`}` + `${disabled ? ' disabled' : ''}`}>
                <input
                    {...props}
                    type="checkbox"
                    id={postSwitchId || id}
                    className={`form-switch-input peer`}
                    role="switch"
                    defaultChecked={checked}
                    disabled={disabled}
                    onChange={toggleSwitch}
                />
                <span className={`toggle-switch` + `${className && ` ` + className}` + `${color ? ` ` + colorClass : ' switch-default'}` + `${size && ` ` + sizeClass}`}></span>
            </Label>
            {children}
        </div>
    )
}