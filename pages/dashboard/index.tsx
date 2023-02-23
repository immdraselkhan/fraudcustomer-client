import Head from "next/head";
import { Button } from "@mui/material";
import useTitle from "@/src/hooks/useTitle";
import PrivateRoute from "@/src/hocs/PrivateRoute";

const Dashboard = () => {
  // Global site title
  const title = useTitle();

  return (
    <>
      <Head>
        <title>{`Dashboard | ${title}`}</title>
      </Head>
      <main>
        <Button variant="contained">Hello Dashboard!</Button>
      </main>
    </>
  );
};

export default PrivateRoute(Dashboard);
