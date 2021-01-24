import DefaultLayout from  "../layouts/default";
import Card from "../components/Card/Card";

const IndexPage = () => {
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
            <Card 
                HREF="/"
                SRC="/data/voile.jpg"
                ALT=""
                engCL="VOILE BLANCHE"
                jpCL="ホワイトベ"
                YEAR="2020"
            />
            <Card 
                HREF="/"
                SRC="/data/endless.jpg"
                ALT=""
                engCL="ENDLESS"
                jpCL="ホワイト"
                YEAR="2020"
            />
        </div>
    </DefaultLayout>
}

export default IndexPage;