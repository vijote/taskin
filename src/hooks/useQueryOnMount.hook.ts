import { useState, useEffect } from 'react'

function useQueryOnMount(request: Promise<object>) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

  return { data, error, loading }
}

export default useQueryOnMount 