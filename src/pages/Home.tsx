import { FormEvent } from 'react';
import useLoggedUser from '../hooks/useLoggedUser.hook';
import Input from '../components/Input';

import './Home.css'
import { Link } from 'react-router-dom';
import useTasksFetcher from '../hooks/useTasksFetcher.hook';
import TaskList from '../components/TaskList';

function Home() {
    // Check logged user
    const { loaded, user } = useLoggedUser();

    const { data, error, loading: loadingTasks } = useTasksFetcher(user as string)
    

    function handleSearch(_evt: FormEvent<HTMLFormElement>) {

    }

    if (!loaded) return 'Cargando usuario...'

    if (loadingTasks) return 'Cargando tareas...'

    return (
        <div className='container'>
            <h2 className='title'>Hola, Juan</h2>
            <p className='to-do-label'>10 tareas por hacer</p>

            <form onSubmit={handleSearch}>
                <Input label='Buscar' name='search' type='text' />
            </form>

            <TaskList data={data!}/>
            <Link to="/new-task" className='new-task'>+</Link>
            {/* <a className='new-task'>+</a> */}
        </div>
    )
}

export default Home;