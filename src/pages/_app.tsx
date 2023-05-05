import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { UserProvider } from '@/providers/userProvider'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
        <Head>
          <link rel={"icon"} type={"image/x-icon"} href={"./images/icon.ico"} />
          <title>PrismaCrypto</title>
        </Head>
        <Component {...pageProps} />
    </UserProvider>
  )
}
