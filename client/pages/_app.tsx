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
      <title>Sentent.me - Reddit sentiment analyzer</title>
      <meta property="og:title" content="Sentent.me - Reddit sentiment analyzer" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.sentent.me" />
        <meta
          property="og:description"
          content="Analyzing the current stock sentiment based on posts 
          on the most popular investing subreddits."
        />
      <meta
          property="description"
          name="description"
          content="Analyzing the current stock sentiment based on posts 
          on the most popular investing subreddits."
        />
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
