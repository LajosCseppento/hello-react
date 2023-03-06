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
  while (curr !== null) {
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
  // console.log(value, typeof value, value instanceof Error);
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
    // throw value;
  } else {
    return value;
  }
};

const stringify = (value: unknown): string => {
  console.log(value);
  console.log(decycle(value));
  return JSON.stringify(replacer('', decycle(value)), replacer, 2);
  // JSON.stringify(replacer('', value), replacer, 2);
};
// flattedStringify(value, replacer, 2);
// flattedStringify(replacer('', value), replacer);

export default stringify;
