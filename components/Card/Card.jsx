import Link from "next/link";

const Card = ({ HREF, SRC, ALT, engCL, jpCL, YEAR, AS }) => {
    return <Link href = {HREF} as={AS} >
        <a className="Card">
            <div className="Card__img">
                <img src={SRC} alt={ALT}/>
            </div>
            <div className="tags">
                <div className="tags_line">
                    <h6>{engCL} / <span>{jpCL}</span></h6> 
                    <div className="tags_time">{YEAR}</div>
                </div>
            </div>
        </a>
    </Link>
}

export default Card;