import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import React, {useContext} from 'react';

import AuthenticationContext from '@app/context/AuthenticationContext';

const ProfilePage = () => {
  const currentUser = useContext(AuthenticationContext).currentUser;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Username:</TableCell>
            <TableCell>{currentUser.username}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>First name:</TableCell>
            <TableCell>{currentUser.firstName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Last name:</TableCell>
            <TableCell>{currentUser.lastName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>E-mail:</TableCell>
            <TableCell>{currentUser.email}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProfilePage;
