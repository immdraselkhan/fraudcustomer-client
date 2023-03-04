import useTitle from "@/src/hooks/useTitle";
import { Container, Typography } from "@mui/material";
import Head from "next/head";

const SignUp = () => {
  // Global site title
  const title = useTitle();
  return (
    <>
      <Head>
        <title>{`Sign up | ${title}`}</title>
      </Head>
      <Container>
        <Typography>Sign up page</Typography>
        <Typography>Sign up page</Typography>
        <Typography>Sign up page</Typography>
        <Typography>Sign up page</Typography>
        <Typography>Sign up page</Typography>
        <Typography>Sign up page</Typography>
        <Typography>Sign up page</Typography>
        <Typography>Sign up page</Typography>
        <Typography>Sign up page</Typography>
      </Container>
    </>
  );
};

export default SignUp;
