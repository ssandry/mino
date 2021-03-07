import Head from "next/head";
import DefaultLayout from "../layouts/default";
import Card from "../components/Card/Card";

import { useEffect } from "react";

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

    useEffect(() => {
        {
            ScrollTrigger.refresh()

            const targets = document.querySelectorAll(".headerIndex .word")

            const width = window.innerWidth;

            const start = width > 500 ? 300 : 200;

            const arr = [ "-20", "40", "-20", "40", "-40", "5", "50" ]

            targets.forEach( (target, i) => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        id: "trigger3",
                        trigger: target,
                        start: `top top+=${start}`,
                        scrub: true,
                    }
                })
        
                tl.fromTo(
                    target,
                    { opacity: 1, transitionDuration: target.attributes.dur.nodeValue, x: 0 },
                    { opacity: 0, transitionDuration: target.attributes.dur.nodeValue, x: arr[i] }
                );
            } )
        }
        {

            const height = window.innerHeight;
            const width = window.innerWidth;

            const PC_ADAPTIVE = height > 1000 ? height / 3 : height / 4.5
            const MOBILE_ADAPTIVE = height / 2.3

            const start = width > 500 ? PC_ADAPTIVE : MOBILE_ADAPTIVE
            const end = width > 500 ? 400 : 200

            const AdaptiveTranslateY = width > 500 ? 90 : 60

            const tl = gsap.timeline({
                scrollTrigger: {
                    id: "trigger3",
                    trigger: "#mp",
                    start: `top bottom-=${start}`,
                    end: `center-=${end}`,
                    scrub: true,
                }
            })

            tl.fromTo(
                "#mp",
                { opacity: 0, translateY: AdaptiveTranslateY, transitionDuration: .5 },
                { opacity: 1, translateY: 0, transitionDuration: .5 }
            );
        }
    }, [])

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
                <h2 id="mp2"><span>CREATIVE FASHION</span> <span>STREETWEAR DESIGN</span></h2>
                <h1>
                    <span className="word" dur = "0.85">MINO </span> 
                    <span className="italic">
                        <span className="word" dur = "0.55">and </span>
                    </span> <br/> 
                    <span className="word" dur = "0.4">CONTEMPORARY </span> 
                    <span className="word" dur = "0.35">APPEAL </span> <br/> - 
                    <span className="italic">
                        <span className="word" dur = "0.2"> for </span>
                    </span> 
                    <span className="word" dur = "0.15">EVERY </span> 
                    <span className="word" dur = "0.25">WOMAN</span>
                </h1>
            </div>
            <div id="mp">
                <div className="filter">
                    <div>Most Popular</div>
                    <div>ホワイトベール</div>
                </div>
                <motion.div 
                    id="collections-grid"
                >
                    <Card 
                        key     = { mostPopularCollection.id }
                        HREF    = "/collection/[id]"
                        AS      = {`/collection/${ mostPopularCollection.id }`}
                        SRC     = { mostPopularCollection.coverImg }
                        ALT     = ""
                        engCL   = { mostPopularCollection.titleENG }
                        jpCL    = { mostPopularCollection.titleJPN }
                        YEAR    = { mostPopularCollection.year }
                    />
                    <div className="mostPopular-about" >
                        <div className="mostPopular-header">
                            <div className="mostPopular-header-content">
                                <section>
                                    <h4> { mostPopularCollection.by } </h4>
                                    <p> { mostPopularCollection.smallInfo } </p>
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
            </div>
            <div className="filter">
                <div>2021</div>
                <div>ホワイトベール</div>
            </div>
            <motion.div 
                id="collections-grid"
            >
                {
                    collections
                    .filter( ({ mostPopular }) => !mostPopular )
                    .filter( ({ year }) => year === "2021" )
                    .map( (c) => {
                        return (
                            <Card 
                                key     = { c.id }
                                HREF    = "/collection/[id]"
                                AS      = {`/collection/${ c.id }`}
                                SRC     = { c.coverImg }
                                ALT     = ""
                                engCL   = { c.titleENG }
                                jpCL    = { c.titleJPN }
                                YEAR    = { c.year }
                            />
                        )
                    } )
                }
            </motion.div>
            <div className="filter">
                <div>2022</div>
                <div>ホワイトベール</div>
            </div>
            <motion.div 
                id="collections-grid"
            >
                {
                    collections
                    .filter( ({ mostPopular }) => !mostPopular )
                    .filter( ({ year }) => year === "2022" )
                    .map( (c) => {
                        return (
                            <Card 
                                key     = { c.id }
                                HREF    = "/collection/[id]"
                                AS      = {`/collection/${ c.id }`}
                                SRC     = { c.coverImg }
                                ALT     = ""
                                engCL   = { c.titleENG }
                                jpCL    = { c.titleJPN }
                                YEAR    = { c.year }
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