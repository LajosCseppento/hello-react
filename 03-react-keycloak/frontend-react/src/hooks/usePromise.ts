import {DependencyList, useEffect, useState} from 'react';

/**
 * Promise hook. Creates `useState()` and `useEffect()` hooks under the hood.
 *
 * @param promise promise
 * @param deps `useEffect()` dependencies, `undefined` is translated to `[]`
 * @returns array of promise result, promise error and pending (boolean)
 */
const usePromise = <T>(promise: () => Promise<T>, deps?: DependencyList) => {
  const [result, setResult] = useState<T | null>();
  const [error, setError] = useState<unknown>();
  const [pending, setPending] = useState(true);

  useEffect(
    () => {
      setResult(null);
      setError(undefined);
      setPending(true);

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
    },
    deps === undefined ? [] : deps
  );

  return {
    result,
    error,
    pending,
  };
};

export default usePromise;
