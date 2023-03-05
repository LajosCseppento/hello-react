import {AxiosError} from 'axios';

const extractErrorText = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const message = `${error.name}: ${error.message} [${error.code}]`;
    const detail = error.response?.data?.detail;
    return detail ? `${detail}\n\n(${message})` : message;
  } else {
    const text = error?.toString();
    return text === undefined ? '<undefined>' : text;
  }
};

export default extractErrorText;
