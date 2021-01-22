
import Link from "next/link";
import Logo from "../Logo";

const TheHeader = () => {
    return (
        <header>
            <div className="header">
                <Logo />
                <input type="checkbox" id="checkbox" />
                <label htmlFor  = "checkbox" className="menu">
                    <div></div>
                    <div></div>
                    <div></div>
                </label>
                <nav>
                    <ul>
                        <li>
                            <Link href="/">
                                <a>Team</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a>About</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a>Collections</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default TheHeader;