import { useAuth } from "@/src/contexts/AuthProvider";
import { useRouter } from "next/router";

const Login = () => {
  const { user, loading, googleAuth, authWithPopup } = useAuth();

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
        <button onClick={() => authWithPopup(googleAuth)}>
          Google Sign in
        </button>
      )}
    </div>
  );
};

export default Login;
