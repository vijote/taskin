// React specific
import { Link } from "react-router-dom";

// Components
import Pill from "./Pill";

// Services
import { Task } from "../api/tasks.service";
import routes from "../pages/routes";

// Styles
import './TaskItem.css'

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