interface ExpandIconProps {
    size: number
    className?: string
}

function ExpandIcon(props: ExpandIconProps) {
    return (
        <svg
            className={props.className || ""}
            xmlns="http://www.w3.org/2000/svg"
            height={props.size}
            viewBox="0 -960 960 960"
            width={props.size}
            fill="#E8E8ED">
            <path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z" />
        </svg>
    )
}

export default ExpandIcon