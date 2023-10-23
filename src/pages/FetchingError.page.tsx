// React specific
import { useNavigate } from "react-router-dom"

// Assets
import errorImage from '../assets/fetch_error.png'

// Styles
import './FetchingError.css'

interface FetchingErrorProps {
    message: string
}

function FetchingError(props: FetchingErrorProps) {
    const navigate = useNavigate()

    function refreshPage() {
        navigate(0)
    }

    return (
        <div className="container">
            <div data-testid="fetchingError" className="error-container">
                <h2>{props.message}</h2>
                <img src={errorImage} alt="Error fetching data" />
                <p>Querés <span className="link" onClick={refreshPage}>reintentar</span>?</p>
            </div>
        </div>
    )
}

export default FetchingError