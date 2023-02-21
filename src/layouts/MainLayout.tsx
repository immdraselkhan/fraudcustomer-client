import Head from "next/head";
import Header from "../components/client/Header";
import Footer from "../components/client/Footer";
import { useTheme } from "@mui/material/styles";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta
          name="description"
          content="Everyone easily can search Fraud Customers who are spamming in online."
        />
        <meta property="og:title" content="FraudCustomer" />
        <meta
          property="og:description"
          content="Everyone easily can search Fraud Customers who are spamming in online."
        />
        <meta property="og:image" content="" />
        <meta name="twitter:card" content="" />
        <meta name="twitter:title" content="FraudCustomer" />
        <meta
          name="twitter:description"
          content="Everyone easily can search Fraud Customers who are spamming in online."
        />
        <meta name="twitter:image" content="" />
        <meta
          name="theme-color"
          content={
            theme.palette.mode === "light"
              ? theme.palette.primary.main
              : "#121212"
          }
        />
        <link rel="shortcut icon" href="" />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
