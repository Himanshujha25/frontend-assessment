import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@/lib/theme";

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}
