import client from '../utils/client';
import EditablePage from './EditablePage';
import ErrorFallback from './ErrorFallback';
import Page from './Page';
import ProfilePage from './ProfilePage';
import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {Route, Routes, useLocation} from 'react-router-dom';

const AppRoutes = () => {
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
};

export default AppRoutes;
