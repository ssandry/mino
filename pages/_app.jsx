import Head from "next/head";
import "../assets/sass/global.scss";

import "aos/dist/aos.css";

import { AnimateSharedLayout } from "framer-motion";

import App from "next/app";

class MyApp extends App {
    render() {
      const { Component, pageProps, router } = this.props;
      return (
        <>
            <Head>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1.0, width=device-width" />
            </Head>
            <AnimateSharedLayout type="crossfade">
                <Component {...pageProps} key={router.route} />
            </AnimateSharedLayout>
        </>
      );
    }
  }

export default MyApp;