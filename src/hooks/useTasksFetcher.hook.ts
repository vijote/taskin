import { useState, useEffect } from 'react'
import AxiosImplementation from '../api/axiosImplementation';
import TasksService, { GetTasksResponse } from '../api/tasks.service';

function useTasksFetcher(userId: string) {
  const [data, setData] = useState<GetTasksResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const wakeUpPromise = new TasksService(AxiosImplementation.singleton, userId).getAll()
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

export default useTasksFetcher 