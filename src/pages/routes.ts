const routes = {
    HOME: "/",
    USER: {
        LOGIN: "/user/login",
    },
    TASK: {
        ALL: (params?: URLSearchParams) => params?.size ? `/task?${params.toString()}` : "/task",
        DETAIL: (id: string) => "/task/" + id,
        NEW: "/task/new"
    }
}

export default routes 