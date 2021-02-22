import { Link as Anchor } from "react-scroll";
import Link from "next/link";

const TheFooter = () => {
    return <>
        <footer>
            <div className="wr">
                <Link href = "/">
                    <a>Go to collections</a>
                </Link>
                <Anchor 
                    to="collection-main" 
                    smooth={true} 
                    duration={2600} 
                >
                    <a className="two">Go to top</a>
                </Anchor>
            </div>
        </footer>
        <style jsx >
            {`
                footer {
                    width: 100%;
                    height: 220px;

                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                footer .wr {
                    width: 100%;
                    max-width: 1440px;
                    height: 100%;

                    box-sizing: border-box;
                    padding-top: 80px;
                    padding-left: 14vw;
                }

                footer a {
                    font-family: Roboto;
                    font-style: normal;
                    font-weight: 500;
                    font-size: 18px;
                    line-height: 21px;

                    color: #BFBFBF;

                    cursor: pointer;
                }

                footer a.two {
                    margin-left: 20px;
                }
            `}
        </style>
    </>
}

export default TheFooter;