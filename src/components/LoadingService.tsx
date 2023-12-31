import LoadingSpinner from "./LoadingSpinner"
import './LoadingService.css'

interface LoadingServiceProps {
    message: string
}

function LoadingService(props: LoadingServiceProps) {
    return (
        <div data-testid="loading-service" className="loading-service">
            <h2>{props.message}</h2>
            <LoadingSpinner/>
        </div>
    )
}

export default LoadingService