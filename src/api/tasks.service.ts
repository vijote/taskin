import { HTTPLib, APIService, HTTPRequestOptions, ApiResponse } from "./api.service";
import AxiosImplementation from "./axiosImplementation";

export type Task = {
    id: string;
    createdAt: Date;
    title: string;
    content: string;
    state: string;
};

export type GroupedTasksResponse = {
    toDo: Task[];
    inProgress: Task[];
    done: Task[];
}

class TasksService extends APIService {
    private userId: string;
    private onRequest: Function;

    constructor(httpLib: HTTPLib, userId: string, onRequest: Function = () => { }) {
        super(httpLib);
        this.userId = userId;
        this.onRequest = onRequest;
    }

    protected async request<T>(options: HTTPRequestOptions) {
        this.onRequest()

        return super.request<T>({
            ...options,
            headers: {
                'user-id': this.userId
            }
        })
    }

    async create(title: string, content: string): Promise<ApiResponse<Task>> {
        return this.request<Task>({
            method: "POST",
            url: '/tasks',
            data: { title, content }
        });
    }

    async getAllGroupedByState(): Promise<ApiResponse<GroupedTasksResponse>> {
        return this.request<GroupedTasksResponse>({
            method: 'GET',
            url: '/tasks/grouped-by-state',
        });
    }

    async getAll<T>(options: URLSearchParams, abortSignal?: AbortSignal): Promise<ApiResponse<T>> {
        const queryString = options.toString();

        return this.request<T>({
            method: 'GET',
            signal: abortSignal,
            url: `/tasks${queryString ? '?' + queryString : ''}`,
        });
    }

    async get(id: string): Promise<ApiResponse<Task>> {
        return this.request<Task>({
            method: 'GET',
            url: `/tasks/${encodeURIComponent(id)}`,
        });
    }

    async update(options: Partial<Omit<Task, "createdAt">>): Promise<ApiResponse<Task>> {
        return this.request<Task>({
            method: 'PUT',
            url: `/tasks/${encodeURIComponent(options.id!)}`,
            data: options,
        });
    }

    async delete(id: string): Promise<ApiResponse<void>> {
        return this.request<void>({
            method: 'DELETE',
            url: `/tasks/${encodeURIComponent(id)}`,
        });
    }
}

export function createTasksService() {
    function onRequest() {
        const requestEvent = new Event("request")

        document.dispatchEvent(requestEvent)
    }

    return new TasksService(
        AxiosImplementation.singleton,
        localStorage.getItem("userId") as string,
        onRequest);
}

export default TasksService;