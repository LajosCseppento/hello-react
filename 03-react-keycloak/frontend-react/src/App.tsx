import AppRoutes from './components/AppRoutes';
import Footer from './components/Footer';
import TopBarAndSidebar from './components/TopBarAndSidebar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Box sx={{display: 'flex'}}>
        <CssBaseline />
        <TopBarAndSidebar />

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
