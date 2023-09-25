const routes = {
    HOME: "/",
    USER: {
        REGISTER: "/user/register",
    },
    TASK: {
        ALL: "/task/",
        DETAIL: (id: string) => "/task/" + id,
        NEW: "/task/new",
        STATE: (state: string) => "/task/state/" + state,
        TITLE: (search: string) => "/task/title/" + search
    }
}

export default routes 