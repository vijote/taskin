import { useEffect } from 'react'
import useQuery from './useQuery.hook';
import { Task, createTasksService } from '../api/tasks.service';
import { ApiResponse } from '../api/api.service';

function useTaskFetcherOnMount(id: string) {
    const { data, error, loading, makeQuery } = useQuery<ApiResponse<Task>>()

    const refetch = () => {
        const tasksService = createTasksService()
        const getTaskPromise = tasksService.get(id)

        makeQuery(getTaskPromise)
    }

    useEffect(() => {

        const tasksService = createTasksService()
        const getTaskPromise = tasksService.get(id)

        makeQuery(getTaskPromise)
    }, []);

    return { data, error, loading, refetch }
}

export default useTaskFetcherOnMount 