import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import React from 'react';

export default function Footer() {
  return (
    <div>
      <Typography variant="body2" alignItems="center">
        Built with React, MUI and{' '}
        <FavoriteIcon fontSize="small" sx={{color: red[600]}} />
      </Typography>
      Source{' '}
      <a
        href="https://github.com/LajosCseppento/hello-react/tree/main/03-react-keycloak"
        target="_blank"
        rel="noreferrer"
      >
        here
      </a>
    </div>
  );
}
