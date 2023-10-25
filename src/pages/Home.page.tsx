// React specific
import { Link, useNavigate, useRouteLoaderData } from 'react-router-dom';

// Components
import TaskList from '../components/TaskList';
import TaskSearch from '../components/TaskSearch';

// Services
import routes from './routes';
import { GroupedTasksResponse } from '../api/tasks.service';

// Styles
import './Home.css'

// Hooks
import useTitle from '../hooks/useTitle.hook';
import useHomeData from '../hooks/useHomeData.hook';
import LoadingService from '../components/LoadingService';
import { User } from '../loaders/userLoader';
import useAnimatedNavigation from '../hooks/useAnimatedNavigation';

function HomePage() {
    useTitle("Inicio | Taskin", { restoreOnUnmount: true })
    const user = useRouteLoaderData("home") as User
    const navigate = useAnimatedNavigation()
    const { data, loading } = useHomeData();

    function handleSearch(search: string) {
        const searchParams = new URLSearchParams()
        if (search) searchParams.set('filter-title', search)
        navigate(routes.TASK.ALL(searchParams))
    }

    if (loading || !data) return <LoadingService message='Cargando tareas' />

    const [tasks, count] = data

    return (
        <div className='container' style={{viewTransitionName: "home"}}>
            <h2 className='home-title'>Hola, {user.name}</h2>
            <div className='all-tasks-header'>
                <p className='to-do-label'>{count.data as number} tareas encontradas</p>
                <Link to={routes.TASK.ALL()} className='link'>Ver todas</Link>
            </div>

            <TaskSearch onSearch={handleSearch} />
            <TaskList data={tasks.data as GroupedTasksResponse} />

            <Link to={routes.TASK.NEW} className='new-task'>+</Link>
        </div>
    )
}

export default HomePage;