import { useEffect } from 'react'
import { GetTasksResponse, createTasksService } from "../api/tasks.service"
import useQuery from "./useQuery.hook"

function useAllTasks(initialOptions: URLSearchParams) {
    const { data, error, loading, makeQuery } = useQuery<GetTasksResponse>()

    const refetch = (options: URLSearchParams) => {
        const tasksService = createTasksService()
        const getTaskPromise = tasksService.getAll(options)

        makeQuery(getTaskPromise)
    }

    useEffect(() => {
        refetch(initialOptions)
    }, []);

    return { data, error, loading, refetch }
}

export default useAllTasks