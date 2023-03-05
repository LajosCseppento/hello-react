import ReplayIcon from '@mui/icons-material/Replay';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {AxiosError} from 'axios';
import React from 'react';
import {FallbackProps} from 'react-error-boundary';
import {isElementAccessExpression} from 'typescript';

import PageTitle from '@app/components/PageTitle';

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

const ErrorFallback = (props: FallbackProps) => {
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
    <>
      <Alert severity="error">
        <AlertTitle>Something went wrong</AlertTitle>
        <Typography style={{whiteSpace: 'pre-wrap'}}>{text}</Typography>
        <Button
          onClick={props.resetErrorBoundary}
          variant="text"
          color="error"
          endIcon={<ReplayIcon />}
        >
          Try again
        </Button>
      </Alert>
    </>
  );
};

export default ErrorFallback;
