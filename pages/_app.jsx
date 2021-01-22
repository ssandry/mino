import Head from "next/head";
import "../assets/sass/global.scss";

function MyApp({ Component, pageProps }) {
    return <>
        <Head>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1.0, width=device-width" />
        </Head>
        <Component {...pageProps} />
    </>
} 

export default MyApp;