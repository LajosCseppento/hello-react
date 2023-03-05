import AuthenticationContext from '../utils/auth';
import React, {useContext} from 'react';

export default function UserInfo() {
  const auth = useContext(AuthenticationContext);

  return (
    <>
      Hello {auth.currentUser.firstName}!{' '}
      <button onClick={auth.logout}>Logout</button>
    </>
  );
}
