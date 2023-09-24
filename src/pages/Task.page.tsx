import { Link, useParams, useSearchParams } from "react-router-dom"
import useTaskFetcherOnMount from "../hooks/useTaskFetcherOnMount"
import TaskDetail from "../components/TaskDetail"

import './Task.css'
import Button from "../components/Button"
import TaskEdit from "../components/TaskEdit"
import useQuery from "../hooks/useQuery.hook"
import { UpdateTaskResponse, createTasksService } from "../api/tasks.service"

function TaskPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { taskId } = useParams()
    const { data: response, error, loading, refetch: refetchTask } = useTaskFetcherOnMount(taskId as string)
    const { makeQuery, loading: updateLoading } = useQuery<UpdateTaskResponse>()
    const isEditing = searchParams.get("editing")

    function onEditButtonClick() {
        const newSearchParams = new URLSearchParams({
            editing: String(true)
        })

        setSearchParams(newSearchParams)
    }

    function clearEditParam() {
        const newSearchParams = new URLSearchParams()

        setSearchParams(newSearchParams)
    }

    function onCancelEditingButtonClick() {
        clearEditParam()
    }

    async function onEditSubmit(data: object) {
        const promise = createTasksService().update({
            id: encodeURIComponent(taskId as string),
            ...data
        })

        await makeQuery(promise)

        clearEditParam()
        refetchTask()
    }

    if (loading || !response) return "Cargando tarea..."

    if (error) return "Error al cargar la tarea!"

    return (
        <div className="container">
            <div className="task-page-header">
                <Link className="link" to="/">Volver al inicio</Link>
                {!isEditing && <Button
                    onClick={onEditButtonClick}
                    label="Editar"
                    loading={false}
                    type="button"
                    className="edit-task-button"
                />}
                {isEditing && <Button
                    onClick={onCancelEditingButtonClick}
                    label="Cancelar"
                    loading={false}
                    type="button"
                    className="cancel-editing-button"
                />}
            </div>
            {isEditing
                ? <TaskEdit
                    state={response.data.state}
                    content={response.data.content}
                    title={response.data.title}
                    submitting={updateLoading}
                    onSubmit={onEditSubmit}
                />
                : <TaskDetail data={response.data} />}
        </div>
    )
}

export default TaskPage