import APIService, { HTTPLib } from "./api.service";
import AxiosImplementation from "./axiosImplementation";

export type CreateTaskResponse = {
    data: {
        id: string
    },
    message: string
}

export type UpdateTaskResponse = {
    data: Task,
    message: string
}

export type DeleteTaskResponse = {
    message: string
}

export type GetGroupedTasksResponse = {
    data: {
        toDo: Task[]
        inProgress: Task[]
        done: Task[]
    }
    message: string
}

export type GetTasksResponse = {
    data: Task[] | number
    message: string
}

export type GetTaskResponse = {
    data: Task
    message: string
}

export type Task = {
    id: string
    createdAt: Date
    title: string
    content: string
    state: string
}

export interface GetTasksOptions {
    isCount?: boolean
    title?: string
    state?: string
}

interface UpdateTaskOptions {
    id: string
    title?: string
    content?: string
    state?: string
}

class TasksService extends APIService {
    /**
     * Enconded id required to authenticate user
     */
    private userId: string

    constructor(httpLib: HTTPLib, userId: string) {
        super(httpLib)

        this.userId = userId
    }

    async create(title: string, content: string): Promise<CreateTaskResponse> {
        const response = await this.http.request<CreateTaskResponse>({
            data: { title, content },
            method: 'POST',
            url: '/tasks',
            headers: {
                "user-id": this.userId
            }
        });

        if (!response.data) {
            throw new Error("Empty response!");
        }

        return response.data;
    }

    async getAllGroupedByState(): Promise<GetGroupedTasksResponse> {
        const response = await this.http.request<GetGroupedTasksResponse>({
            method: 'GET',
            url: '/tasks/grouped-by-state',
            headers: {
                "user-id": this.userId
            }
        });

        if (!response.data) {
            throw new Error("Empty response!");
        }

        return response.data;
    }

    async getAllByTitle(search: string): Promise<GetTasksResponse> {
        const response = await this.http.request<GetTasksResponse>({
            method: 'GET',
            url: `/tasks/filter-by-title/${encodeURIComponent(search)}`,
            headers: {
                "user-id": this.userId
            }
        });

        if (!response.data) {
            throw new Error("Empty response!");
        }

        return response.data;
    }

    async getAll(options: URLSearchParams): Promise<GetTasksResponse> {
        const response = await this.http.request<GetTasksResponse>({
            method: 'GET',
            url: `/tasks${options.size ? "?" + options.toString() : ""}`,
            headers: {
                "user-id": this.userId
            }
        });

        if (!response.data) {
            throw new Error("Empty response!");
        }

        return response.data;
    }

    async get(id: string): Promise<GetTaskResponse> {
        const response = await this.http.request<GetTaskResponse>({
            method: 'GET',
            url: `/tasks/${encodeURIComponent(id)}`,
            headers: {
                "user-id": this.userId
            }
        });

        if (!response.data) {
            throw new Error("Empty response!");
        }

        return response.data;
    }

    async update(options: UpdateTaskOptions): Promise<UpdateTaskResponse> {
        const response = await this.http.request<UpdateTaskResponse>({
            data: options,
            method: 'PUT',
            url: `/tasks/${encodeURIComponent(options.id)}`,
            headers: {
                "user-id": this.userId
            }
        });

        if (!response.data) {
            throw new Error("Empty response!");
        }

        return response.data;
    }

    async delete(id: string) {
        const response = await this.http.request<UpdateTaskResponse>({
            method: 'DELETE',
            url: `/tasks/${encodeURIComponent(id)}`,
            headers: {
                "user-id": this.userId
            }
        });

        if (!response.data) {
            throw new Error("Empty response!");
        }

        return response.data;
    }

    async getByState(state: string) {
        const response = await this.http.request<GetTasksResponse>({
            method: 'GET',
            url: `/tasks/filter-by-state/${encodeURIComponent(state)}`,
            headers: {
                "user-id": this.userId
            }
        });

        if (!response.data) {
            throw new Error("Empty response!");
        }

        return response.data;
    }
}

export function createTasksService() {
    return new TasksService(AxiosImplementation.singleton, localStorage.getItem("userId") as string)
}

export default TasksService