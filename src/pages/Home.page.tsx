// React specific
import { Await, Link, useNavigate, useLoaderData } from 'react-router-dom';
import { Suspense } from 'react';

// Components
import TaskList from '../components/TaskList';
import TaskSearch from '../components/TaskSearch';
import LoadingService from '../components/LoadingService';

// Services
import routes from './routes';
import { GroupedTasksResponse } from '../api/tasks.service';

// Styles
import './Home.css'

// Loaders
import { HomeLoaderResponse } from '../loaders/homeLoader';

// Hooks
import useTitle from '../hooks/useTitle.hook';

function HomePage() {
    useTitle("Inicio | Taskin", { restoreOnUnmount: true })

    const navigate = useNavigate()

    function handleSearch(search: string) {
        const searchParams = new URLSearchParams()
        if (search) searchParams.set('filter-title', search)
        navigate(routes.TASK.ALL(searchParams))
    }

    const data = useLoaderData();

    return (
        <Suspense
            fallback={<LoadingService message="Cargando tareas" />}>
            <Await
                resolve={data}>
                {(awaitedData: HomeLoaderResponse) => (
                    <div className='container'>
                        <h2 className='home-title'>Hola, {awaitedData.userName}</h2>
                        <div className='all-tasks-header'>
                            <p className='to-do-label'>{awaitedData.count.data as number} tareas encontradas</p>
                            <Link to={routes.TASK.ALL()} className='link'>Ver todas</Link>
                        </div>

                        <TaskSearch onSearch={handleSearch} />
                        <TaskList data={awaitedData.tasks.data as GroupedTasksResponse} />

                        <Link to={routes.TASK.NEW} className='new-task'>+</Link>
                    </div>
                )}
            </Await>
        </Suspense>
    );
}

export default HomePage;