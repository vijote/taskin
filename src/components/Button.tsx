import './Button.css'

interface ButtonProps {
    type: "button" | "submit" | "reset" | undefined;
    loading?: boolean,
    label: string
    className?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function Button(props: ButtonProps) {
    const message = props.loading ? "Procesando..." : props.label

    return <button
        data-testid="button"
        onClick={props.onClick}
        className={`button ${props.className || ""}`}
        type={props.type}
        disabled={props.loading}>
        {message}
    </button>
}

export default Button;