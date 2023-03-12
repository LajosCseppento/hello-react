import {AxiosError} from 'axios';

import toJson from './toJson';

/**
 * Extracts the chain of an error as a string array. The cause will string with the top-level error.
 *
 * @param error an error
 * @returns array of error chain
 */
export const getErrorChainAsStrings = (error: Error) => {
  const chain: string[] = [];
  chain.push(error.toString());

  let curr: unknown = error.cause;
  while (curr !== null && curr !== undefined) {
    if (curr instanceof Error) {
      chain.push('Caused by: ' + curr.toString());
      curr = curr.cause;
    } else {
      chain.push('Caused by: ' + curr);
      curr = null;
    }
  }

  return chain;
};

/**
 * Extracts the cause chain of an error. The cause chain will not contain the top-level error.
 *
 * @param error an error
 * @returns array of error cause chain
 */
export const getErrorCauseChain = (error: Error) => {
  const chain: unknown[] = [];

  let curr: unknown = error.cause;
  while (curr !== null && curr !== undefined) {
    if (curr instanceof Error) {
      chain.push(curr.toString());
      curr = curr.cause;
    } else {
      chain.push(curr);
      curr = null;
    }
  }

  return chain;
};

/**
 * Extracts the text representation for an error.
 *
 * @param error an error
 * @returns error text
 */
export const getErrorText = (error: unknown): string => {
  if (error === undefined) {
    return '<undefined>';
  } else if (error === null) {
    return '<null>';
  } else if (error instanceof AxiosError) {
    const message = `${error.name}: ${error.message} [${error.code}]`;
    const detail = error.response?.data?.detail;
    return detail ? `${detail}\n\n(${message})` : message;
  } else if (error instanceof Error) {
    return getErrorChainAsStrings(error).join('\n');
  } else if (typeof error === 'function' || typeof error === 'object') {
    return toJson(error);
  } else {
    return error.toString();
  }
};

export default getErrorText;
