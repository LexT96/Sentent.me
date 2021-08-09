import '../styles/main.css'
import type { AppProps } from 'next/app'
import React from 'react'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';
function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp
