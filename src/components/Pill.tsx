import './Pill.css'
import TASK_STATE from '../api/taskState'

interface PillProps {
    state: string
}

function Pill(props: PillProps) {
    const state = TASK_STATE[props.state]
    return (
        <span className={`pill ${props.state}`}>{state}</span>
    )
}

export default Pill