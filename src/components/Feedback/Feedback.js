import styles from '../../../styles/components/Feedback.module.css'

export default function Feedback(props) {
    const fullname = 'Arlan Amanbayev';
    const date = '2021-08-18';
    const rating = 5;
    const text = 'ocheni klassno vse';


    return (
        <div className={styles.feedback_item} style={{display: 'block'}}>
            <div className={styles.fullname}>
                Arlan
            </div>
            <div className={styles.datetime}>
                {date}ds
            </div>

            <hr className={styles.hr}/>

            <div className={styles.text}>
                {text}
            </div>
        </div>
    )
}