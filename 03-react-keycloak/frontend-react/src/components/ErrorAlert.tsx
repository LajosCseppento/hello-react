import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';
import React from 'react';

import getErrorText from '@app/utils/error-helper';

type Props = {
  error: unknown;
  fatal?: boolean;
};

const ErrorAlert = ({error, fatal}: Props) => {
  return (
    <Alert severity="error">
      <AlertTitle>
        {fatal
          ? 'Oops, something went terribly wrong :-('
          : 'Oops, something went wrong...'}
      </AlertTitle>
      <Typography style={{whiteSpace: 'pre-wrap'}}>
        {getErrorText(error)}
      </Typography>
    </Alert>
  );
};

export default ErrorAlert;
