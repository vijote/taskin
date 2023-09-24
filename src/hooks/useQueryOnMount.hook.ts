import { useEffect } from 'react'
import useQuery from './useQuery.hook';

function useQueryOnMount<T>(request: Promise<T>) {
  const {data, error, loading, makeQuery} = useQuery<T>()

  useEffect(() => {
    makeQuery(request)
  }, []);

  return { data, error, loading }
}

export default useQueryOnMount 