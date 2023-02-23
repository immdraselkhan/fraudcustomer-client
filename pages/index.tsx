import Head from "next/head";
import styles from "@/styles/Home.module.css";
import useTitle from "@/src/hooks/useTitle";

export default function Home() {
  // Global site title
  const title = useTitle();
  return (
    <>
      <Head>
        <title>{`Home | ${title}`}</title>
      </Head>
      <main className={styles.main}>Welcome to FraudCustomer</main>
    </>
  );
}
