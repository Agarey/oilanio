import styles from './style.module.css'

export default function ApplicationForTutor(props){
    return (
        <div className={styles.container}>
            <div className={styles.info_row}>
                <p className={styles.info_title}>Имя</p>
                <p className={styles.info_value}></p>
            </div>
            <div className={styles.info_row}>
                <p className={styles.info_title}>Телефон</p>
                <p className={styles.info_value}></p>
            </div>
            <div className={styles.info_row}>
                <p className={styles.info_title}>Почта</p>
                <p className={styles.info_value}></p>
            </div>
        </div>
    );
}