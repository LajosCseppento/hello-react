import RefreshIcon from '@mui/icons-material/Refresh';
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import React, {DispatchWithoutAction, useState} from 'react';
import {useErrorHandler} from 'react-error-boundary';
import {FormContainer, TextFieldElement} from 'react-hook-form-mui';

import client from '@app/utils/client';

type Props = {
  initialContent: string;
  reload: DispatchWithoutAction;
};

type Inputs = {
  content: string;
};

const Form = ({initialContent, reload}: Props) => {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const handleError = useErrorHandler(null);

  const onSubmit = async (data: Inputs) => {
    setLoading(true);
    try {
      await client.postEditablePage(data.content);
      setSaved(true);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box maxWidth={'md'}>
        <FormContainer
          defaultValues={{content: initialContent}}
          onSuccess={onSubmit}
        >
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
                  This form&#39;s submit relies on the top-level error boundary
                  to handle errors.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextFieldElement
                  name="content"
                  label="Content"
                  multiline
                  maxRows={15}
                  //   disabled={loading}
                  required
                  // value={content}
                  fullWidth
                />{' '}
                {/* {errors.content && (
                  <Box color="error">This field is required</Box>
                )} */}
              </Grid>
              <Grid item xs={4}>
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  //   disabled={loading}
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
                  //   disabled={loading}
                  fullWidth
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </FormContainer>
        <Snackbar
          open={saved}
          autoHideDuration={5000}
          // onClose={setSaved(false)}
        >
          <Alert
            // onClose={setSaved(false)}
            severity="success"
            // sx={{width: '100%'}}
          >
            Content saved!
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default Form;
