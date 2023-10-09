// React specific
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Loaders
import apiLoader from "../loaders/apiLoader";
import homeLoader from "../loaders/homeLoader";

// Pages
import Layout from "./Layout";
import HomePage from "./Home.page";
import LoginPage from "./Login.page";
import AllTasksPage from "./AllTasks.page";
import NewTaskPage from "./NewTask.page";
import TaskDetailPage from "./TaskDetail.page";

// Services
import AxiosImplementation from "../api/axiosImplementation";
import ErrorBoundary from "./ErrorBoundary";
import NotFoundPage from "./NotFound.page";
import userLoader from "../loaders/userLoader";
import FetchingError from "../errors/FetchingError";

AxiosImplementation.setSingleton({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    timeout: 5000
})

const router = createBrowserRouter([
    {
        path: "/",
        loader: apiLoader,
        element: <Layout />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                index: true,
                element: <HomePage />,
                loader: homeLoader,
                errorElement: <FetchingError message='Ocurrió un error al cargar las tareas!' />,
            },
            {
                path: 'user',
                children: [{
                    path: 'login',
                    element: <LoginPage />,
                }]
            },
            {
                path: 'task',
                loader: userLoader,
                children: [
                    {
                        index: true,
                        errorElement: <FetchingError message="Ocurrió un error al obtener las tareas!" />,
                        element: <AllTasksPage />
                    },
                    {
                        path: 'new',
                        element: <NewTaskPage />
                    },
                    {
                        path: ':taskId',
                        errorElement: <FetchingError message="Ocurrió un error al cargar la tarea!" />,
                        element: <TaskDetailPage />
                    },
                ]
            },
            {
                path: "*",
                element: <NotFoundPage />
            },
        ],
    },
]);

export default function Router() {
    return <RouterProvider router={router} />
}