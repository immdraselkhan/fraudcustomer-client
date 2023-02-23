import React from "react";
import { useAuth } from "@/src/contexts/AuthProvider";
import PrivateRoute from "@/src/hocs/PrivateRoute";

const Profile = () => {
  // Get user information
  const { user, userLogOut } = useAuth();

  return (
    <div>
      Welcome {user?.uid}
      <br />
      <button onClick={userLogOut}>Log out</button>
    </div>
  );
};

export default PrivateRoute(Profile);
