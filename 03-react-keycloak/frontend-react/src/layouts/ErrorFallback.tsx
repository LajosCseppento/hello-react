import SailingIcon from '@mui/icons-material/Sailing';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import React from 'react';
import {FallbackProps} from 'react-error-boundary';

import getErrorText from '@app/utils/error-helper';

const ErrorFallback = (props: FallbackProps) => {
  const error = props.error;
  const boatCount = Math.floor(Math.random() * 10) + 1;

  return (
    <Alert severity="error">
      <AlertTitle>Oops, something went terribly wrong :-(</AlertTitle>
      <Typography padding={2} style={{whiteSpace: 'pre-wrap'}}>
        {getErrorText(error)}
      </Typography>
      <Typography padding={2}>
        No promise that{' '}
        <Link href="#" onClick={props.resetErrorBoundary}>
          reset
        </Link>{' '}
        will solve this issue, but worth a try...
      </Typography>
      <Typography padding={2}>
        {[...Array(boatCount)].map((_, i) => (
          <SailingIcon key={i} />
        ))}
      </Typography>
    </Alert>
  );
};

export default ErrorFallback;
