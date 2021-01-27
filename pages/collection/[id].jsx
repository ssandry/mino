import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

import DefaultLayout from "../../layouts/default";

const Collection = ( {collection} ) => {
    return <DefaultLayout>
        <div className="collection-main">
            <div className="collection-h">
                <div className="collection-name">
                    <div className="imgabs">
                        <img src={collection.coverImg} alt=""/>
                    </div>
                    <div>
                        <h1 className="logo">
                            MI<span>N</span>O /
                        </h1>
                        <h2> {collection.titleENG}</h2>
                    </div>
                    <h5>{collection.by} {collection.release}</h5>
                </div>
            </div>
        </div>
        <div className="collection-collage">
            <img src={collection.collage} alt=""/>
        </div>
        <div className="line">
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
}

export const getStaticProps = async (ctx) => {
    if( process.env.MODE === "development" ) {
        try {

            const client = new ApolloClient({
                uri: process.env.DEV_GRAPHQL_SERVER,
                cache: new InMemoryCache()
            })
    
            const { data } = await client.query
            ({ query: gql`
    
                query getCollection {
                    getCollection(id: ${ctx.params.id}) {
                        id
                        titleENG
                        titleJPN
                        by
                        release
                        year
                        coverImg
                        collage
                        about
                        preAbout
                        team {
                            prof
                            name
                        }
                    }
                }
                
            `})
    
            return {
                props: {
                    collection: data.getCollection
                }
            }

        } catch(err) {
            console.log( `Err: ${err}` )
        }

    } else if( process.env.MODE === "production" ) {
        try {

            const res = await fetch(process.env.PROD_SERVER);
            const collections = await res.json();

            const collection = 
            await collections
            .find( ( {id} ) => { return id === ctx.params.id } )

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
            const client = new ApolloClient({
                uri: process.env.DEV_GRAPHQL_SERVER,
                cache: new InMemoryCache()
            })
    
            const { data } = await client.query
            ({ query: gql`
    
                query getAllCollections {
                    getAllCollections {
                        id 
                    }
                }
                
            `})
    
            const paths = data.getAllCollections.map( (p) => {
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

            const res = await fetch(process.env.PROD_SERVER)
            const collections = await res.json();

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