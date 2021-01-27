import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";

const Card = ({ HREF, SRC, ALT, engCL, jpCL, YEAR, AS }) => {
    return <Link href = {HREF} as={AS} >
        <a className="Card">
            <motion.div 
                className="Card__img" 
                layoutId={SRC} 
                transition={{ duration: .5 }}
            >    
                <img 
                    src={SRC} 
                    alt={ALT} 
                />
            </motion.div>
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