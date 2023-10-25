// React specific
import { useEffect } from 'react'

// Services
import { GroupedTasksResponse, createTasksService } from "../api/tasks.service"
import { ApiResponse } from '../api/api.service'

// Hooks
import useQuery from "./useQuery.hook"

function useHomeData() {
    const { data, loading, makeQuery } = useQuery<[ApiResponse<GroupedTasksResponse>, ApiResponse<number>]>()

    useEffect(() => {
        const countController = new AbortController()
        const taskController = new AbortController()
        const tasksService = createTasksService()

        const getHomeDataPromise = Promise.all([
            tasksService.getAllGroupedByState(countController.signal),
            tasksService.getAll<number>(new URLSearchParams({ isCount: "true" }), countController.signal),
        ])

        makeQuery(getHomeDataPromise)

        return () => {
            countController.abort()
            taskController.abort()
        }
    }, []);

    return { data, loading }
}

export default useHomeData