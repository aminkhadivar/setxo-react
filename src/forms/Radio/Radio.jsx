import { useState, createContext, useContext } from 'react'
import Label from "../FormControl/Label"
import { FormContext } from "../Form/Form"
import './Radio.css'

const RadioContext = createContext()

const Radio = ({ children, name, color = 'default', size = '', onChange, defaultValue }) => {

    const [selectedValue, setSelectedValue] = useState(defaultValue || '');

    const handleChange = (value) => {
        setSelectedValue(value)
        onChange && onChange(value)
    }

    const colorClass = {
        default: '',
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
        default: '',
        lg: 'radio-lg',
    }[size]

    return (
        <RadioContext.Provider value={{ name, selectedValue, color, colorClass, size, sizeClass, onChange: handleChange }}>
            {children}
        </RadioContext.Provider>
    )
}

const RadioItem = ({ children, value, className = '', label, disabled = ('' || useContext(FormContext)), ...props }) => {

    const { name, selectedValue, onChange, color, colorClass, size, sizeClass } = useContext(RadioContext)

    const isChecked = selectedValue === value

    return (
        <div className="form-radio">
            <Label className={`${disabled ? ' disabled' : ''}`}>
                <input
                    {...props}
                    type="radio"
                    name={name}
                    value={value}
                    className={`form-radio-input` + `${className && ` ` + className}` + `${color && ` ` + colorClass}` + `${size && ` ` + sizeClass}`
                    }
                    checked={isChecked}
                    disabled={disabled}
                    onChange={() => onChange(value)}
                />
                {children}
            </Label>
        </div>
    )
}

Radio.Item = RadioItem

export default Radio