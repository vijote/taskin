import { useEffect } from 'react'
import { GetTasksResponse, createTasksService } from "../api/tasks.service"
import useQuery from "./useQuery.hook"

function useFilteredTasksOnMount(state: string) {
    const { data, error, loading, makeQuery } = useQuery<GetTasksResponse>()

    useEffect(() => {
        const tasksService = createTasksService()
        const getTaskPromise = tasksService.getByState(state)

        makeQuery(getTaskPromise)
    }, []);

    return { data, error, loading }
}

export default useFilteredTasksOnMount