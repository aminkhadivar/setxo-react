import { forwardRef, useEffect, useRef, useState, useContext, useId } from 'react'
import { FormContext } from "../Form/Form"
import Label from "./Label"
import './FormControl.css'

export default forwardRef(function Textarea({ type = 'text', label, id, color = '', className = '', rounded = 'rounded', rows = '3', resizeabled = false, isFocused = false, placeholder, value,required, disabled = ('' || useContext(FormContext)), ...props }, ref) {

    const [textareaValue, setTextareaValue] = useState(value)

    const postTextareaId = useId()

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
        <div className="form-group">
            {label &&
                <Label className={`${required && ` required`}`} htmlFor={disabled ? id : postTextareaId} value={label} />
            }
            <textarea
                {...props}
                type={type}
                id={label ? postTextareaId : id}
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
                required={required}
            />
        </div>
    )
})