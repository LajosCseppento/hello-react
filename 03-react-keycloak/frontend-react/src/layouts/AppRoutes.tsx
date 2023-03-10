import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {Route, Routes, useLocation} from 'react-router-dom';

import EditablePage from '@app/pages/EditablePage';
import FailingPage from '@app/pages/FailingPage';
import Home from '@app/pages/Home';
import Page from '@app/pages/Page';
import ProfilePage from '@app/pages/ProfilePage';

import ErrorFallback from './ErrorFallback';

const AppRoutes = () => {
  const location = useLocation();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[location.key]}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page" element={<Page />} />
        <Route path="/failing-page" element={<FailingPage />} />
        <Route path="/editable-page" element={<EditablePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default AppRoutes;
