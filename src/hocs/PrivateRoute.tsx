import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthProvider";
import { Stack, CircularProgress } from "@mui/material";

const PrivateRoute = (Component: any) => {
  const AuthCheck = (props: any) => {
    // Get user information
    const { user, loading } = useAuth();

    // Next router hook
    const router = useRouter();

    // Loader until user information
    if (loading) {
      return (
        <CircularProgress
          sx={{
            display: "flex",
            margin: "0 auto",
            minHeight: "calc(100vh - 188px)",
          }}
          color="primary"
        />
      );
    }

    // Redirect to login page if user is not logged in
    if (!user) {
      router.replace({
        pathname: "/login",
        query: { redirect: router?.pathname },
      });
      return null;
    }
    return <Component {...props} />;
  };
  return AuthCheck;
};

export default PrivateRoute;
