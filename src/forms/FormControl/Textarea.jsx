import { forwardRef, useEffect, useRef, useState, useContext } from 'react'
import { FormContext } from "../Form/Form"
import './FormControl.css'

export default forwardRef(function Textarea({ type = 'text' , color = '', className = '', rounded = 'rounded', rows = '3', resizeabled = false, isFocused = false, placeholder, value, disabled = ('' || useContext(FormContext)), ...props }, ref) {

    const [textareaValue, setTextareaValue] = useState(value)

    const textarea = ref ? ref : useRef()

    useEffect(() => {
        if (isFocused) {
            textarea.current.focus()
        }
    }, [])

    const roundedClass = {
        none: 'rounded-none',
        sm: 'rounded-sm',
        rounded: 'rounded',
        md: 'rounded-md',
        lg: 'rounded-lg',
    }[rounded]

    const colorClass = {
        default: 'form-control-default',
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
        <textarea
            {...props}
            type={type}
            className={`form-control` + `${color && ` ` + colorClass}` +
                `${className && ` ` + className}` + ` ${roundedClass}` + `${disabled ? ' disabled'
                : ''}` + `${resizeabled ? ' resize' : ' resize-none'}`
            }
            ref={textarea}
            rows={rows}
            value={textareaValue || ''}
            onChange={e => setTextareaValue(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
        />
    )
})