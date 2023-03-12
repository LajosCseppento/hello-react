import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';

import EditablePage from './components/EditablePage';
import ErrorFallback from './components/ErrorFallback';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Page from './components/Page';
import client from './utils/client';

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

export default function App() {
  // const location = useLocation();

  return (
    <div>
      <BrowserRouter>
        <NavBar />

        <AppRoutes />
        {/* <ErrorBoundary
          FallbackComponent={ErrorFallback}
          // resetKeys={[window.location]}
        >
          <Routes>
            <Route
              path="/"
              element={<Page2 title="Home" request={client.getHome} />}
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
        </ErrorBoundary> */}

        <Footer />
      </BrowserRouter>
    </div>
  );
}
