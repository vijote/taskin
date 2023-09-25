// Assets
import taskIcon from '../assets/notes.png';

// Components
import Input from '../components/Input';
import Button from '../components/Button';

// Styles
import './Login.css'

// Hooks
import useQuery from '../hooks/useQuery.hook';
import UsersService, { LoginResponse } from '../api/users.service';
import AxiosImplementation from '../api/axiosImplementation';
import ErrorMessage from '../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import routes from './routes';

function LoginPage() {
    const { makeQuery, error, loading } = useQuery<LoginResponse>()
    const navigate = useNavigate()

    async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        const formData = new FormData(evt.target as HTMLFormElement);
        const name = formData.get('name')

        const usersService = new UsersService(AxiosImplementation.singleton)
        const response = await makeQuery(usersService.login(name!.toString()))        

        if(!response.data) return;
        
        // Save logged user
        localStorage.setItem("userId", response.data.id)
        localStorage.setItem("userName", name!.toString())

        // Redirect to home page
        navigate(routes.HOME)

    }

    return (
        <div className='container'>
            <h2 className='title'>Bienvenido a Taskin!</h2>

            <img src={taskIcon} alt="Taskin welcome image" className='welcome-image' />
            <p className='welcome-label'>Estás a un paso de organizar tus tareas</p>

            {error && error.response ? <ErrorMessage message={error.response.data.error}/> : null}
            <form onSubmit={handleSubmit}>
                <Input label='Nombre de usuario' name='name' type='text' />
                <Button label='Ingresar' loading={loading} type='submit' />
                <span className='login-label'>Si no tenés cuenta se creará una automaticamente 😉</span>
            </form>
        </div>
    );
}

export default LoginPage;