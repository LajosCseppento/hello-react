import {useEffect, useState} from 'react';

const usePromise = <T>(promise: () => Promise<T>) => {
  const [result, setResult] = useState<T | null>();
  const [error, setError] = useState<unknown>();
  const [pending, setPending] = useState(true);

  useEffect(() => {
    promise
      .call(null)
      .then(result => {
        setResult(result);
        setError(null);
        setPending(false);
      })
      .catch((error: unknown) => {
        setResult(null);
        setError(error);
        setPending(false);
      });
  }, []);

  return {
    result,
    error,
    pending,
  };
};

export default usePromise;
