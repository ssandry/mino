// React && Next.JS
import { useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";

// Layout
import DefaultLayout from "../../layouts/default";

// Animations 
import { Link as Anchor } from "react-scroll";
import { motion } from "framer-motion";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Register ScrollTrigger for use on GSAP 
gsap.registerPlugin(ScrollTrigger);
gsap.core.globals("ScrollTrigger", ScrollTrigger);

const Collection = ({ collection }) => {

    const collageRef = useRef(null)
    const lineRef = useRef(null)

    const TRANSITION_VALUE = .1

    useEffect( () => {

        //Collection cover ScrollTrigger
        {
            setTimeout( () => {
            
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
                    { y: 0, x: 0, scale: 1, opacity: 1, skewX: 0, skewY: 0, transitionDuration: .005 },
                    { y: 60, x: -10, scale: 0.96, opacity: 0.5, skewX: 0.105, skewY: 0.105, transitionDuration: .005 }
                );
            }, 500 )
        }

        // Mount collection collage ScrollTrigger
        {
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
                { opacity: 0, x: 100, y: 50, scale: 0.96, skewX: -0.45, skewY: -0.75, transitionDuration: TRANSITION_VALUE },
                { opacity: 1, x: 0, y: 0, scale: 1, skewX: 0, skewY: 0, transitionDuration: TRANSITION_VALUE }
            );
        }

        // Mount line ScrollTrigger
        {
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
                { opacity: 0, x: -80, skewX: 2, skewY: 1, transitionDuration: TRANSITION_VALUE },
                { opacity: 1, x: 0, skewX: 0, skewY: 0, transitionDuration: TRANSITION_VALUE }
            );
    
            return () => {
    
                tl2.pause(0).kill(true);
                ScrollTrigger.getById("trigger4").kill(true);
                gsap.set( lineRef.current, { clearProps: true } );
    
            }
        }

    }, [] )

    return <>
        <Head>
            <title>MINO | { collection.titleENG } </title>
        </Head>
        <DefaultLayout>
            <div className="collection-main" id = "collection-main">
                <div className="collection-h">
                    <div className="collection-name">
                        <motion.div 
                            className="imgabs" 
                            layoutId={ collection.coverImg }
                            transition={{ duration: .85 }}
                        >
                            <img 
                                src={ collection.coverImg } 
                                alt=""
                            />
                        </motion.div>
                        <div id="h1" className="textContent">
                            <div className="str1">
                                <motion.h1 
                                    className   ="logo" 
                                    initial     ={{ opacity: 0 }}
                                    animate     ={{ opacity: 1 }}
                                    transition  ={{ duration: 1.5, delay: .45 }}
                                > MI<span className="n">N</span>O /  
                                </motion.h1>
                                <motion.h2 
                                    initial     ={{ opacity: 0 }}
                                    animate     ={{ opacity: 1 }}
                                    transition  ={{ duration: 1.5, delay: .65 }}
                                >
                                    { collection.titleENG }
                                </motion.h2>
                            </div>
                            <motion.div 
                                className="str2"
                                initial     ={{ opacity: 0 }}
                                animate     ={{ opacity: 1 }}
                                transition  ={{ duration: 1.5, delay: .8 }}
                            >
                                <h5> { collection.by } </h5>
                            </motion.div>
                            <motion.div 
                                className="str3"
                                initial     ={{ opacity: 0 }}
                                animate     ={{ opacity: 1 }}
                                transition  ={{ duration: 1.5, delay: 1 }}
                            >
                                <p>{ collection.about }{ collection.about }</p>
                                <div className="time">{ collection.release }</div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
            <div 
                className="collection-collage" 
                id="collection-collage" 
                ref={ collageRef }
            >
                <img 
                    src={ collection.collage } 
                    alt=""
                />
            </div>
            <div 
                className="line" 
                id="line"
                ref={ lineRef }
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
                                <span className="prof" >{ t.prof }</span>
                                <span className="name" >{ t.name }</span>
                            </div>
                        )
                    } ) }
                </div>
            </div>
            <div className="anchors">
                <Link href="/" >
                    <a>
                        <span>G</span>
                        <span>o</span>
                        <span> </span>
                        <span>t</span>
                        <span>o</span>
                        <span> </span>
                        <span>c</span>
                        <span>o</span>
                        <span>l</span>
                        <span>l</span>
                        <span>e</span>
                        <span>c</span>
                        <span>t</span>
                        <span>i</span>
                        <span>o</span>
                        <span>n</span>
                        <span>s</span>
                    </a>
                </Link>
                <Anchor
                    to="collection-main"
                    smooth={ true }
                    duration={ 2600 }
                >
                    <span className="two">
                        <span>G</span>
                        <span>o</span>
                        <span> </span>
                        <span>t</span>
                        <span>o</span>
                        <span> </span>
                        <span>t</span>
                        <span>o</span>
                        <span>p</span>
                    </span>
                </Anchor>
                <Link href="https://github.com/ssandry/mino" >
                    <a className="two">
                        <span>G</span>
                        <span>i</span>
                        <span>t</span>
                        <span>H</span>
                        <span>u</span>
                        <span>b</span>
                        <span>☂️</span>
                    </a>
                </Link>
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