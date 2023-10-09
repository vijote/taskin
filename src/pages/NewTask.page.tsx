// React specific
import { Link, useNavigate } from "react-router-dom"

// Components
import Button from "../components/Button"
import ErrorMessage from "../components/ErrorMessage"
import Input from "../components/Input"
import TextArea from "../components/TextArea"

// Services
import { Task, createTasksService } from "../api/tasks.service"
import { ApiResponse } from "../api/api.service"
import routes from "./routes"

// Hooks
import useQueryError from "../hooks/useQueryError.hook"

// Styles
import './NewTask.css'
import useTitle from "../hooks/useTitle.hook"

function NewTaskPage() {
    useTitle("Nueva tarea | Taskin", { restoreOnUnmount: true })
    
    const { makeQuery, error, loading } = useQueryError<ApiResponse<Task>>()
    const navigate = useNavigate()

    async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        const formData = new FormData(evt.target as HTMLFormElement);
        const title = formData.get('title')
        const content = formData.get('content')

        const newTaskPromise = createTasksService().create(title!.toString(), content!.toString())
        const response = await makeQuery(newTaskPromise) as ApiResponse<Task>

        if (!response.data) return;

        // Redirect to home page
        navigate(routes.HOME)
    }

    return (
        <div className="container">
            <Link to={routes.HOME} className="link">Volver al inicio</Link>
            <h2 className="new-task-title">Crear tarea</h2>
            {!loading && error && error.response ? <ErrorMessage message={error.response.data.error} /> : null}
            <form onSubmit={handleSubmit}>
                <Input type="text" label="Titulo" name="title" />
                <TextArea label="Descripción" name="content" />
                <Button className="submit-task-button" label="Agregar" loading={loading} type="submit" />
            </form>
        </div>
    )
}

export default NewTaskPage