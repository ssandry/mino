import TheHeader from "../components/TheHeader/TheHeader";

const DefaultLayout = ( { children } ) => {
    return <>
        <TheHeader />
        { children }
    </>
}

export default DefaultLayout;