import styles from '../../../styles/components/CourseMiniCard.module.css'
import classnames from 'classnames'

export default function CourseMiniCard(props){


    return(
        <div className={styles.body}>
            <div className={styles.avatar}>
                <img src={props.course.img_src} className={styles.avatar_img} alt=""/>
            </div>
            <span className={styles.title}>{props.course.title}</span>
        </div>
    )
}