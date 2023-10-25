import { useEffect } from 'react'
import useQuery from './useQuery.hook';
import { Task, createTasksService } from '../api/tasks.service';
import { ApiResponse } from '../api/api.service';

function useTask(id: string) {
    const { data, loading, makeQuery } = useQuery<ApiResponse<Task>>()

    const refetch = () => {
        const tasksService = createTasksService()
        const getTaskPromise = tasksService.get(id)

        makeQuery(getTaskPromise)
    }

    useEffect(() => {
        const taskController = new AbortController()

        const tasksService = createTasksService()
        const getTaskPromise = tasksService.get(id, taskController.signal)

        makeQuery(getTaskPromise)

        return () => {
            taskController.abort()
        }
    }, []);

    return { data, loading, refetch }
}

export default useTask 