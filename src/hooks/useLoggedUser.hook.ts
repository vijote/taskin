import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

function useLoggedUser() {
    const navigate = useNavigate();
    const [loadingUser, setLoadingUser] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        if (!userId) return navigate('/register')

        setLoadingUser(true)
    }, []);

    return { loaded: loadingUser, user: localStorage.getItem('userId') };
}

export default useLoggedUser;