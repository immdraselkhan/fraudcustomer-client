import Head from "next/head";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuth } from "@/src/contexts/AuthProvider";
import { useRouter } from "next/router";
import useTitle from "@/src/hooks/useTitle";
import { NextLinkComposed } from "@/src/components/common/MuiLink";
import Loader from "@/src/components/common/Loader";
import { toast } from "react-hot-toast";
import PasswordReset from "@/src/components/client/login/PasswordReset";

const Login = () => {
  // Global site title
  const title = useTitle();

  // Firebase auth
  const auth = getAuth();

  // Get user information
  const { logInWithEmailPassword, user, loading, passwordResetEmail } =
    useAuth();

  // Next router hook
  const router = useRouter();

  // Button loader state
  const [loader, setLoader] = useState<boolean>(false);

  // User email state
  const [email, setEmail] = useState<string | undefined>();

  // Password reset dialog state
  const [dialog, setDialog] = useState<boolean>(false);

  // Mui theme hook
  const theme = useTheme();

  // Handle login
  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    // Disable form default behavior
    event.preventDefault();

    // Enable button loader
    setLoader(true);

    // Form data
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    // Set email to the state
    if (typeof email === "string") {
      setEmail(email);
    }

    logInWithEmailPassword(email, password)
      .then((userCredential: {}) => {
        // Signed in
        toast.success("Successfully logged in!");
        setLoader(false);
        // @ts-ignore
        router.replace(router?.query?.redirect || "/");
      })
      .catch((error: Error) => {
        toast.error(
          error.message === "Firebase: Error (auth/user-not-found)."
            ? "User not found. Please sign up!"
            : error.message === "Firebase: Error (auth/wrong-password)."
            ? "Wrong password. You may reset it!"
            : error.message
        );
        setLoader(false);
        return;
      });
  };

  // Handle password reset
  const handlePasswordReset = (event: React.FormEvent<HTMLFormElement>) => {
    // Disable form default behavior
    event.preventDefault();

    // Enable button loader
    setLoader(true);

    // Form data
    const data = new FormData(event.currentTarget);

    const email = data.get("email");

    passwordResetEmail(email)
      .then(() => {
        // Password reset email sent!
        toast.success("Password reset email sent!");
        setDialog(false);
        setLoader(false);
      })
      .catch((error: Error) => {
        // An error occurred
        toast.error(error?.message);
        setLoader(false);
        return;
      });
  };

  // Loader until user information
  if (loading) {
    return <Loader />;
  }

  // Redirect to login page if user is not logged in
  if (user?.uid) {
    // @ts-ignore
    router.replace(router?.query?.redirect || "/");
  }

  return (
    <>
      <Head>
        <title>{`Login | ${title}`}</title>
      </Head>
      <Container
        maxWidth="xs"
        sx={{ paddingTop: "50px", paddingBottom: "50px" }}
      >
        <Box
          sx={[
            {
              padding: "50px 25px",
              boxShadow: (theme) => theme.shadows[1],
              display: "flex",
              flexDirection: "column",
              gap: "25px",
            },
            theme.palette.mode === "dark" && {
              border: "1px solid",
              borderColor: theme.palette.excel.dark,
              borderRadius: theme.shape.borderRadius + "px",
            },
          ]}
        >
          <Typography variant="h6">Welcome back!</Typography>
          <FormControl
            sx={{
              gap: "15px",
            }}
            onSubmit={handleLogin}
            component="form"
          >
            <TextField
              name="email"
              label="Email Address"
              autoComplete="email"
              type="email"
              margin="normal"
              required
              disabled={loader}
            />
            <TextField
              name="password"
              label="Password"
              autoComplete="current-password"
              type="password"
              margin="normal"
              required
              disabled={loader}
              inputProps={{
                minLength: 6,
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              disabled={loader}
            />
            <Button type="submit" variant="contained" disabled={loader}>
              {loader ? "Logging in..." : "Login"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  variant="body2"
                  sx={{ cursor: "pointer", textDecoration: "none" }}
                  onClick={() => setDialog(true)}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  to="/signup"
                  component={NextLinkComposed}
                  variant="body2"
                  sx={{ textDecoration: "none" }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </FormControl>
        </Box>
        <PasswordReset
          loader={loader}
          email={email}
          dialog={dialog}
          setDialog={setDialog}
          handlePasswordReset={handlePasswordReset}
        />
      </Container>
    </>
  );
};

export default Login;
