// React specific
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"

// Components
import TaskDetail from "../components/TaskDetail"
import Button from "../components/Button"
import TaskEdit from "../components/TaskEdit"

// Hooks
import useTaskFetcherOnMount from "../hooks/useTaskOnMount"
import useQuery from "../hooks/useQuery.hook"

// Services
import { Task, createTasksService } from "../api/tasks.service"
import { ApiResponse } from "../api/api.service"
import routes from "./routes"

// Styles
import './TaskDetail.css'

const EDITING_PARAM = "editing"

function TaskDetailPage() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const { taskId } = useParams()
    const { data: response, error, loading, refetch: refetchTask } = useTaskFetcherOnMount(taskId as string)
    const { makeQuery: makeEditTaskQuery, loading: updateLoading } = useQuery<ApiResponse<Task>>()
    const { makeQuery: makeDeleteTaskQuery, loading: deleteLoading } = useQuery<ApiResponse<void>>()
    const isEditing = searchParams.get(EDITING_PARAM)

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

        await makeEditTaskQuery(promise)

        clearEditParam()
        refetchTask()
    }

    async function onDeleteTaskButtonClick() {
        const promise = createTasksService().delete(taskId as string)

        const deletedTaskResponse = await makeDeleteTaskQuery(promise)

        if(deletedTaskResponse) navigate(routes.HOME)
    }

    if (loading || !response) return "Cargando tarea..."

    if (error) return "Error al cargar la tarea!"

    return (
        <div className="container">
            <div className="task-page-header">
                <Link className="link" to={routes.HOME}>Volver al inicio</Link>
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
                : <TaskDetail
                    data={response.data}
                />
            }
            <Button
                className="delete-task-button"
                label="Eliminar tarea"
                loading={deleteLoading}
                type="button"
                onClick={onDeleteTaskButtonClick}
            />
        </div>
    )
}

export default TaskDetailPage