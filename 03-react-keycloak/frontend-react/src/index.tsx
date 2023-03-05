import App from './App';
import AppRoot from './components/AppRoot';
import Sidebar from './components/Sidebar';
import SidebarMenu from './components/SidebarMenu';
import {auth} from './utils/auth';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

auth.init().finally(() => {
  if (auth.currentUser) {
    root.render(
      <React.StrictMode>
        <AppRoot />
      </React.StrictMode>
    );
  } else {
    console.log(auth.currentUser);
    alert('Authentication failed');
    window.location.reload();
  }
});
