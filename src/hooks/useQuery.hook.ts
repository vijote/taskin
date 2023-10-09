import { useState } from 'react';

function useQuery<T>() {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);

    const makeQuery = (request: Promise<T>) => {
        setLoading(true);

        request
            .then((data) => {
                setData(data);
                setLoading(false)
            })

        return request
    }

    return {
        data,
        loading,
        makeQuery
    };
}

export default useQuery;