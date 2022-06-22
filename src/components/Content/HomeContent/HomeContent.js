import styles from "../../../../styles/components/content/HomeContent.module.css";
import Carousel from "../../Carousel/Carousel";
import Link from "next/link";
import HorizontalLine from "../../HorizontalLine/HorizaontalLine";
import CourseCard from "../../CourseCard/CourseCard";
import {useRef} from "react";
import {Image} from "react-bootstrap";

export default function HomeContent() {
    const myRef = useRef(null);
    return (
        <div style={{width: '100%'}}>
            <div className={styles.main_block}>
                <div className={styles.flex_block} >
                    <div className={styles.container}>
                        <p className={styles.main_text_big}>
                            Учиться легко <br/> вместе с Oilan!
                        </p>
                        <p className={styles.main_text_small}>Образовательный маркетплейс</p>
                        <a href="/catalog" className={styles.btn}>Перейти в каталог</a>
                    </div>
                    <div className={styles.main_img}>
                        <Image src="/narakete.png" className={styles.image}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
