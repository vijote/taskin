import taskState from "../api/taskState";
import { Task, UpdateTaskResponse, createTasksService } from "../api/tasks.service"
import useQuery from "../hooks/useQuery.hook";
import PillDropdown, { Option } from "./PillDropdown"

import './TaskDetail.css'

interface TakDetailProps {
    data: Task
}

function TaskDetail(props: TakDetailProps) {
    const { makeQuery } = useQuery<UpdateTaskResponse>()
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

    async function onStateChange(newValue: Option) {
        const promise = createTasksService().update({
            id: props.data.id as string,
            state: newValue.value as string
        })

        await makeQuery(promise)
    }

    return (
        <>
            <div className="task-detail-header">
                <h2>{props.data.title}</h2>
                <PillDropdown onChange={onStateChange} className="change-state" name="state" initialValue={initialValue} options={options} />
            </div>
            <p>{props.data.content}</p>
        </>
    )
}

export default TaskDetail