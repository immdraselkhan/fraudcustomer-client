import Head from "next/head";
import { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../src/utilis/createEmotionCache";
import { AuthProvider } from "@/src/contexts/AuthProvider";
import MuiThemeProvider from "@/src/contexts/ThemeProvider";
import { Paper } from "@mui/material";
import { useRouter } from "next/router";
import DashboardLayout from "@/src/layouts/DashboardLayout";
import MainLayout from "@/src/layouts/MainLayout";
import { Toaster } from "react-hot-toast";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Next router hook
  const router = useRouter();

  // Conditional layout
  const Layout = router.pathname.startsWith("/dashboard")
    ? DashboardLayout
    : MainLayout;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <AuthProvider>
        <MuiThemeProvider>
          <Paper sx={{ borderRadius: "0" }}>
            <Layout>
              <Toaster />
              <Component {...pageProps} />
            </Layout>
          </Paper>
        </MuiThemeProvider>
      </AuthProvider>
    </CacheProvider>
  );
}
