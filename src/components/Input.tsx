import './Input.css'

interface InputProps {
    name: string
    type: React.HTMLInputTypeAttribute
    label: string
    defaultValue?: string
    className?: string
}

function Input(props: InputProps) {    
    return (
        <div data-testid="input" className={`input-container ${props.className ? props.className : ""}`}>
            <label className='label' htmlFor={props.name}>{props.label}</label>
            <input defaultValue={props.defaultValue} className='input' type={props.type} name={props.name} id={props.name} autoComplete='inline' />
        </div>
    )
}

export default Input;