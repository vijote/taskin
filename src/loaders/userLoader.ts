// React specific
import { redirect } from "react-router-dom"

//Services
import routes from "../pages/routes";

export type User = {
    name: string,
    id: string
}

function userLoader(): User | Response {
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    if (!userId || !userName) return redirect(routes.USER.LOGIN)

    return {
        name: userName,
        id: userId
    }
}

export default userLoader