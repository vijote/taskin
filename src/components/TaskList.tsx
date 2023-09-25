import { GetGroupedTasksResponse } from "../api/tasks.service";
import routes from "../pages/routes";
import TaskItem from "./TaskItem";

import './TaskList.css'
import { Link } from "react-router-dom";

interface TaskListProps {
    data: GetGroupedTasksResponse
}

function TaskList(props: TaskListProps) {

    return (
        <div>
            {props.data.data.toDo.length ?
                <div className="section-header">
                    <h3>Por hacer</h3>
                    <Link
                        className="link"
                        to={routes.TASK.ALL(new URLSearchParams({ 'filter-state': "TO_DO" }))}>
                        Ver todas
                    </Link>
                </div>
                : null}
            {props.data.data.toDo
                .slice(0, 2)
                .map(task =>
                    <TaskItem data={task} key={task.id} />
                )}

            {props.data.data.inProgress.length ?
                <div className="section-header">
                    <h3>En progreso</h3>
                    <Link
                        className="link"
                        to={routes.TASK.ALL(new URLSearchParams({ 'filter-state': "IN_PROGRESS" }))}>
                        Ver todas
                    </Link>
                </div>
                : null}
            {props.data.data.inProgress
                .slice(0, 2)
                .map(task =>
                    <TaskItem data={task} key={task.id} />
                )}

            {props.data.data.done.length ?
                <div className="section-header">
                    <h3>Hecho</h3>
                    <Link
                        className="link"
                        to={routes.TASK.ALL(new URLSearchParams({ 'filter-state': "DONE" }))}>
                        Ver todas
                    </Link>
                </div>
                : null}
            {props.data.data.done
                .slice(0, 2)
                .map(task =>
                    <TaskItem data={task} key={task.id} />
                )}
            {!props.data.data.done.length && !props.data.data.inProgress.length && !props.data.data.toDo.length
                ? <p>Parece que no hay tareas! Podés comenzar agregando una con el botón verde de aqui abajo</p>
                : null}
        </div>
    )
}

export default TaskList;