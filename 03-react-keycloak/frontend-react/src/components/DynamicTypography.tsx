import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import React from 'react';

import usePromise from '@app/hooks/usePromise';
import getErrorText from '@app/utils/error-helper';

type Props = {
  loader: () => Promise<string>;
};

const DynamicTypography = ({loader}: Props) => {
  const {result, error, pending} = usePromise(loader);

  return (
    <>
      {result && (
        <Typography sx={{whiteSpace: 'pre-wrap'}}>{result}</Typography>
      )}
      {error && (
        <Alert severity="error">
          <AlertTitle>Oops, something went wrong...</AlertTitle>
          <Typography style={{whiteSpace: 'pre-wrap'}}>
            {getErrorText(error)}
          </Typography>
        </Alert>
      )}
      {pending && <CircularProgress />}
    </>
  );
};

export default DynamicTypography;
