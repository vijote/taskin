import taskState from "../api/taskState";
import { Task } from "../api/tasks.service"
import PillDropdown from "./PillDropdown"

import './TaskDetail.css'

interface TakDetailProps {
    data: Task
}

function TaskDetail(props: TakDetailProps) {
    console.log(props);

    const options = [
        {
            value: "TO_DO",
            label: taskState.TO_DO,
        },
        {
            value: "IN_PROGRESS",
            label: taskState.IN_PROGRESS,
        },
        {
            value: "DONE",
            label: taskState.DONE,
        }
    ]

    const initialValue = {
        label: taskState[props.data.state],
        value: props.data.state
    }

    return (
        <>
            <div className="task-detail-header">
                <h2>{props.data.title}</h2>
                <PillDropdown className="change-state" name="state" initialValue={initialValue} options={options} />
            </div>
            <p>{props.data.content}</p>
        </>
    )
}

export default TaskDetail