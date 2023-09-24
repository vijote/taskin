import { useState, useEffect } from 'react'
import APIService from '../api/api.service';
import AxiosImplementation from '../api/axiosImplementation';

function useApiWakeUp() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const wakeUpPromise = new APIService(AxiosImplementation.singleton).checkApiStatus()
    setLoading(true);

    wakeUpPromise
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

export default useApiWakeUp 