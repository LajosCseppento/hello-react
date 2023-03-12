import Typography from '@mui/material/Typography';
import React from 'react';

type Props = {
  value: string;
};

const PageTitle = ({value}: Props) => (
  <Typography variant="h2" paddingBottom={2}>
    {value}
  </Typography>
);

export default PageTitle;
