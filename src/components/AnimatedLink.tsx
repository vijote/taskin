import useAnimatedNavigation from "../hooks/useAnimatedNavigation"

interface AnimatedLinkProps {
    children: React.ReactNode
    to: string
}

function AnimatedLink(props: AnimatedLinkProps) {
    const navigate = useAnimatedNavigation()

    return (
        <a className="link"
            href={props.to}
            onClick={(ev) => {
                ev.preventDefault()
                navigate(props.to)
            }}
        >
            {props.children}
        </a>
    );
};

export default AnimatedLink
