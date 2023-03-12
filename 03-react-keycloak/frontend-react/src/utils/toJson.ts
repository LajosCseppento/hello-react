import {decycle} from './decycle';
import {getErrorCauseChain} from './error-helper';

const specialValue = (valueAsString: string) => ({
  $specialValue: valueAsString,
});

const error = (error: Error) => ({
  $error: error.toString(),
  $causeChain: getErrorCauseChain(error),
});

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

const toJson = (value: unknown, format = true): string => {
  return JSON.stringify(
    replacer('', decycle(value)),
    replacer,
    format ? 2 : undefined
  );
};

export default toJson;
