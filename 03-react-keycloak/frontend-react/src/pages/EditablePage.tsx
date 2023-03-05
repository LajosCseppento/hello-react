import RefreshIcon from '@mui/icons-material/Refresh';
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
// import SendIcon from '@mui/icons-material';
// import Button from '@mui/material/Button';
// import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Rating from '@mui/material/Rating';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, {FormEvent, useEffect, useState} from 'react';
import {useErrorHandler} from 'react-error-boundary';
import {useLocation} from 'react-router-dom';

import client, {doRequest} from '@app/utils/client';

export type EditablePageProps = {
  title: string;
  getRequest: () => Promise<string>;
  setRequest: (content: string) => Promise<unknown>;
};

export default function EditablePage(props: EditablePageProps) {
  const [content, setContent] = useState('Loading...');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const location = useLocation();
  const handleError = useErrorHandler(null);

  const reload = () => {
    setLoading(true);
    doRequest(
      props.getRequest,
      content => {
        setContent(content);
      },
      handleError
    ).finally(() => setLoading(false));
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.currentTarget.value);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    doRequest(
      () => client.postEditablePage(content),
      () => {
        setSaved(true);
      },
      handleError
    ).finally(() => setLoading(false));
  };

  useEffect(() => {
    reload();
  }, [location]);

  return (
    <>
      <h2>{props.title}</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormControl disabled={true}>
              {/* <fieldset > */}
              <TextField
                label="Content"
                multiline
                maxRows={5}
                disabled={loading}
                onChange={handleContentChange}
                value={content}
              />
              <Button
                type="submit"
                variant="contained"
                startIcon={<SendIcon />}
                disabled={loading}
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                disabled={loading}
                onClick={reload}
              >
                Reload
              </Button>
            </FormControl>
          </FormGroup>
          <Snackbar
            open={saved}
            autoHideDuration={6000}
            // onClose={setSaved(false)}
          >
            <Alert
              // onClose={setSaved(false)}
              severity="success"
              sx={{width: '100%'}}
            >
              Content saved!
            </Alert>
          </Snackbar>
        </form>
      </div>
    </>
  );
}
