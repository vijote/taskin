import { Link } from "react-router-dom"

interface IconButtonProps {
    children: React.ReactNode
    to: string
}

function IconButton(props: IconButtonProps) {
    return (
        <Link to={props.to}>{props.children}</Link>
    )
}

export default IconButton