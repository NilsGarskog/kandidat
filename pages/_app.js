import Layout from "@/components/Layout";
import { AuthProvider } from "@/context/authContext";
import "@/styles/globals.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import toast, { Toaster } from "react-hot-toast";
import "@/styles/Login.css";
import "@/styles/LoginFirstPage.css";
import "@/styles/LoginSecondPage.css";
import Head from "next/head";

function MyApp({ Component, pageProps, children }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthProvider>
        <Layout>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </Head>
          <Component {...pageProps} />
          {children}
          <Toaster />
        </Layout>
      </AuthProvider>
    </LocalizationProvider>
  );
}

export default MyApp;
