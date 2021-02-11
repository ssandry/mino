import DefaultLayout from "../layouts/default";
import Card from "../components/Card/Card";

const IndexPage = ( { collections } ) => {
    return <DefaultLayout>
        <div className="headerIndex">
            <h1 className="logo">
                <span>MI<span className="n">N</span>O </span>
                <span> Collections</span>
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