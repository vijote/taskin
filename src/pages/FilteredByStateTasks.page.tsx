import { Link, useParams } from "react-router-dom"
import useFilteredTasksOnMount from "../hooks/useFilteredTasksOnMount.hook"
import TaskItem from "../components/TaskItem";
import taskState from "../api/taskState";
import routes from "./routes";

function FilteredByStateTasksPage() {
    const { state } = useParams();
    const { data: response, loading, error } = useFilteredTasksOnMount(state as string)

    if (error) return "Ocurrió un error al obtener las tareas!"

    if (loading || !response) return "Cargando tareas..."
    console.log(response.data);

    return (
        <section className="container">
            <Link className="link" to={routes.HOME}>Volver al inicio</Link>
            <h2>Tareas {taskState[state as string]}</h2>
            {response.data
                .map(task =>
                    <TaskItem data={task} key={task.id} />
                )}
        </section>
    )
}

export default FilteredByStateTasksPage