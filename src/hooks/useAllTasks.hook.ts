import { useEffect } from 'react'
import { Task, createTasksService } from "../api/tasks.service"
import useQuery from "./useQuery.hook"
import { ApiResponse } from '../api/api.service'

function useAllTasks(initialOptions: URLSearchParams) {
    const { data, loading, makeQuery } = useQuery<ApiResponse<Task[]>>()

    const refetch = (options: URLSearchParams, abortSignal?: AbortSignal) => {
        const tasksService = createTasksService()
        const getTaskPromise = tasksService.getAll<Task[]>(options, abortSignal)

        makeQuery(getTaskPromise)
    }

    useEffect(() => {
        const abortController = new AbortController()

        refetch(initialOptions, abortController.signal)

        return () => {
            abortController.abort()
        }
    }, []);

    return { data, loading, refetch }
}

export default useAllTasks