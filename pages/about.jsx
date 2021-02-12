import DefaultLayout from "../layouts/default";

const AboutPage = ( { collections } ) => {
    return <DefaultLayout>
        <div className="aboutHeader">
            <h3>NANA KOMATSU / 小松奈々 </h3>
            <h1 className="logo">MI<span className="n">N</span>O Magazine</h1>
            <p className="p-f">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p className="p-l">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do tempor.</p>
        </div>
    </DefaultLayout>
}

export default AboutPage;