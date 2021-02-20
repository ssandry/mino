import Head from "next/head";
import DefaultLayout from "../../layouts/default";
import { useEffect, useRef } from "react";

import { motion } from "framer-motion";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const Collection = ( {collection} ) => {

    gsap.registerPlugin(ScrollTrigger);
    gsap.core.globals("ScrollTrigger", ScrollTrigger);

    useEffect(() => {
        gsap.to("#collection-collage", {
        x: 100,
        duration: 2,
        ease: "bounce",
        delay: 1,
        scrollTrigger: {
            trigger: "#collection-collage"
        }
    });
    }, []);

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
                        <div>
                            <h1 className="logo" >
                                MI<span className="n">N</span>O /
                            </h1>
                            <h2> {collection.titleENG}</h2>
                        </div>
                        <h5>{collection.by} {collection.release}</h5>
                    </div>
                </div>
            </div>
            <div 
                className="collection-collage" 
                id = "collection-collage" 
            >
                <img 
                    src={collection.collage} 
                    alt=""
                />
            </div>
            <div 
                className="line" 
                id = "line"
            >
                <div className="line-img"></div>
            </div>
            <div className="about">
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