import { Link } from "react-router-dom";
import Pill from "./Pill";
import { Task } from "../api/tasks.service";
import './TaskItem.css'
import routes from "../pages/routes";

interface TaskProps {
    data: Task
}

function TaskItem(props: TaskProps) {
    return (
        <Link to={routes.TASK.DETAIL(props.data.id)} className="task-container">
            <div className="task-header">
                <h4 className="task-title">{props.data.title}</h4>
                <Pill state={props.data.state} />
            </div>
            <p className="task-created-at">Creada: {new Intl.DateTimeFormat('es-AR').format(new Date(props.data.createdAt))}</p>
        </Link>
    )
}

export default TaskItem