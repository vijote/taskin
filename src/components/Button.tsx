import './Button.css'

interface ButtonProps {
    type: "button" | "submit" | "reset" | undefined;
}

function Button(props: ButtonProps) {
    return <button className='button' type={props.type}>Crear usuario</button>
}

export default Button;