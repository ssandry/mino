import { useEffect } from "react";
import Head from "next/head";
import DefaultLayout from "../layouts/default";
import Card from "../components/Card/Card";

// GSAP
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register ScrollTrigger for use on GSAP 
gsap.registerPlugin(ScrollTrigger);
gsap.core.globals("ScrollTrigger", ScrollTrigger);

const IndexPage = ( { collections } ) => {

    useEffect( () => {

        const tl = gsap.timeline({

            scrollTrigger: {
                id: "trigger0",
                trigger: "#h1-top",
                start: "bottom center-=150",
                scrub: true
            }

        })

        const tl1 = gsap.timeline({

            scrollTrigger: {
                id: "trigger0",
                trigger: "#h1-bot",
                start: "bottom center-=150",
                scrub: true
            }

        })

        const tl3 = gsap.timeline({

            scrollTrigger: {
                id: "trigger0",
                trigger: "#h1-about",
                start: "bottom center-=150",
                scrub: true
            }

        })

        tl.fromTo( "#h1-top", { y: 0, transitionDuration: .1 }, { y: -40 } )
        tl1.fromTo( "#h1-bot", { y: 0, transitionDuration: .5 }, { y: -20 } )
        tl3.fromTo( "#h1-about", { y: 0, transitionDuration: .1 }, { y: -10 } )

    }, [] )

    return <>
        <Head>
            <title>MINO Collections</title>
        </Head>
        <DefaultLayout>
            <div className="headerIndex">
                <h1 className="logo" id="logo" >
                    <span id="h1-top" style={{ display: "inline-block" }} >MI<span className="n">N</span>O </span>
                    <span id="h1-bot" style={{ display: "inline-block", whiteSpace: "pre" }}> Collections</span>
                </h1>
                <p id="h1-about" >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor.
                </p>
            </div>
            <div id="collections-grid">
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
            </div>
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