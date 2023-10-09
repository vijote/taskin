// React specific
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"

// Components
import TaskDetail from "../components/TaskDetail"
import Button from "../components/Button"
import TaskEdit from "../components/TaskEdit"
import LoadingService from "../components/LoadingService"

// Hooks
import useTask from "../hooks/useTask"
import useQueryError from "../hooks/useQueryError.hook"

// Services
import { Task, createTasksService } from "../api/tasks.service"
import { ApiResponse } from "../api/api.service"
import routes from "./routes"

// Styles
import './TaskDetail.css'
import useTitle from "../hooks/useTitle.hook"

const EDITING_PARAM = "editing"

function TaskDetailPage() {
    useTitle("Detalle de tarea | Taskin", { restoreOnUnmount: true })
    
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const { taskId } = useParams()
    const { data: response, loading, refetch } = useTask(taskId as string)
    const { makeQuery: makeEditTaskQuery, error: errorEditing, loading: updateLoading, resetState } = useQueryError<ApiResponse<Task>>()
    const { makeQuery: makeDeleteTaskQuery, loading: deleteLoading } = useQueryError<ApiResponse<void>>()
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
        resetState()
    }

    async function onEditSubmit(data: object) {
        const promise = createTasksService().update({
            id: encodeURIComponent(taskId as string),
            ...data
        })

        await makeEditTaskQuery(promise)

        clearEditParam()
        refetch()
    }

    async function onDeleteTaskButtonClick() {
        const promise = createTasksService().delete(taskId as string)

        const deletedTaskResponse = await makeDeleteTaskQuery(promise)

        if (deletedTaskResponse) navigate(routes.HOME)
    }

    if (loading || !response) return <LoadingService message="Cargando tarea" />

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
                    error={errorEditing?.response?.data.error}
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