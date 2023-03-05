import EditablePage from './components/EditablePage';
import ErrorFallback from './components/ErrorFallback';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Page from './components/Page';
import ProfilePage from './components/ProfilePage';
import Sidebar from './components/Sidebar';
import SidebarMenu from './components/SidebarMenu';
import client from './utils/client';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';
import RestoreIcon from '@mui/icons-material/Restore';
import AppBar from '@mui/material/AppBar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {
  BrowserRouter,
  Link as RouterLink,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

const drawerWidth = 240;

function AppRoutes() {
  const location = useLocation();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[location.key]}>
      <Routes>
        <Route
          path="/"
          element={<Page title="Home" request={client.getHome} />}
        />
        <Route
          path="/page"
          element={<Page title="Page" request={client.getPage} />}
        />
        <Route
          path="/editable-page"
          element={
            <EditablePage
              title="Editable Page"
              getRequest={client.getEditablePage}
              setRequest={client.postEditablePage}
            />
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </ErrorBoundary>
  );
}

const App = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const toggleDrawer =
    (open?: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
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
        <Box component="main" sx={{flexGrow: 1, p: 3}}>
          <Toolbar />
          <AppRoutes />
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

export default App;
