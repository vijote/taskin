import { FormEvent } from 'react'

// Assets
import taskIcon from '../assets/notes.png';

// Components
import Input from '../components/Input';
import Button from '../components/Button';

// Styles
import './Home.css'

function Home() {
    function handleSubmit(evt: FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        console.log("submitted!");
    }

    return (
        <div className='container'>
            <h2 className='title'>Bienvenido a Taskin!</h2>
            
            <img src={taskIcon} alt="Taskin welcome image" className='welcome-image' />
            <p className='welcome-label'>Estás a un paso de organizar tus tareas</p>

            <form onSubmit={handleSubmit}>
                <Input label='Usuario' name='username' type='text'/>
                <Button type='submit'/>
            </form>
        </div>
    );
}

export default Home;