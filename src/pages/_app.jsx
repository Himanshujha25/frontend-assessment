import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Head from "next/head"; // ← ADD THIS
import theme from "@/lib/theme";

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* GLOBAL TITLE + METADATA */}
        <Head>
          <title>Frontend Assessment</title>
          <meta
            name="description"
            content="Next.js Admin Dashboard - Frontend Technical Assessment"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}
