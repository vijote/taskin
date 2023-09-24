import { Link } from "react-router-dom";
import TASK_STATE from '../api/taskState'
import Pill from "./Pill";
import { Task } from "../api/tasks.service";
import './TaskItem.css'

interface TaskProps {
    data: Task
}

function TaskItem(props: TaskProps) {
    const state = TASK_STATE[props.data.state]

    return (
        <Link to={`/task/${props.data.id}`} className="task-container">
            <div className="task-header">
                <h4 className="task-title">{props.data.title}</h4>
                <Pill state={state} />
            </div>
            <p className="task-created-at">Creado el {new Intl.DateTimeFormat('es-AR').format(new Date(props.data.createdAt))}</p>
        </Link>
    )
}

export default TaskItem