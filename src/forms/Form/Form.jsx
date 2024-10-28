import { createContext } from 'react'
import './Form.css'

export const FormContext = createContext()

export default function Form({ children, className = '', disabled = '', ...props }) {

    return (
        <FormContext.Provider value={disabled}>
            <form {...props} className={`${className && className}` + `${disabled && ' disabled'}`}>
                {children}
            </form>
        </FormContext.Provider>
    )
}