import './Button.css'

interface ButtonProps {
    type: "button" | "submit" | "reset" | undefined;
    loading: boolean,
    label: string
}

function Button(props: ButtonProps) {
    const message = props.loading ? "Procesando..." : props.label
    return <button className='button' type={props.type} disabled={props.loading}>{message}</button>
}

export default Button;