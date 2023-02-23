import React, { useContext } from "react";

import AuthenticationContext from "../utils/auth";

export default function UserInfo() {
  const auth = useContext(AuthenticationContext);

  return (
    <>
      Hello {auth.currentUser.firstName}!{" "}
      <button onClick={auth.logout}>Logout</button>
    </>
  );
}
