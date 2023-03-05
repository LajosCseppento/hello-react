import App from './App';
import {auth} from './utils/auth';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from '@mui/material/Typography';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

if (!auth.authenticated) {
  // Hack to display something in case loading takes a while
  root.render(<Typography>Redirecting to log in...</Typography>);
}

auth.init().finally(() => {
  if (auth.authenticated) {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    alert('Authentication failed');
    window.location.reload();
  }
});
