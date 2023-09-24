import './Input.css'

interface TextAreaProps {
    name: string
    label: string
    defaultValue?: string
}

function TextArea(props: TextAreaProps) {
    return (
        <div className='input-container'>
            <label className='label' htmlFor={props.name}>{props.label}</label>
            <textarea defaultValue={props.defaultValue} className='input' name={props.name} id={props.name} cols={8} rows={10}></textarea>
        </div>
    )
}

export default TextArea;