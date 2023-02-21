import Head from "next/head";
import Header from "../components/dashboard/Header";
import Footer from "../components/dashboard/Footer";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
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
        <link rel="shortcut icon" href="" />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default DashboardLayout;
