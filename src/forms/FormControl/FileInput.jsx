import { forwardRef, useRef, useContext } from 'react'
import { FormContext } from "../Form/Form"
import Input from "./Input"
import Label from "./Label"
import './FileInput.css'

export default forwardRef(function FileInput({ label = '', id, className = '', size = 'default', disabled = ('' || useContext(FormContext)), readOnly = '', ...props }, ref) {

    const input = ref ? ref : useRef()

    const sizeClass = {
        sm: 'form-control-file-sm',
        default: 'form-control-file',
        lg: 'form-control-file-lg',
    }[size]

    return (
        <div className="group">
            {label &&
                <Label className="ml-2" htmlFor={disabled ? null : id} value={label} />
            }
            <span className="sr-only">Choose File</span>
            <Input
                {...props}
                id={id}
                type="file"
                label={label}
                className={`${className && ` ` + className}` + ` ${sizeClass}`}
                ref={input}
                size={size}
                disabled={disabled}
                rounded="full"
            />
        </div>
    )
})