interface ExpandIconProps {
    size: number
    className?: string
    onClick?: React.MouseEventHandler
}

function CloseIcon(props: ExpandIconProps) {
    return (
        <svg
            onClick={props.onClick}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            height={props.size}
            width={props.size}
            fill="#E8E8ED">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
    )
}

export default CloseIcon