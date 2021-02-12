import Link from "next/link";
import Logo from "../Logo";

import { useState } from "react";

const TheHeader = () => {

    const [ acLn, setAcLn ] = useState("collections")

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
                                    className={ acLn === "team" ? "active" : "disactive" }
                                    onClick = { () => { setAcLn("team") } }
                                >
                                    Team
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/about">
                                <a 
                                    className={ acLn === "about" ? "active" : "disactive" }  
                                    onClick = { () => { setAcLn("about") } }  
                                >
                                    About
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a 
                                    className={ acLn === "collections" ? "active" : "disactive" }  
                                    onClick = { () => { setAcLn("collections") } }  
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