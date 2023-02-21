import React from "react";
import { useAuth } from "@/src/contexts/AuthProvider";
import PrivateRoute from "@/src/hocs/PrivateRoute";

const Profile = () => {
  const { loading, user, userLogOut } = useAuth();

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  return (
    <div>
      Welcome {user?.uid}
      <br />
      <button onClick={userLogOut}>Log out</button>
    </div>
  );
};

export default PrivateRoute(Profile);
