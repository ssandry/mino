import Head from "next/head";
import "../assets/sass/global.scss";

function App({ Component, pageProps }) {
    return <>
        <Head>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1.0, width=device-width" />
        </Head>
        <Component {...pageProps} />
    </>
} 

export default App;