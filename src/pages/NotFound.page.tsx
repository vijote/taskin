import { Link } from "react-router-dom"
import routes from "./routes"
import useTitle from "../hooks/useTitle.hook"

function NotFoundPage() {
    useTitle("Pagina no encontrada | Taskin", { restoreOnUnmount: true })
    return (
        <div className="container">
            <h2>Esta página no existe</h2>
            <p>Pero las que si existen están muy buenas!</p>
            <Link to={routes.HOME} className="link mt-1">Ir al inicio</Link>
        </div>
    )
}

export default NotFoundPage