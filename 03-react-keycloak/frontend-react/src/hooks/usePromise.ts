import {DependencyList, useEffect, useState} from 'react';

/**
 * Cancellable promise hook. Creates `useState()` and `useEffect()` hooks under the hood.
 *
 * @param promise promise
 * @param deps `useEffect()` dependencies, `undefined` is translated to `[]`
 * @returns array of promise result, promise error and pending (boolean)
 */
const usePromise = <T>(
  promise: (signal?: AbortSignal) => Promise<T>,
  deps?: DependencyList
) => {
  const [result, setResult] = useState<T | null>();
  const [error, setError] = useState<unknown>();
  const [pending, setPending] = useState(true);

  const doReset = () => {
    setResult(undefined);
    setError(undefined);
    setPending(true);
  };

  useEffect(
    () => {
      const abortController = new AbortController();
      doReset();

      promise
        .call(null, abortController.signal)
        .then(result => {
          if (!abortController.signal.aborted) {
            setResult(result);
            setError(null);
            setPending(false);
          }
        })
        .catch((error: unknown) => {
          if (!abortController.signal.aborted) {
            setResult(null);
            setError(error);
            setPending(false);
          }
        });

      return () => {
        abortController.abort();
        doReset();
      };
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
