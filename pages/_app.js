import Layout from "@/components/Layout";
import { AuthProvider } from "@/context/authContext";
import "@/styles/globals.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import toast, { Toaster } from "react-hot-toast";
import "@/styles/Login.css";
import "@/styles/LoginFirstPage.css";
import "@/styles/LoginSecondPage.css";

function MyApp({ Component, pageProps, children }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
          {children}
          <Toaster />
        </Layout>
      </AuthProvider>
    </LocalizationProvider>
  );
}

export default MyApp;
