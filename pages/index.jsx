import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import {AnimatePresence} from "framer-motion"
 
import DefaultLayout from  "../layouts/default";
import Card from "../components/Card/Card";

const IndexPage = ( { collections } ) => {
    return <DefaultLayout>
        <div className="headerIndex">
            <h1 className="logo" >
                MI<span>N</span>O
                Collections
            </h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor.
            </p>
        </div>
        <div id="collections-grid">
            {
                collections.map( (c) => {
                    return (
                        <AnimatePresence>
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
                        </AnimatePresence>
                    )
                } )
            }
        </div>
    </DefaultLayout>
}

export const getStaticProps =  async () => {
    if( process.env.MODE === "development" ) {
        try {

            const client = new ApolloClient({
                uri: process.env.DEV_GRAPHQL_SERVER,
                cache: new InMemoryCache()
            })

            const { data } = await client.query
            ({ query: gql`

                query getAllCollections {
                    getAllCollections {
                        id 
                        titleENG
                        titleJPN
                        year
                        coverImg
                    }
                }
                
            `})

            return {
                props: {
                    collections: data.getAllCollections
                }
            }

        } catch(err) {
            console.log( `Err: ${err}` )
        }

    } else if( process.env.MODE === "production" ) {
        try {

            const res = await fetch(process.env.PROD_SERVER);
            const collections = await res.json();

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