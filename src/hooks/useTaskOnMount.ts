import { useEffect } from 'react'
import useQuery from './useQuery.hook';
import { createTasksService } from '../api/tasks.service';
import { GetTaskResponse } from '../api/tasks.service'

function useTaskFetcherOnMount(id: string) {
    const { data, error, loading, makeQuery } = useQuery<GetTaskResponse>()

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