import Layout from '@/components/Layout'
import { AuthProvider } from '@/context/authContext'
import '@/styles/globals.css'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function MyApp({ Component, pageProps, children }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
          {children}
        </Layout>
      </AuthProvider>
    </LocalizationProvider>
  )
}

export default MyApp