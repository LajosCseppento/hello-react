import UserInfo from './UserInfo';
import React from 'react';
import {Link} from 'react-router-dom';

export default function NavBar() {
  return (
    <nav>
      <div>
        <h1>KeyCloak App Frontend</h1>
        <div>
          <Link to="/">Home</Link>
          {' | '}
          <Link to="/page">Page</Link>
          {' | '}
          <Link to="/editable-page">Editable Page</Link>
          {' | '}
          <UserInfo />
        </div>
      </div>
    </nav>
  );
}
