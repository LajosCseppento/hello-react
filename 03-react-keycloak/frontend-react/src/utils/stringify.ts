// import {decycle} from 'json-cycle';
// import {decycle} from 'json-decycle';
import {decycle} from './decycle';

// import {decycle} from 'cycle';

// import {stringify as flattedStringify} from 'flatted';

const specialValue = (valueAsString: string) => ({
  $specialValue: valueAsString,
});

const error = (error: Error) => ({
  $error: error.toString(),
  $causeChain: errorCauseChain(error),
});

const errorCauseChain = (error: Error) => {
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

const replacer = (_key: string, value: unknown) => {
  if (value === undefined) {
    return specialValue('undefined');
  } else if (typeof value === 'number' && !isFinite(value)) {
    // NaN, +/-Infinity
    return specialValue(value.toString());
  } else if (typeof value === 'bigint') {
    return specialValue(`BigInt(${value})`);
  } else if (typeof value === 'function' || typeof value === 'symbol') {
    return specialValue(value.toString());
  } else if (value instanceof Error) {
    return error(value);
  } else {
    return value;
  }
};

const stringify = (value: unknown): string => {
  return JSON.stringify(replacer('', decycle(value)), replacer, 2);
};

export default stringify;
