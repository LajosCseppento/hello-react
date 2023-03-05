import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import React from 'react';

import usePromise from '@app/hooks/usePromise';

type Props = {
  loader: () => Promise<string>;
};

const DynamicTypography = ({loader}: Props) => {
  const {result, error, pending} = usePromise(loader);
  return (
    <>
      {result && (
        <Typography sx={{whiteSpace: 'pre-wrap'}}>RESULT {result}</Typography>
      )}
      {error && <div>ERROR</div>}
      {pending && <CircularProgress />}
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
      </Alert>
      {/* <Typography>{content}</Typography>
      <Typography sx{{whiteSpace: 'pre-wrap'}}>{content}</Typography> */}
    </>
  );
};

export default DynamicTypography;
