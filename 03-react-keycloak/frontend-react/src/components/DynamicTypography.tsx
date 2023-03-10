import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import React from 'react';

import usePromise from '@app/hooks/usePromise';
import getErrorText from '@app/utils/error-helper';

import ErrorAlert from './ErrorAlert';

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
      {error && <ErrorAlert error={error} />}
      {pending && <CircularProgress />}
    </>
  );
};

export default DynamicTypography;
