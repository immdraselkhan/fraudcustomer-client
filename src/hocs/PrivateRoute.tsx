import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthProvider";

const PrivateRoute = (Component: any) => {
  const AuthCheck = (props: any) => {
    // Get user information
    const { user, loading } = useAuth();

    // useRouter hook
    const router = useRouter();

    // Loader until user information
    if (loading) {
      return <div>Loading...</div>;
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
