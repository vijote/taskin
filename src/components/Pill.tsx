import './Pill.css'

interface PillProps {
    state: string
}

function Pill(props: PillProps) {
    return (
        <span className='pill'>{props.state}</span>
    )
}

export default Pill