import Head from "next/head";
import "../assets/sass/global.scss";

import { AnimateSharedLayout } from "framer-motion";

function App({ Component, pageProps }) {
    return <AnimateSharedLayout type="crossfade" >
        <Head>
            <meta name="viewport" content="minimum-scale=1, initial-scale=1.0, width=device-width" />
        </Head>
        <Component {...pageProps} />
    </AnimateSharedLayout>
} 

export default App;