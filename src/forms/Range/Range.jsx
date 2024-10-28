
import { useState, useContext } from 'react'
import Label from "../FormControl/Label"
import { FormContext } from "../Form/Form"
import './Range.css'

export default function Range({ max = '100', min = '0', step, value, className = '', color = '', label, disabled = ('' || useContext(FormContext)), size = '', reverse = '', ...props }) {

    const [inputValue, setInputValue] = useState(value)

    const onChangeInput = (e) => {
        setInputValue(e.target.value)
    }

    const percent = ((inputValue - min) * 100) / (max - min)

    const colorClass = {
        default: 'range-default',
        light: 'range-light',
        gray: 'range-gray',
        dark: 'range-dark',
        primary: 'range-primary',
        success: 'range-success',
        danger: 'range-danger',
        warning: 'range-warning',
        info: 'range-info',
        purple: 'range-purple',
        custom: ''
    }[color]

    const thumbColorClass = {
        default: '',
        light: 'form-range-input-light',
        gray: 'form-range-input-gray',
        dark: 'form-range-input-dark',
        primary: 'form-range-input-primary',
        success: 'form-range-input-success',
        danger: 'form-range-input-danger',
        warning: 'form-range-input-warning',
        info: 'form-range-input-info',
        purple: 'form-range-input-purple',
        custom: ''
    }[color]

    const sizeClass = {
        sm: 'range-sm',
        lg: 'range-lg',
    }[size]

    return (
        <div className="form-range">
            <Label value={label} className={`${disabled ? ' disabled' : ''}`}>
                <div className={`form-range-slider` + `${size && ` ` + sizeClass}`}>
                    <div className={`range-box`}></div>
                    <input
                        {...props}
                        type="range"
                        value={inputValue}
                        min={min}
                        max={max}
                        step={step}
                        onChange={onChangeInput}
                        className={`form-range-input` + `${color && ` ` + thumbColorClass}`}
                    />

                    <div className={`form-range-fill` + `${className && ` ` + className}` + `${color ? ` ` + colorClass : ' range-default'}`} style={{ width: `${percent}%` }}></div>
                </div>
            </Label>
        </div>
    )
}