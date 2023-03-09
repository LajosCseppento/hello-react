import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';
import React from 'react';
import {FallbackProps} from 'react-error-boundary';

import getErrorText from '@app/utils/error-helper';

const ErrorFallback = (props: FallbackProps) => {
  // Note: no "Try again" to reset error boundary, as probably it would not do anything, just annoy the user
  const error = props.error;
  return (
    <>
      <Alert severity="error">
        <AlertTitle>Oops, something went terribly wrong :-(</AlertTitle>
        <Typography style={{whiteSpace: 'pre-wrap'}}>
          {getErrorText(error)}
        </Typography>
      </Alert>
    </>
  );
};

export default ErrorFallback;
