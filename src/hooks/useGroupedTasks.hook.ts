// React specific
import { useEffect } from 'react'

// Services
import { GroupedTasksResponse, createTasksService } from '../api/tasks.service';
import useQuery from './useQuery.hook';
import { ApiResponse } from '../api/api.service';

function useGroupedTasks() {
  const { data, error, loading, makeQuery } = useQuery<ApiResponse<GroupedTasksResponse | null>>()

  useEffect(() => {
    const getTaskPromise = createTasksService().getAllGroupedByState()

    makeQuery(getTaskPromise)
  }, []);

  return { data, error, loading }
}

export default useGroupedTasks 