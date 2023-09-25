import { Link, useSearchParams } from "react-router-dom"
import TaskItem from "../components/TaskItem";
import useAllTasks from "../hooks/useAllTasks.hook";
import routes from "./routes";
import OrderTasksHeader from "../components/OrderTasksHeader";

function AllTasksPage() {
    const [searchParams] = useSearchParams()
    const { data: response, loading, error, refetch } = useAllTasks(searchParams)

    function onSearchChange(newParams: URLSearchParams) {
        refetch(newParams)
    }

    if (error) return "Ocurrió un error al obtener las tareas!"

    if (loading || !response) return "Cargando tareas..."

    return (
        <section className="container">
            <Link className="link" to={routes.HOME}>Volver al inicio</Link>
            <h2>Tareas </h2>
            <OrderTasksHeader onSearchChange={onSearchChange} />
            {response.data
                .map(task =>
                    <TaskItem data={task} key={task.id} />
                )}
        </section>
    )
}

export default AllTasksPage