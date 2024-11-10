import { forwardRef, useEffect, useRef, useState, useContext, useId } from 'react'
import './FormControl.css'
import { FormContext } from "../Form/Form"
import Label from "./Label"

export default forwardRef(function Input({ as = 'text', label, id, type = 'text', className = '', rounded = 'rounded', size = 'default', color = '', isFocused = false, placeholder, value, disabled = ('' || useContext(FormContext)), readOnly = '',required, onChange = () => { }, ...props }, ref) {

    const postInputId = useId()

    const asClass = {
        text: 'form-control',
        plaintext: 'form-control-plaintext',
    }[as]

    const input = ref ? ref : useRef()

    useEffect(() => {
        if (isFocused) {
            input.current.focus()
        }
    }, [])

    const [inputValue, setInputValue] = useState(value)

    const onChangeInput = (e) => {
        if (!readOnly) {
            setInputValue(e.target.value) || onChange(e)
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
        sm: 'form-control-sm',
        default: 'form-control-default',
        lg: 'form-control-lg',
    }[size]

    const colorClass = {
        light: 'form-control-light',
        gray: 'form-control-gray',
        dark: 'form-control-dark',
        primary: 'form-control-primary',
        success: 'form-control-success',
        danger: 'form-control-danger',
        warning: 'form-control-warning',
        info: 'form-control-info',
        purple: 'form-control-purple',
        custom: ''
    }[color]

    return (
        <div className="form-group">
            {label &&
                <Label className={`${required && ` required`}`} htmlFor={disabled ? id : postInputId} value={label} />
            }
            <input
                {...props}
                type={type}
                id={label ? postInputId : id}
                className={`${asClass}` + `${color && ` ` + colorClass}` + `${size && ` ` + sizeClass}` +
                    `${className && ` ` + className}` + ` ${roundedClass}` + `${disabled ? `${readOnly ? ' disabled-readonly' : ' disabled'}` : ''}`
                }
                ref={input}
                value={inputValue || ''}
                onChange={onChangeInput}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
            />
        </div>
    )
})