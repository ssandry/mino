import TheHeader from "../components/TheHeader";
import TheFooter from "../components/TheFooter";

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