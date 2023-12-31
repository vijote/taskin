import { Link } from "react-router-dom";
import routes from "./routes";

function ErrorBoundary() {
    return <div className="container">
        <h2>Bueno, esta no la esperabamos... 🫥</h2>
        <p>Parece que tuvimos un problema y no pudimos recomponernos</p>
        <Link to={routes.HOME} className="link">Volver al inicio</Link>
    </div>;
}

export default ErrorBoundary