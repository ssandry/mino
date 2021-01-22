import TheHeader from "../components/TheHeader/TheHeader";

const DefaultLayout = ( { children } ) => {
    return <>
        <TheHeader />
        <div className="defaultLayout">
            <main>
                { children }
            </main>
        </div>
    </>
}

export default DefaultLayout;