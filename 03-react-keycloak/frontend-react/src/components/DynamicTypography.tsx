import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import React from 'react';

import usePromise from '@app/hooks/usePromise';

import ErrorAlert from './ErrorAlert';

type Props = {
  contentLoader: (signal?: AbortSignal) => Promise<string>;
};

const DynamicTypography = ({contentLoader}: Props) => {
  const {result: content, error, pending} = usePromise(contentLoader);

  return (
    <>
      {content && (
        <Typography sx={{whiteSpace: 'pre-wrap'}}>{content}</Typography>
      )}
      {error && <ErrorAlert error={error} />}
      {pending && <CircularProgress />}
    </>
  );
};

export default DynamicTypography;
