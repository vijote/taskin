// React specific
import { Link, useNavigate } from 'react-router-dom';

// Hooks
import useTasksFetcher from '../hooks/useTasks.hook';
import useAllTasks from '../hooks/useAllTasks.hook';

// Components
import TaskList from '../components/TaskList';
import TaskSearch from '../components/TaskSearch';

// Services
import routes from './routes';

// Styles
import './Home.css'

function HomePage() {
    const navigate = useNavigate()
    const { data: tasks, error: tasksError, loading: loadingTasks } = useTasksFetcher()
    const { data: tasksCountResponse, error: TaskCountError, loading: loadingTaskCount } = useAllTasks(new URLSearchParams({ isCount: "true" }))
    const userName = localStorage.getItem('userName');

    if (tasksError || TaskCountError) return 'Ocurrió un error al obtener las tareas!'

    if (loadingTasks || loadingTaskCount || !tasks) return 'Cargando tareas...'

    function handleSearch(search: string) {
        const searchParams = new URLSearchParams()
        if (search) searchParams.set('filter-title', search)
        navigate(routes.TASK.ALL(searchParams))
    }

    return (
        <div className='container'>
            <h2 className='home-title'>Hola, {userName}</h2>
            <div className='all-tasks-header'>
                <p className='to-do-label'>{tasksCountResponse?.data as number} tareas encontradas</p>
                <Link to={routes.TASK.ALL()} className='link'>Ver todas</Link>
            </div>

            <TaskSearch onSearch={handleSearch} />
            <TaskList data={tasks} />

            <Link to={routes.TASK.NEW} className='new-task'>+</Link>
        </div>
    )
}

export default HomePage;