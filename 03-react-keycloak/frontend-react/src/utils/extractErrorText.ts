import {AxiosError} from 'axios';

const extractErrorText = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const message = `${error.name}: ${error.message} [${error.code}]`;
    const detail = error.response?.data?.detail;
    return detail ? `${detail}\n\n(${message})` : message;
  } else if (error instanceof Error) {
    return error.toString();
  } else {
    // TODO
    return JSON.stringify(error);
    // ( key: string, value: any) => any, space?: string | number))
  }
  // if (error === null) {
  //   return '<null>';
  // } else if (error instanceof AxiosError) {
  //   const message = `${error.name}: ${error.message} [${error.code}]`;
  //   const detail = error.response?.data?.detail;
  //   return detail ? `${detail}\n\n(${message})` : message;
  // } else {
  //   const text = error?.toString();
  //   return text === undefined ? '<undefined>' : text;
  // }
};

export default extractErrorText;
