import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
 
import DefaultLayout from  "../layouts/default";
import Card from "../components/Card/Card";

const IndexPage = ( {collections} ) => {
    return <DefaultLayout>
        <div className="headerIndex">
            <h1 className="logo">
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
                        <Card 
                            key = {c.id}
                            HREF="/"
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
}

export const getStaticProps =  async () => {
    if( process.env.MODE === "development" ) {
        const client = new ApolloClient({
            uri: process.env.DEV_GRAPHQL_SERVER,
            cache: new InMemoryCache()
        })
        const { data } = await client.query({ query: gql`
            query getAllCollections {
                getAllCollections {
                    id 
                    titleENG
                    titleJPN
                    year
                    coverImg
                }
            }
        ` })
        return {
            props: {
                collections: data.getAllCollections
            }
        }
    }
}

export default IndexPage;