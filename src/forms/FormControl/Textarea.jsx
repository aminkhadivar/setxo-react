import { forwardRef, useEffect, useRef, useState, useContext } from 'react'
import { FormContext } from "../Form/Form"
import './FormControl.css'

export default forwardRef(function Textarea({ type = 'text', className = '', rounded = 'rounded', rows = '3', resizeabled = false, isFocused = false, placeholder, value, disabled = ('' || useContext(FormContext)), ...props }, ref) {

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

    return (
        <textarea
            {...props}
            type={type}
            className={`form-control` +
                `${className && ` ` + className}` + ` ${roundedClass}` + `${disabled && ' pointer-events-none opacity-50 !bg-gray-200'
                }` + `${resizeabled ? ' ' : ' resize-none'}`
            }
            ref={textarea}
            rows={rows}
            value={textareaValue || ''}
            onChange={e => setTextareaValue(e.target.value)}
            placeholder={placeholder}
        />
    )
})