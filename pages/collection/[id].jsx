// React && Next.JS
import Head from "next/head";
import DefaultLayout from "../../layouts/default";
import { useEffect, useRef } from "react";

// Animations 
import { motion } from "framer-motion";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register ScrollTrigger for use on GSAP 
gsap.registerPlugin(ScrollTrigger);
gsap.core.globals("ScrollTrigger", ScrollTrigger);

const Collection = ( {collection} ) => {

    const collageRef = useRef(null)
    const lineRef = useRef(null)

    // Collection Name Parralax ScrollTrigger
    useEffect( () => {

        const tl = gsap.timeline({
            scrollTrigger: {
                id: "trigger0",
                trigger: "#h1",
                start: "top center+=50",
                scrub: true
            }

        })

        tl.fromTo(
            "#h1",
            { y: 5 },
            { y: -40 }
        );

        const tl2 = gsap.timeline({
            scrollTrigger: {
                id: "trigger1",
                trigger: "#h1",
                start: "top center+=50",
                //end: "top top",
                scrub: true
            }

        })

        tl2.fromTo(
            "#h5",
            { y: 0 },
            { y: -20 }
        );

    }, [] )

    //Collection cover ScrollTrigger
    useEffect( () => {

        const tl = gsap.timeline({
            scrollTrigger: {
                id: "trigger8",
                trigger: ".imgabs img",
                start: "top",
                scrub: true
            }
        })

        tl.fromTo(
            ".imgabs img",
            { y: 0, x: 0, scale: 1 },
            { y: 100, x: -10, scale: 0.92 }
        );

    }, [] )

    // Mount collection collage ScrollTrigger
    useEffect(() => {

        ScrollTrigger.refresh()

        const tl = gsap.timeline({
            scrollTrigger: {
                id: "trigger3",
                trigger: collageRef.current,
                start: "top bottom-=100",
                scrub: true
            }
        })

        tl.fromTo(
            collageRef.current,
            { opacity: 0, x: 200, scale: 0.9, y: 50 },
            { opacity: 1, x: 0, scale: 1, y: 0 }
        );

        return () => {

            tl.pause(0).kill(true);
            ScrollTrigger.getById("trigger3").kill(true);
            gsap.set(collageRef.current, {clearProps: true});

        }

    }, [] );

    // Mount line ScrollTrigger
    useEffect( () => {

        ScrollTrigger.refresh()

        const tl2 = gsap.timeline({
            scrollTrigger: {
                id: "trigger4",
                trigger: lineRef.current,
                start: "top bottom",
                end: "top top",
                scrub: true
            }
        })

        tl2.fromTo(
            lineRef.current,
            {
              opacity: 0,
              x: -100
            },
            {
              opacity: 1,
              x: 0
            }
        );

        return () => {

            // ComponentDidUnmount
            // Remove timeline when component did unmount

            tl2.pause(0).kill(true);
            ScrollTrigger.getById("trigger4").kill(true);
            gsap.set(lineRef.current, {clearProps: true});

        }

    }, [] )

    return <>
        <Head>
            <title>MINO | {collection.titleENG} </title>
        </Head>
        <DefaultLayout>
            <div className="collection-main">
                <div className="collection-h">
                    <div className="collection-name">
                        <motion.div 
                            className="imgabs" 
                            layoutId={collection.coverImg}
                            transition={{ duration: .55 }}
                        >
                            <img 
                                src={collection.coverImg} 
                                alt=""
                            />
                        </motion.div>
                        <div id = "h1">
                            <motion.h1 
                                className="logo" 
                                initial = {{ opacity: 0 }}
                                animate = {{ opacity: 1 }}
                                transition = {{ duration: 1, delay: .25 }}
                            >
                                MI<span className="n">N</span>O /
                            </motion.h1>
                            <motion.h2
                                initial = {{ opacity: 0 }}
                                animate = {{ opacity: 1 }}
                                transition = {{ duration: 1, delay: .35 }}
                            > {collection.titleENG}
                            </motion.h2>
                        </div>
                        <motion.h5
                            initial = {{ opacity: 0 }}
                            animate = {{ opacity: 1 }}
                            transition = {{ duration: 1, delay: .65 }}
                            id = "h5"
                        >
                            {collection.by} {collection.release}
                        </motion.h5>
                    </div>
                </div>
            </div>
            <div 
                className="collection-collage" 
                id = "collection-collage" 
                ref = { collageRef }
            >
                <img 
                    src={collection.collage} 
                    alt=""
                />
            </div>
            <div 
                className="line" 
                id = "line"
                ref = { lineRef }
            >
                <div className="line-img"></div>
            </div>
            <div className="about" id="about" >
                <h6>The New collection <br/> S - J 2022</h6>
                <h1>{ collection.about }</h1>
                <div className="prod">
                    { collection.team.map( (t) => {
                        return (
                            <div key={t.name}>
                                <span className="prof" >{t.prof}</span>
                                <span className="name" >{t.name}</span>
                            </div>
                        )
                    } ) }
                </div>
            </div>
        </DefaultLayout>
    </>
}

export const getStaticProps = async (ctx) => {
    if( process.env.MODE === "development" ) {
        try {

            const res = await fetch(`${process.env.DEV_PYTHON_API}/api/v.1.0/get-collections/${ctx.params.id}`);
            const collection = await res.json();
    
            return {
                props: {
                    collection: collection
                }
            }

        } catch(err) {
            console.log( `Err: ${err}` )
        }

    } else if( process.env.MODE === "production" ) {
        try {

            const res = await fetch(`${process.env.PROD_HEROKU_MINO_API}/api/v.1.0/get-collections/${ctx.params.id}`);
            const collection = await res.json();

            return {
                props: {
                    collection: collection
                }
            }
            
        } catch(err) {
            console.log( `Err: ${err}` )
        }
    }
}

export const getStaticPaths = async () => {

    if( process.env.MODE === "development" ) {
        try {
            
            const res = await fetch(`${process.env.DEV_PYTHON_API}/api/v.1.0/get-collections`);
            const { collections } = await res.json();
    
            const paths = collections.map( (p) => {
                return { params: { id: p.id } }
            } )
    
            return {
                paths,
                fallback: false
            }

        } catch(err) {
            console.log( `Err: ${err}` )
        }
    } else if( process.env.MODE === "production" ) {
        try {

            const res = await fetch(`${process.env.PROD_HEROKU_MINO_API}/api/v.1.0/get-collections`);
            const { collections } = await res.json();

            const paths = await collections
            .map( (p) => {
                return { params: { id: p.id } }
            } )

            return {
                paths,
                fallback: false
            }

        } catch(err) {
            console.log( `Err: ${err}` )
        }

    }

}

export default Collection;