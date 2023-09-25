interface HTTPResponse<T> {
    data: T
}

interface HTTPRequestOptions {
    method: "POST" | "PUT" | "GET" | "DELETE"
    data?: object
    url: string
    timeout?: number,
    headers?: Record<string, string>
}

export interface HTTPLib {
    request<T>(options: HTTPRequestOptions): Promise<HTTPResponse<T>>
}

class APIService {
    public http: HTTPLib

    constructor(httpLib: HTTPLib) {
        this.http = httpLib;
    }

    public checkApiStatus() {
        return this.http.request({
            method: "GET",
            url:'/',
            timeout: 100_000
        })
    }
}

export default APIService