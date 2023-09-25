// React specific
import { useState, useEffect } from 'react'

// Services
import { GroupedTasksResponse, createTasksService } from '../api/tasks.service';

function useTasksFetcher() {
  const [data, setData] = useState<GroupedTasksResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTasksPromise = createTasksService().getAllGroupedByState()
    setLoading(true);

    getTasksPromise
      .then(response => {        
        setData(response.data);
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