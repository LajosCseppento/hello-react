import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import {auth} from './utils/auth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

auth.init().finally(() => {
  if (auth.currentUser) {
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    console.log(auth.currentUser);
    alert('Authentication failed');
    window.location.reload();
  }
});
