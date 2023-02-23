import Head from "next/head";
import styles from "@/styles/Home.module.css";
import siteTitle from "@/src/utilis/siteTitle";

export default function Home() {
  // Global site title
  const title = siteTitle();
  return (
    <>
      <Head>
        <title>Home | {title} </title>
      </Head>
      <main className={styles.main}>Welcome to FraudCustomer</main>
    </>
  );
}
