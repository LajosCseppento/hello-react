import {AxiosError} from 'axios';
import React from 'react';
import {FallbackProps} from 'react-error-boundary';

export default function ErrorFallback(props: FallbackProps) {
  const error = props.error;
  let text;

  if (error instanceof AxiosError) {
    const message = `${error.name}: ${error.message} [${error.code}]`;
    const detail = error.response?.data?.detail;
    if (detail) {
      text = `${detail}\n\n(${message})`;
    } else {
      text = message;
    }
  } else {
    text = error?.toString();
  }

  return (
    <div>
      <p>Something went wrong:</p>
      <div style={{whiteSpace: 'pre-wrap'}}>{text}</div>
      <button onClick={props.resetErrorBoundary}>Try again</button>
    </div>
  );
}
