import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthProvider";

const PrivateRoute = (Component: any) => {
  const WithAuth = (props: any) => {
    const { user, loading } = useAuth();

    const router = useRouter();

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      router.replace({
        pathname: "/login",
        query: { redirect: router?.pathname },
      });
      return null;
    }

    // if (!loading && user) {
    //   return router.replace("/");
    // }

    return <Component {...props} />;
  };

  return WithAuth;
};

export default PrivateRoute;
