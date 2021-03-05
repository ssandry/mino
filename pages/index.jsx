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

const IndexPage = ({ collections }) => {

    const mostPopularCollection = collections.find( ({ mostPopular }) => mostPopular );

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
                <Card 
                    key = { mostPopularCollection.id }
                    HREF="/collection/[id]"
                    AS={`/collection/${ mostPopularCollection.id }`}
                    SRC={ mostPopularCollection.coverImg }
                    ALT=""
                    engCL={ mostPopularCollection.titleENG }
                    jpCL={ mostPopularCollection.titleJPN }
                    YEAR={ mostPopularCollection.year }
                />
                <div className="mostPopular-about" >
                    <div className="mostPopular-header">
                        <div className="mostPopular-header-content">
                            <section>
                                <h4> { mostPopularCollection.by } </h4>
                                <p> { mostPopularCollection.about } { mostPopularCollection.about } </p>
                                <p> Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                            </section>
                            <div className="img">
                                <img src="/data/mostPopular/mostPopular.png" alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="space"></div>
                </div>
            </motion.div>
            <div className="filter">
                <div>All</div>
                <div>ホワイトベール</div>
            </div>
            <motion.div 
                id="collections-grid"
            >
                {
                    collections
                    .filter( ({ mostPopular }) => !mostPopular )
                    .map( (c) => {
                        return (
                            <Card 
                                key = { c.id }
                                HREF="/collection/[id]"
                                AS={`/collection/${ c.id }`}
                                SRC={ c.coverImg }
                                ALT=""
                                engCL={ c.titleENG }
                                jpCL={ c.titleJPN }
                                YEAR={ c.year }
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