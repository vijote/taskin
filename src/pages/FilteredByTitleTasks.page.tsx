import { Link, useParams } from "react-router-dom"
import TaskItem from "../components/TaskItem";
import useTaskSearch from "../hooks/useTaskSearch.hook";
import routes from "./routes";

function FilteredByTitleTasksPage() {
    const { search } = useParams();
    const { data: response, loading, error } = useTaskSearch(search as string)

    if (error) return "Ocurrió un error al buscar las tareas!"

    if (loading || !response) return "Cargando tareas..."

    return (
        <section className="container">
            <Link className="link" to={routes.HOME}>Volver al inicio</Link>
            {response.data.length ?
                <>
                    <h2>Tareas encontradas</h2>
                    {response.data
                        .map(task =>
                            <TaskItem data={task} key={task.id} />
                        )}
                </>
                : null
            }
            {!response.data.length ? <p>No pudimos encontrar ninguna tarea que contenga {search} en su nombre 😔</p> : null}
        </section>
    )
}

export default FilteredByTitleTasksPage