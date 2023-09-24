import useLoggedUser from '../hooks/useLoggedUser.hook';

function Home() {
    // Check logged user
    const loadedUser = useLoggedUser();

    if(!loadedUser) return 'Cargando usuario...'
    
    return (
        <h2>Home page!</h2>
    )
}

export default Home;