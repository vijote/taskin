import AxiosImplementation from "./axiosImplementation"

export type ApiResponse<T> = {
    message: string
    data: T
}

export interface HTTPRequestOptions {
    method: "POST" | "PUT" | "GET" | "DELETE"
    data?: object
    url: string
    timeout?: number,
    headers?: Record<string, string>
}

export interface HTTPLib {
    request<T>(options: HTTPRequestOptions): Promise<{ data: ApiResponse<T> }>
}

export class APIService {
    protected http: HTTPLib

    constructor(httpLib: HTTPLib) {
        this.http = httpLib;
    }

    protected async request<T>(options: HTTPRequestOptions) {
        const response = await this.http.request<T>(options)

        return response.data
    }

    public checkApiStatus() {
        return this.http.request<string>({
            method: "GET",
            url: '/',
            timeout: 500_000
        })
    }
}
function createApiService() {
    return new APIService(AxiosImplementation.singleton)
}

export default createApiService