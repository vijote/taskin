import { FormEvent } from 'react';
import useLoggedUser from '../hooks/useLoggedUser.hook';
import Input from '../components/Input';

import './Home.css'
import { Link, useNavigate } from 'react-router-dom';
import useTasksFetcher from '../hooks/useTasks.hook';
import TaskList from '../components/TaskList';
import useAllTasks from '../hooks/useAllTasks.hook';
import routes from './routes';

function Home() {
    // Check logged user
    const { loaded, user } = useLoggedUser();
    const navigate = useNavigate()

    const { data: tasksResponse, error: tasksError, loading: loadingTasks } = useTasksFetcher(user as string)
    const { data: tasksCountResponse, error: TaskCountError, loading: loadingTaskCount } = useAllTasks(new URLSearchParams({ isCount: "true" }))

    function handleSearch(evt: FormEvent<HTMLFormElement>) {
        evt.preventDefault()
        const formData = new FormData(evt.target as HTMLFormElement)
        const search = formData.get("search")

        navigate(routes.TASK.TITLE(encodeURIComponent(search as string)))
    }

    if (!loaded) return 'Cargando usuario...'

    if (tasksError || TaskCountError) return 'Ocurrió un error al obtener las tareas!'

    if (loadingTasks || loadingTaskCount || !tasksResponse) return 'Cargando tareas...'

    return (
        <div className='container'>
            <h2 className='home-title'>Hola, Juan</h2>
            <div className='all-tasks-header'>
                <p className='to-do-label'>{tasksCountResponse?.data.length} tareas encontradas</p>
                <Link to={routes.TASK.ALL} className='link'>Ver todas</Link>
            </div>

            <form onSubmit={handleSearch}>
                <Input label='Buscar' name='search' type='text' />
            </form>

            <TaskList data={tasksResponse} />

            <Link to={routes.TASK.NEW} className='new-task'>+</Link>
            {/* <a className='new-task'>+</a> */}
        </div>
    )
}

export default Home;