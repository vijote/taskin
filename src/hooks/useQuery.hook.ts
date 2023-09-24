import { AxiosError } from 'axios';
import { useState } from 'react';

type HTTPErrorData = {
    message: string
    error: string
}

function useQuery<T>() {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<AxiosError<HTTPErrorData> | null>(null);


    const makeQuery = (request: Promise<T>) => {
        setLoading(true);

        request
            .then((data) => {
                setData(data);
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setError(err);
                setLoading(false);
            });

        return request
    }

    return {
        data,
        error,
        loading,
        makeQuery
    };
}

export default useQuery;