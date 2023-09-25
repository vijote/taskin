import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import routes from '../pages/routes';

function useLoggedUser() {
    const navigate = useNavigate();
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        console.log('effect starting');
        const userId = localStorage.getItem('userId');

        if (!userId) return navigate(routes.USER.LOGIN)

        setLoadingUser(false)
        console.log('effect done 👍');
        
    }, []);

    return loadingUser;
}

export default useLoggedUser;