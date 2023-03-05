import AppRoutes from './components/AppRoutes';
import EditablePage from './components/EditablePage';
import ErrorFallback from './components/ErrorFallback';
import Footer from './components/Footer';
import Page from './components/Page';
import ProfilePage from './components/ProfilePage';
import SidebarMenu from './components/SidebarMenu';
import TopBar from './components/TopBar';
import client from './utils/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MenuIcon from '@mui/icons-material/Menu';
import {Divider, Stack} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';

const drawerWidth = 240;

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const toggleDrawer = (open?: boolean) => (event: React.SyntheticEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setMobileOpen(typeof open === 'undefined' ? !mobileOpen : open);
  };

  const sidebarMenu = <SidebarMenu />;

  return (
    <BrowserRouter>
      <Box sx={{display: 'flex'}}>
        <CssBaseline />
        <TopBar toggleDrawer={toggleDrawer()} />

        <Box component="nav" onClick={toggleDrawer(false)}>
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
        <Box sx={{width: '100%'}}>
          <Toolbar />
          <Stack spacing={2}>
            <Box component="main" sx={{flexGrow: 1, p: 2}}>
              <AppRoutes />
            </Box>
            <Divider />
            <Box component="div" sx={{flexGrow: 1, p: 2}}>
              <Footer />
            </Box>
          </Stack>
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default App;
