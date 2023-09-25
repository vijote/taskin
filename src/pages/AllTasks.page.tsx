// React specific
import { Link, useSearchParams } from "react-router-dom"

// Components
import TaskItem from "../components/TaskItem";
import OrderTasksHeader from "../components/OrderTasksHeader";
import TaskFilters from "../components/TaskFilters";

// Hooks
import useAllTasks from "../hooks/useAllTasks.hook";

// Services
import { Task } from "../api/tasks.service";
import routes from "./routes";
import LoadingService from "../components/LoadingService";

function AllTasksPage() {
    const [searchParams] = useSearchParams()
    const { data: response, loading, error, refetch } = useAllTasks(searchParams)
    const tasks = response?.data as Task[]

    function onURLParamsChange(newParams: URLSearchParams) {
        refetch(newParams)
    }

    if (error) return "Ocurrió un error al obtener las tareas!"

    if (loading || !response) return <LoadingService message="Cargando tareas"/>

    return (
        <section className="container">
            <Link className="link" to={routes.HOME}>Volver al inicio</Link>
            <h2>Buscar tareas </h2>
            <TaskFilters onFiltersChange={onURLParamsChange}/>
            <OrderTasksHeader onSearchParamsChange={onURLParamsChange} />
            {tasks
                .map(task =>
                    <TaskItem data={task} key={task.id} />
                )}
            {(!tasks.length && searchParams.size) && <p>No pudimos encontrar ninguna tarea que coincida con tus filtros 😔</p>}
        </section>
    )
}

export default AllTasksPage