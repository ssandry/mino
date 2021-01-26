import TheHeader from "../components/TheHeader/TheHeader";
import TheFooter from "../components/TheFooter/index";

const DefaultLayout = ( { children } ) => {
    return <>
        <TheHeader />
        <div className="defaultLayout">
            <main>
                { children }
            </main>
        </div>
        <TheFooter />
    </>
}

export default DefaultLayout;