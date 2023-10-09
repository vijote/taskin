import { useState } from 'react';

type QueryError = {
    response: {
        data: { error: string }
    }
}

function useQueryError<T>() {
    const [error, setError] = useState<QueryError | null>(null);
    const [loading, setLoading] = useState(false);

    const makeQuery = (request: Promise<T>) => {
        setLoading(true);

        request
            .then(() => {
                resetState()
            })
            .catch((error) => {
                setLoading(false)
                setError(error)
            })

        return request
    }

    function resetState() {
        setError(null)
        setLoading(false)
    }

    return {
        error,
        loading,
        makeQuery,
        resetState
    };
}

export default useQueryError;
