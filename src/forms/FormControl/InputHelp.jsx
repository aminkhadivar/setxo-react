import { useContext } from 'react'
import { FormContext } from "../Form/Form"
import './InputHelp.css'

export default function InputHelp({ message, className = '', disabled = ('' || useContext(FormContext)), ...props }) {
    return (
        <p
            {...props}
            className={`input-text-help` + `${className && ` ` + className}` + `${disabled && ` disabled`}`}>
            {message}
        </p>
    )
}