import AuthenticationContext from '../utils/auth';
import {Button} from '@mui/material';
import Typography from '@mui/material/Typography';
import React, {useContext} from 'react';

export default function UserInfo() {
  const auth = useContext(AuthenticationContext);

  return (
    <>
      <Typography>Hello {auth.currentUser.firstName}!</Typography>
      <Button onClick={auth.logout}>Logout</Button>
    </>
  );
}
