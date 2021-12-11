import "../styles/main.scss";
import type { AppProps } from "next/app";
import React, { useState } from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/react-vis/dist/style.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Reddit sentiment analyzer</title>
        <meta
          property="og:title"
          content="Sentent.me - Reddit sentiment analyzer"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.sentent.me" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
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
export default MyApp;
