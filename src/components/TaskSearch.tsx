import Input from '../components/Input';

interface TaskSearchProps {
    onSearch?: (newValue: string) => unknown
    defaultValue?: string
}

function TaskSearch(props: TaskSearchProps) {
    function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault()
        
        if(!props.onSearch) return

        const formData = new FormData(evt.target as HTMLFormElement)
        const search = formData.get("search")

        props.onSearch(encodeURIComponent(search as string))
    }
    
    return (
        <form data-testid="task-search" onSubmit={handleSubmit}>
            <Input defaultValue={props.defaultValue} label='Buscar por nombre' name='search' type='search' />
        </form>
    )
}

export default TaskSearch