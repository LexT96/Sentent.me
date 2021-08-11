import '../styles/main.css'
import type { AppProps } from 'next/app'
import React from 'react'
import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-vis/dist/style.css';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/react-bootstrap-typeahead/css/Typeahead.css"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp
