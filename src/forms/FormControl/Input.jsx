import { forwardRef, useEffect, useRef, useState, useContext } from 'react'
import './FormControl.css'
import { FormContext } from "../Form/Form"

export default forwardRef(function Input({ as = 'text', type = 'text', className = '', rounded = 'rounded', size = 'default', color = '', isFocused = false, placeholder, value, disabled = ('' || useContext(FormContext)), readOnly = '', onChange = () => { }, ...props }, ref) {

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
        dark: 'form-control-dark',
        light: 'form-control-light',
    }[color]

    return (
        <input
            {...props}
            type={type}
            className={`${asClass}` + `${color && ` ` + colorClass}` + `${size && ` ` + sizeClass}` +
                `${className && ` ` + className}` + ` ${roundedClass}` + `${disabled ? `${readOnly ? ' disabled-readonly' : ' disabled'}` : ''}`
            }
            ref={input}
            value={inputValue || ''}
            onChange={onChangeInput}
            placeholder={placeholder}
            disabled={disabled}
        />
    )
})