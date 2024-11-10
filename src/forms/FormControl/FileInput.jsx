import { forwardRef, useRef, useContext , useId } from 'react'
import { FormContext } from "../Form/Form"
import Input from "./Input"
import Label from "./Label"
import './FileInput.css'

export default forwardRef(function FileInput({ label = '', id, className = '', size = 'default', disabled = ('' || useContext(FormContext)), readOnly = '', ...props }, ref) {

    const postFileInputId = useId()

    const input = ref ? ref : useRef()

    const sizeClass = {
        sm: 'form-control-file-sm',
        default: 'form-control-file',
        lg: 'form-control-file-lg',
    }[size]

    return (
        <div className="group">
            {label &&
                <Label className={`ml-2 ${disabled  ? '' : ' cursor-pointer'}`} htmlFor={disabled ? null : postFileInputId} value={label} />
            }
            <span className="sr-only">Choose File</span>
            <input
                {...props}
                id={postFileInputId}
                type="file"
                label={label}
                className={`form-control ${className && ` ` + className}` + ` ${sizeClass}` + ` ${disabled ? ' disabled' : ''}`}
                ref={input}
                size={size}
                disabled={disabled}
                rounded="full"
            />
        </div>
    )
})