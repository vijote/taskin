// React specific
import { useNavigate } from 'react-router-dom';

// Assets
import taskIcon from '../assets/notes.png';

// Components
import Input from '../components/Input';
import Button from '../components/Button';

// Hooks
import useQuery from '../hooks/useQuery.hook';

// Services
import { createUsersService } from '../api/users.service';
import routes from './routes';

// Components
import ErrorMessage from '../components/ErrorMessage';

// Styles
import './Login.css'

function LoginPage() {
    const { makeQuery, error, loading } = useQuery<{ id: string }>()
    const navigate = useNavigate()

    async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        const formData = new FormData(evt.target as HTMLFormElement);
        const name = formData.get('name') as string

        const loginPromise = createUsersService().login(name)
        const response = await makeQuery(loginPromise)

        if (!response) return;

        // Save logged user
        localStorage.setItem("userId", response.id)
        localStorage.setItem("userName", name!.toString())

        // Redirect to home page
        navigate(routes.HOME)
    }

    return (
        <div className='container'>
            <h2 className='title'>Bienvenido a Taskin!</h2>

            <img src={taskIcon} alt="Taskin welcome image" className='welcome-image' />
            <p className='welcome-label'>Estás a un paso de organizar tus tareas</p>

            {error && error.response ? <ErrorMessage message={error.response.data.error} /> : null}
            <form onSubmit={handleSubmit}>
                <Input label='Nombre de usuario' name='name' type='text' />
                <Button label='Ingresar' loading={loading} type='submit' />
                <span className='login-label'>Si no tenés cuenta se creará una automaticamente 😉</span>
            </form>
        </div>
    );
}

export default LoginPage;