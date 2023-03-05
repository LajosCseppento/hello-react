import EditablePage from './components/EditablePage';
import ErrorFallback from './components/ErrorFallback';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Page from './components/Page';
import Sidebar from './components/Sidebar';
import client from './utils/client';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RestoreIcon from '@mui/icons-material/Restore';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Link from '@mui/material/Link';
import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {
  BrowserRouter,
  Link as RouterLink,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

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
      </Routes>
    </ErrorBoundary>
  );
}

function AppNavigation() {
  const location = useLocation();
  // const pathname = window.location.pathname; // in case user visits the path directly. The BottomNavBar is able to follow suit.
  // const [value, setValue] = React.useState(pathname);
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };

  console.log(location);

  return (
    <BottomNavigation showLabels value={location.pathname}>
      <BottomNavigationAction
        label="Home"
        icon={<HomeIcon />}
        LinkComponent={RouterLink}
        to="/"
        value="/"
      />
      <BottomNavigationAction
        label="Page"
        icon={<ArticleIcon />}
        LinkComponent={RouterLink}
        to="/page"
        value="/page"
      />
      <BottomNavigationAction
        label="Editable Page"
        icon={<EditIcon />}
        LinkComponent={RouterLink}
        to="/editable-page"
        value="/editable-page"
      />
    </BottomNavigation>
  );
}

export default function App() {
  // const location = useLocation();
  const pathname = window.location.pathname; // in case user visits the path directly. The BottomNavBar is able to follow suit.
  const [value, setValue] = React.useState(pathname);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BrowserRouter>
      {/* <Sidebar /> */}
      {/* <NavBar /> */}
      <AppRoutes />
      {/* <Footer /> */}
      {/* <AppNavigation /> */}
    </BrowserRouter>
  );
}
