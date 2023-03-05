import AuthenticationContext from '../utils/auth';
import React, {useContext} from 'react';

const ProfilePage = () => {
  const currentUser = useContext(AuthenticationContext).currentUser;

  return <div>ProfilePage</div>;
};

export default ProfilePage;
