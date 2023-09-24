import TasksService, { CreateTaskResponse } from "../api/tasks.service"
import Button from "../components/Button"
import ErrorMessage from "../components/ErrorMessage"
import Input from "../components/Input"
import TextArea from "../components/TextArea"
import useQuery from "../hooks/useQuery.hook"
import { FormEvent } from 'react'

import './NewTask.css'
import AxiosImplementation from "../api/axiosImplementation"
import { useNavigate } from "react-router-dom"

function NewTask() {
    const { makeQuery, error, loading } = useQuery<CreateTaskResponse>()
    const navigate = useNavigate()

    async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        const formData = new FormData(evt.target as HTMLFormElement);
        const title = formData.get('title')
        const content = formData.get('content')

        const userId = localStorage.getItem("userId") as string

        const tasksService = new TasksService(AxiosImplementation.singleton, userId)
        const newTaskPromise = tasksService.create(title!.toString(), content!.toString())
        const response = await makeQuery(newTaskPromise)

        if (!response.data) return;

        // Redirect to home page
        navigate('/')
    }

    return (
        <div className="container">
            <h2 className="title">Crear tarea</h2>
            {!loading && error && error.response ? <ErrorMessage message={error.response.data.error} /> : null}
            <form onSubmit={handleSubmit}>
                <Input type="text" label="Titulo" name="title" />
                <TextArea label="Descripción" name="content" />
                <Button className="submit-task-button" label="Agregar" loading={loading} type="submit" />
            </form>
        </div>
    )
}

export default NewTask