import App from './App';
import SidebarMenu from './SidebarMenu';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

const drawerWidth = 240;

const AppRoot = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const toggleDrawer = (open?: boolean) => () => {
    setMobileOpen(typeof open === 'undefined' ? !mobileOpen : open);
  };

  const sidebarMenu = <SidebarMenu />;

  return (
    <BrowserRouter>
      <Box sx={{display: 'flex'}}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{zIndex: theme => theme.zIndex.drawer + 1}}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{
                display: {xs: 'block', sm: 'none'},
                mr: 2,
              }}
              onClick={toggleDrawer()}
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

        <Box component="nav">
          <SwipeableDrawer
            variant="temporary"
            open={mobileOpen}
            onOpen={toggleDrawer(true)}
            onClose={toggleDrawer(false)}
            ModalProps={{keepMounted: true}}
            sx={{
              display: {xs: 'block', sm: 'none'},
              width: drawerWidth,
              flexShrink: 0,
              ['& .MuiDrawer-paper']: {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
          >
            <Toolbar />
            <Box sx={{overflow: 'auto'}}>{sidebarMenu}</Box>
          </SwipeableDrawer>

          <Drawer
            variant="permanent"
            // open
            sx={{
              display: {xs: 'none', sm: 'block'},
              width: drawerWidth,
              flexShrink: 0,
              ['& .MuiDrawer-paper']: {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
          >
            <Toolbar />
            <Box sx={{overflow: 'auto'}}>{sidebarMenu}</Box>
          </Drawer>
        </Box>
        {/* <Sidebar /> */}
        {/* <Container><App /></Container> */}
        <Box component="main" sx={{flexGrow: 1, p: 3}}>
          <Toolbar />
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
            ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
            elementum integer enim neque volutpat ac tincidunt. Ornare
            suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
            volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
            Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
            ornare massa eget egestas purus viverra accumsan in. In hendrerit
            gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
            aliquam sem et tortor. Habitant morbi tristique senectus et.
            Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean
            euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
            ultrices sagittis orci a.
          </Typography>
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default AppRoot;
