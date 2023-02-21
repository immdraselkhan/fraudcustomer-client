import { useAuth } from "@/src/contexts/AuthProvider";
import PrivateRoute from "@/src/hocs/PrivateRoute";
import { useRouter } from "next/router";
import React from "react";

const Login = () => {
  const { user, loading, googleAuthProvider, authWithPopup, userLogOut } =
    useAuth();
  const router = useRouter();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (user?.uid) {
    // @ts-ignore
    router.replace(router?.query?.redirect || "/");
  }
  return (
    <div>
      {!user?.uid && (
        <button onClick={() => authWithPopup(googleAuthProvider)}>
          Google Sign in
        </button>
      )}
    </div>
  );
};

export default Login;
