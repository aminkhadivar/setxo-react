import { useState, useContext, useId } from 'react'
import Label from "./Label"
import { FormContext } from "../Form/Form"
import './ColorInput.css'

export default function ColorInput({ label = '', id, className = '', value, disabled = ('' || useContext(FormContext)), ...props }) {

    const postColorInputId = useId()

    const [inputValue, setInputValue] = useState(value)

    const onChangeInput = (e) => {
        setInputValue(e.target.value)
    }

    return (
        <div className="form-color">
            {label &&
                <Label className={disabled ? '' : 'cursor-pointer'} htmlFor={disabled ? null : (id || postColorInputId)} value={label} />
            }
            <div className="form-control-color-wrapper">
                <input
                    {...props}
                    type="color"
                    label={label}
                    className="form-control-color"
                    id={id || postColorInputId}
                    value={inputValue || ''}
                    onChange={onChangeInput}
                    disabled={disabled}
                    title={label} />
            </div>
        </div>
    )
}