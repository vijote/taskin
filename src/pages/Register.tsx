import { FormEvent } from 'react'

// Assets
import taskIcon from '../assets/notes.png';

// Components
import Input from '../components/Input';
import Button from '../components/Button';

// Styles
import './Register.css'

// Hooks
import useQuery from '../hooks/useQuery.hook';
import UsersService, { RegisterResponse } from '../api/users.service';
import AxiosImplementation from '../api/axiosImplementation';
import ErrorMessage from '../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';

function Register() {
    const { makeQuery, error, loading } = useQuery<RegisterResponse>()
    const navigate = useNavigate()

    async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        const formData = new FormData(evt.target as HTMLFormElement);
        const name = formData.get('name')

        const usersService = new UsersService(AxiosImplementation.singleton)
        const response = await makeQuery(usersService.register(name!.toString()))        

        if(!response.data) return;
        
        // Save registered user
        localStorage.setItem("userId", response.data.id)
        localStorage.setItem("userName", name!.toString())

        // Redirect to home page
        navigate('/')
    }

    return (
        <div className='container'>
            <h2 className='title'>Bienvenido a Taskin!</h2>

            <img src={taskIcon} alt="Taskin welcome image" className='welcome-image' />
            <p className='welcome-label'>Estás a un paso de organizar tus tareas</p>

            {error && error.response ? <ErrorMessage message={error.response.data.error}/> : null}
            <form onSubmit={handleSubmit}>
                <Input label='Usuario' name='name' type='text' />
                <Button label='Crear usuario' loading={loading} type='submit' />
            </form>
        </div>
    );
}

export default Register;