//Services
import { GroupedTasksResponse, createTasksService } from "../api/tasks.service";
import { ApiResponse } from "../api/api.service";
import userLoader, { User } from "./userLoader";

export type HomeLoaderResponse = {
    tasks: ApiResponse<GroupedTasksResponse>,
    count: ApiResponse<number>,
    userName: string,
}

async function homeLoader(): Promise<HomeLoaderResponse | void> {
    const tasksService = createTasksService()
    const user = userLoader() as User

    if(!user.id) return

    const [tasks, taskCount] = await Promise.all([tasksService.getAllGroupedByState(), tasksService.getAll(new URLSearchParams({ isCount: "true" }))])

    return { userName: user.name, tasks, count: taskCount as ApiResponse<number> }
}

export default homeLoader