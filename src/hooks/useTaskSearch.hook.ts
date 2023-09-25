import { useState, useEffect } from 'react'
import { GetTasksResponse, createTasksService } from '../api/tasks.service';

function useTaskSearch(search: string) {
    const [data, setData] = useState<GetTasksResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const wakeUpPromise = createTasksService().getAllByTitle(search)
        setLoading(true);

        wakeUpPromise
            .then(data => {
                setData(data);
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setError(err);
                setLoading(false);
            });
    }, []);

    return { data, error, loading }
}

export default useTaskSearch