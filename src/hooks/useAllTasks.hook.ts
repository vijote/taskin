import { useEffect } from 'react'
import { Task, createTasksService } from "../api/tasks.service"
import useQuery from "./useQuery.hook"
import { ApiResponse } from '../api/api.service'

function useAllTasks(initialOptions: URLSearchParams) {
    const { data, loading, makeQuery } = useQuery<ApiResponse<Task[] | number> | ApiResponse<number>>()

    const refetch = (options: URLSearchParams) => {
        const tasksService = createTasksService()
        const getTaskPromise = tasksService.getAll(options)

        makeQuery(getTaskPromise)
    }

    useEffect(() => {
        refetch(initialOptions)
    }, []);

    return { data, loading, refetch }
}

export default useAllTasks