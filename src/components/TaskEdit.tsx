import taskState from "../api/taskState"
import Button from "./Button"
import Input from "./Input"
import PillDropdown from "./PillDropdown"
import TextArea from "./TextArea"

import './TaskEdit.css'

interface TaskEditProps {
    title: string
    content: string
    state: string
    onSubmit: Function
    submitting: boolean
}

function TaskEdit(props: TaskEditProps) {

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
        label: taskState[props.state],
        value: props.state
    }

    function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault()

        const formData = new FormData(evt.target as HTMLFormElement)
        const formDataObject: Record<string, string> = {}

        for (const [key, value] of formData.entries()) {
            formDataObject[key] = value as string;
        }

        props.onSubmit(formDataObject)
    }

    return (
        <>
            <h2 className="mt-1">Editar tarea</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-header">
                    <Input defaultValue={props.title} type="text" label="Titulo" name="title" />
                    <PillDropdown name="state" label="Estado" initialValue={initialValue} options={options}/>
                </div>
                <TextArea defaultValue={props.content} label="Descripción" name="content" />
                <Button className="submit-task-button" label="Agregar" loading={props.submitting} type="submit" />
            </form>
        </>
    )
}

export default TaskEdit