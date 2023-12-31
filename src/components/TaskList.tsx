// React specific
import { Link } from "react-router-dom";

// Services
import { GroupedTasksResponse } from "../api/tasks.service";
import routes from "../pages/routes";

// Components
import TaskItem from "./TaskItem";

// Styles
import './TaskList.css'

interface TaskListProps {
    data: GroupedTasksResponse
}

function TaskList(props: TaskListProps) {
    return (
        <div>
            {props.data.toDo.length ?
                <div className="section-header">
                    <h3>Por hacer</h3>
                    <Link
                        className="link"
                        to={routes.TASK.ALL(new URLSearchParams({ 'filter-state': "TO_DO" }))}>
                        Ver todas
                    </Link>
                </div>
                : null}
            {props.data.toDo
                .slice(0, 2)
                .map(task =>
                    <TaskItem data={task} key={task.id} />
                )}

            {props.data.inProgress.length ?
                <div className="section-header">
                    <h3>En progreso</h3>
                    <Link
                        className="link"
                        to={routes.TASK.ALL(new URLSearchParams({ 'filter-state': "IN_PROGRESS" }))}>
                        Ver todas
                    </Link>
                </div>
                : null}
            {props.data.inProgress
                .slice(0, 2)
                .map(task =>
                    <TaskItem data={task} key={task.id} />
                )}

            {props.data.done.length ?
                <div className="section-header">
                    <h3>Hecho</h3>
                    <Link
                        className="link"
                        to={routes.TASK.ALL(new URLSearchParams({ 'filter-state': "DONE" }))}>
                        Ver todas
                    </Link>
                </div>
                : null}
            {props.data.done
                .slice(0, 2)
                .map(task =>
                    <TaskItem data={task} key={task.id} />
                )}
            {!props.data.done.length && !props.data.inProgress.length && !props.data.toDo.length
                ? <p>Parece que no hay tareas! Podés comenzar agregando una con el botón verde de aqui abajo</p>
                : null}
        </div>
    )
}

export default TaskList;