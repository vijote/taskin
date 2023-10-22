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
        const tasksService = createTasksService()

        const getHomeDataPromise = Promise.all([
            tasksService.getAllGroupedByState(),
            tasksService.getAll<number>(new URLSearchParams({ isCount: "true" })),
        ])

        makeQuery(getHomeDataPromise)
    }, []);

    return { data, loading }
}

export default useHomeData