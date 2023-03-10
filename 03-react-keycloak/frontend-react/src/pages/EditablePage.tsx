import RefreshIcon from '@mui/icons-material/Refresh';
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, {useEffect, useState} from 'react';
import {useErrorHandler} from 'react-error-boundary';

import PageTitle from '@app/components/PageTitle';
import client from '@app/utils/client';

const EditablePage = () => {
  // const {result, error, pending} = usePromise(client.getEditablePage);

  const [content, setContent] = useState('Loading...');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const handleError = useErrorHandler(null);

  const reload = async () => {
    setLoading(true);

    try {
      setContent(await client.getEditablePage());
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.currentTarget.value);
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await client.postEditablePage(content);
      setSaved(true);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  return (
    <>
      <PageTitle value="Editable page" />

      <Box maxWidth={'md'}>
        <form onSubmit={handleSubmit}>
          <FormControl disabled={loading} fullWidth>
            <Grid
              container
              spacing={2}
              justifyContent="flex-start"
              alignItems="flex-start"
              alignContent="stretch"
            >
              <Grid item xs={12}>
                <Typography>
                  This page uses error boundary, no included error handler.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Content"
                  multiline
                  maxRows={5}
                  disabled={loading}
                  onChange={handleContentChange}
                  value={content}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  disabled={loading}
                  onClick={reload}
                  fullWidth
                >
                  Reload
                </Button>
              </Grid>
              <Grid item xs={8}>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<SendIcon />}
                  disabled={loading}
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </form>

        <form onSubmit={handleSubmit}>
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
      </Box>
    </>
  );
};

export default EditablePage;
