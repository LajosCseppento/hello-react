import Typography from '@mui/material/Typography';
import React, {useEffect, useState} from 'react';
import {useErrorHandler} from 'react-error-boundary';
import {useLocation} from 'react-router-dom';

import {doRequest} from '@app/utils/client';

export type PageProps = {
  title: string;
  request: () => Promise<string>;
};

export default function Page(props: PageProps) {
  const [content, setContent] = useState('Loading...');
  const location = useLocation();
  const handleError = useErrorHandler(null);

  useEffect(() => {
    setContent('Loading...');
    doRequest(props.request, setContent, handleError);
  }, [location]);

  return (
    <>
      <Typography variant="h2">{props.title}</Typography>
      <Typography>{content}</Typography>
      <Typography style={{whiteSpace: 'pre-wrap'}}>{content}</Typography>
    </>
  );
}
