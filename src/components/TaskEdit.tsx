import taskState from "../api/taskState"
import Button from "./Button"
import Input from "./Input"
import PillDropdown from "./PillDropdown"
import TextArea from "./TextArea"

import './TaskEdit.css'
import ErrorMessage from "./ErrorMessage"

interface TaskEditProps {
    title: string
    content: string
    state: string
    onSubmit: (formData: Record<string, string>) => unknown
    submitting: boolean
    error?: string
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
        <div data-testid="task-edit">
            <h2 className="mt-1">Editar tarea</h2>
            {props.error ? <ErrorMessage message={props.error}/> : null}
            <form onSubmit={handleSubmit}>
                <div className="form-header">
                    <Input className="edit-task-title" defaultValue={props.title} type="text" label="Titulo" name="title" />
                    <PillDropdown name="state" label="Estado" initialValue={initialValue} options={options}/>
                </div>
                <TextArea defaultValue={props.content} label="Descripción" name="content" />
                <Button className="submit-task-button" label="Actualizar" loading={props.submitting} type="submit" />
            </form>
        </div>
    )
}

export default TaskEdit