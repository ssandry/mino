import Head from "next/head";
import DefaultLayout from "../../layouts/default";
import { useEffect, useRef } from "react";

import { motion } from "framer-motion";
import Aos from "aos";
import "aos/dist/aos.css";

const Collection = ( {collection} ) => {

    useEffect( () => {
        Aos.init({ duration: 2000 })
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
                data-aos = "fade-up"
                data-aos-offset = "350"
                data-aos-easing="ease-in-sine"
                data-aos-duration = "1400"
            >
                <img 
                    src={collection.collage} 
                    alt=""
                />
            </div>
            <div className="line" data-aos="fade-down" data-aos-duration = "1800">
                <div className="line-img"></div>
            </div>
            <div className="about">
                <h6 data-aos = "fade-up" data-aos-duration = "1500" >The New collection <br/> S - J 2022</h6>
                <h1 data-aos = "fade-up" data-aos-duration = "2400">{ collection.about }</h1>
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