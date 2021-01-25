import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const Collection = ( {collection} ) => {
    return (
        <h1>
            Collection: { collection.titleENG }
        </h1>
    )
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