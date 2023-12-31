// Styles
import './ErrorMessage.css'

interface ErrorMessageProps {
    message: string
}

function ErrorMessage(props: ErrorMessageProps) {
    return (
        <div data-testid="errorMessage" className="error-message">
            <p className='message'>{props.message}</p>
        </div>
    )
}

export default ErrorMessage