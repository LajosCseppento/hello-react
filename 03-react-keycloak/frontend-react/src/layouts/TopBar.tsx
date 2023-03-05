import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';

type TopBarProps = {
  toggleDrawer: (event: React.SyntheticEvent) => void;
};

const TopBar = (props: TopBarProps) => {
  return (
    <AppBar position="fixed" sx={{zIndex: theme => theme.zIndex.drawer + 1}}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          sx={{
            display: {xs: 'block', sm: 'none'},
            mr: 2,
          }}
          onClick={props.toggleDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" flexGrow="3">
          React FE Demo
        </Typography>
        <Typography
          variant="subtitle1"
          component="div"
          textAlign="right"
          flexGrow="1"
        >
          <em>Fair winds!</em>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
