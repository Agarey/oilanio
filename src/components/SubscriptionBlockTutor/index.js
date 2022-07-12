import styles from './style.module.css'
import SubscriptionTutorCardsWrapper from '../SubscriptionTutorCardsWrapper';

const SubscriptionBlockTutor = (props) => {
    let lastPaymentDate = props.courseInfo.last_payment_date;
    let nextPaymentDate = props.courseInfo.next_payment_date;

    const dateOptions = { timeZone: 'UTC', month: 'long', day: 'numeric', year: 'numeric' };

    const dateFormatter = new Intl.DateTimeFormat('ru-RU', dateOptions);
    const lastPaymentDateFormatted = dateFormatter.format(new Date(lastPaymentDate));
    const nextPaymentDateFormatted = dateFormatter.format(new Date(nextPaymentDate));
    return (
        <div className={styles.container}>
            <div>
                <span className={styles.headerTitle}>Сведения о подписке</span>
            </div>
            <div className={styles.top}>
                <div className={styles.leftBlock}>
                    <div className={styles.list}>
                        <div className={styles.listItem}>
                            <span className={styles.bold}>Ваш тариф:</span> <span>Standart</span>
                        </div>
                        <div className={styles.listItem}>
                            <span className={styles.bold}>Подписка с:</span> <span>{lastPaymentDateFormatted}</span>
                        </div>
                        <div className={styles.listItem}>
                            <span className={styles.bold}>Подписка до:</span> <span>{nextPaymentDateFormatted}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{marginTop: 50}}>
                <span className={styles.headerTitle}>Подписочные планы</span>
            </div>
            <br/>
            <SubscriptionTutorCardsWrapper />
            <br/><br/><br/>
        </div>
    )
}

export default SubscriptionBlockTutor;