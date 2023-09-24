import { GetTasksResponse } from "../api/tasks.service";
import TaskItem from "./TaskItem";

interface TaskListProps {
    data: GetTasksResponse
}

function TaskList(props: TaskListProps) {
    return (
        <div>
            <h3>Por hacer</h3>
            {props.data.data.toDo
                .slice(0, 2)
                .map(task =>
                    <TaskItem data={task} key={task.id} />
                )}

            <h3>En progreso</h3>
            {props.data.data.inProgress.map(task => <p key={task.id}>{task.title}</p>)}

            <h3>Hecho</h3>
            {props.data.data.done.map(task => <p key={task.id}>{task.title}</p>)}
        </div>
    )
}

export default TaskList;