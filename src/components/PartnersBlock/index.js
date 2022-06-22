import styles from './style.module.css'
import {Image} from "react-bootstrap";
import {useEffect, useState} from "react";
import {default as axios} from "axios";
import globals from "../../globals";

const PartnersBlock = () => {

    const [partners, setPartners] = useState([])

    useEffect(async()=>{
        let result = await axios.get(`${globals.productionServerDomain}/partners_block/`);
        setPartners(result.data)
    }, [])
    console.log(partners)
    return(
        <div className={styles.container}>
            <div className={styles.titleBlock}>
                <Image src={'/handshake.png'} className={styles.titleImage}/>
                <span className={styles.title}>Наши партнеры</span>
            </div>
            <div className={styles.wrapper}>
                {
                    partners.length>0 && partners.map(partner => <a className={styles.link}
                        href={`/course/center/${encodeURIComponent(partner.url)}?id=${encodeURIComponent(partner.subcourse_id)}`}>
                        <div style={{backgroundImage: `url("${partner.logo}")`, backgroundSize: partner.square_form ? 'cover' : 'contain'}} className={styles.logo}></div>
                    </a>)
                }
            </div>
        </div>
    )
}

export default PartnersBlock;