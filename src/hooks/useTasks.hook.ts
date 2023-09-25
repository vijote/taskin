import { useState, useEffect } from 'react'
import AxiosImplementation from '../api/axiosImplementation';
import TasksService, { GetGroupedTasksResponse } from '../api/tasks.service';

function useTasksFetcher(userId: string) {
  const [data, setData] = useState<GetGroupedTasksResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTasksPromise = new TasksService(AxiosImplementation.singleton, userId).getAllGroupedByState()
    setLoading(true);

    getTasksPromise
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