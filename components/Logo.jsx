
const Logo = () => {
    return <>
        <div className="LogoImage">

        </div>
        <style jsx>
            {`
                .LogoImage {
                    width: 34px;
                    height: 34px;

                    background-image: url("/static/logo.jpg");
                    background-size: cover;
                    background-position: center;
                }
            `}
        </style>
    </>
}

export default Logo;