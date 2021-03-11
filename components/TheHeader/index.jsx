import Link from "next/link";
import Logo from "../Logo";
import { useRouter } from 'next/router'

const TheHeader = () => {

    const router = useRouter()

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
                                <a 
                                    className={ 
                                        router.pathname === "/team"
                                        ? "active" : "disactive" 
                                    }
                                >
                                    Team
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/about">
                                <a 
                                    className={ 
                                        router.pathname === "/about" 
                                        ? "active" : "disactive" 
                                    }
                                >
                                    About
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a 
                                    className={ 
                                        router.pathname === "/" 
                                        ||
                                        router.pathname.split("/")[1] === "collection" 
                                        ? "active" : "disactive" 
                                    }
                                >
                                    Collections
                                </a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default TheHeader;