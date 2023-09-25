import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import routes from '../pages/routes';

function useLoggedUser() {
    const navigate = useNavigate();
    const [loadingUser, setLoadingUser] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if (!userId) return navigate(routes.USER.REGISTER)

        setLoadingUser(true)
    }, []);

    return { loaded: loadingUser, user: localStorage.getItem('userId') };
}

export default useLoggedUser;