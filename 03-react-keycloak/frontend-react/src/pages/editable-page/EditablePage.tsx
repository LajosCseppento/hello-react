import CircularProgress from '@mui/material/CircularProgress';
import React, {useReducer} from 'react';

import ErrorAlert from '@app/components/ErrorAlert';
import PageTitle from '@app/components/PageTitle';
import usePromise from '@app/hooks/usePromise';
import client from '@app/utils/client';

import Form from './Form';

const EditablePage = () => {
  const [forceUpdateCounter, forceUpdate] = useReducer(x => x + 1, 0);
  const {
    result: initialContent,
    error,
    pending,
  } = usePromise(client.getEditablePage, [forceUpdateCounter]);

  return (
    <>
      <PageTitle value="Editable Page" />

      {initialContent && (
        <Form initialContent={initialContent} reload={forceUpdate} />
      )}
      {error && <ErrorAlert error={error} />}
      {pending && <CircularProgress />}
    </>
  );
};

export default EditablePage;
