import { useContext } from 'react'
import { FormContext } from "../Form/Form"
import './InputError.css'

export default function InputError({ message, className = '', disabled = ('' || useContext(FormContext)), ...props }) {
    return (
        <p
            {...props}
            className={`input-text-error` + `${className && ` ` + className}` + `${disabled && ` disabled`}`}>
            {message}
        </p>
    )
}