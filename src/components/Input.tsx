import { HTMLInputTypeAttribute } from 'react'
import './Input.css'

interface InputProps {
    name: string
    type: HTMLInputTypeAttribute
    label: string
    defaultValue?: string
}

function Input(props: InputProps) {
    return (
        <div className='input-container'>
            <label className='label' htmlFor={props.name}>{props.label}</label>
            <input defaultValue={props.defaultValue} className='input' type={props.type} name={props.name} id={props.name} autoComplete='inline' />
        </div>
    )
}

export default Input;