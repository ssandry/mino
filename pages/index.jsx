import { useEffect } from "react";
import Head from "next/head";
import DefaultLayout from "../layouts/default";
import Card from "../components/Card/Card";

// GSAP
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Framer 
import { motion } from "framer-motion";

// Register ScrollTrigger for use on GSAP 
gsap.registerPlugin(ScrollTrigger);
gsap.core.globals("ScrollTrigger", ScrollTrigger);

const IndexPage = ( { collections } ) => {

    return <>
        <Head>
            <title>MINO Collections</title>
        </Head>
        <DefaultLayout>
            <div 
                className="headerIndex" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                transition={{ duration: 1.25 }}
            >
                <div className="logo-image"></div>
                <h2>CREATIVE FASHION STREETWEAR DESIGN</h2>
                <h1>
                    MINO <span>and</span> <br/> CONTEMPORARY APPEAL <br/> - <span>for</span> EVERY WOMAN
                </h1>
            </div>
            <div className="filter">
                <div>Most Popular</div>
                <div>ホワイトベール</div>
            </div>
            <motion.div 
                id="collections-grid"
            >
                {
                    collections.map( (c) => {
                        return (
                            <Card 
                                key = {c.id}
                                HREF="/collection/[id]"
                                AS={`/collection/${c.id}`}
                                SRC={c.coverImg}
                                ALT=""
                                engCL={c.titleENG}
                                jpCL={c.titleJPN}
                                YEAR={c.year}
                            />
                        )
                    } )
                }
            </motion.div>
        </DefaultLayout>
    </>
}

export const getStaticProps =  async () => {
    if( process.env.MODE === "development" ) {
        try {

            const res = await fetch(`${process.env.DEV_PYTHON_API}/api/v.1.0/get-collections`);
            const { collections } = await res.json();

            return {
                props: {
                    collections: collections
                }
            }

        } catch(err) {
            console.log( `Err: ${err}` )
        }

    } else if( process.env.MODE === "production" ) {
        try {

            const res = await fetch(`${process.env.PROD_HEROKU_MINO_API}/api/v.1.0/get-collections`);
            const { collections } = await res.json();

            return {
                props: {
                    collections
                }
            }

        } catch(err) {
            console.log( `Err: ${err}` )
        }
    }
}

export default IndexPage;