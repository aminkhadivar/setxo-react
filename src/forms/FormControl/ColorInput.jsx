import { forwardRef, useRef, useState, useContext } from 'react'
import Label from "./Label"
import { FormContext } from "../Form/Form"
import './ColorInput.css'

export default forwardRef(function ColorInput({ label = '', id, className = '', value, disabled = ('' || useContext(FormContext)), ...props }, ref) {

    const input = ref ? ref : useRef()

    const [inputValue, setInputValue] = useState(value)

    const onChangeInput = (e) => {
        setInputValue(e.target.value)
    }

    return (
        <div className="form-color">
            {label &&
                <Label htmlFor={disabled ? null : id} value={label} />
            }
            <div className="form-control-color-wrapper">
                <input
                    {...props}
                    type="color"
                    label={label}
                    className="form-control-color"
                    id={id}
                    value={inputValue || ''}
                    onChange={onChangeInput}
                    disabled={disabled}
                    title={label} />
            </div>
        </div>
    )
})