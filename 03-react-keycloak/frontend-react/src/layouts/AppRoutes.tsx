import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {Route, Routes, useLocation} from 'react-router-dom';

import EditablePage from '@app/pages/EditablePage';
import Page from '@app/pages/Page';
import ProfilePage from '@app/pages/ProfilePage';
import client from '@app/utils/client';

import ErrorFallback from './ErrorFallback';

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
