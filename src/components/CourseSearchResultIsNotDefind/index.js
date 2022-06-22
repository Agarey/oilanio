import styles from './style.module.css'
import {Link} from "react-router-dom";
import {Image} from "react-bootstrap";
import {useRouter} from "next/router";

const CourseSearchResultIsNotDefind = (props) => {

    const router = useRouter();
    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <span className={styles.bigViolet}>Упс...</span> <br/>
                <span className={styles.subtitle}>
                    Кажется, по вашему запросу не было <br/> найдено ни одного курса {props.catalog===null && 'или репетитора'}
                </span>
                <br/> <br/>
                <span className={styles.comments}>
                    {props.catalog ? 'Измените параметры поиска и подберите курс снова.'
                        : (
                            <>
                                Попробуйте поискать в <a href="/catalog" className={styles.link}>каталоге</a>, <br/>
                                или подберите курс <a className={styles.link} onClick={()=>router.back()}>ещё раз</a>.
                            </>
                        )
                    }
                </span>
            </div>
            <div className={styles.rigthSide}>
                <Image src={'/negri.png'} className={styles.img}/>
            </div>
        </div>
    )
}

export default CourseSearchResultIsNotDefind;