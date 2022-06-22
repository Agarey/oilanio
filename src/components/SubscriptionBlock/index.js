import styles from './style.module.css'
import SubscriptionCardsWrapper from "../SubscriptionCardsWrapper";

const SubscriptionBlock = (props) => {
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
                {/*<div className={styles.rightBlock} style={{backgroundColor: '#fff', padding: 15, borderRadius: 10}}>*/}
                {/*    <span className={styles.bold} style={{fontSize: 18}}>История подписок</span>*/}
                {/*    <div className={styles.list} style={{marginTop: 15}}>*/}
                {/*        <div className={styles.listItemR}>*/}
                {/*            <span className={styles.date}>01.01.01</span> <span>Подписка по тарифу Standart</span> <span className={styles.medium}>17 900KZT</span>*/}
                {/*        </div>*/}
                {/*        <div className={styles.listItemR}>*/}
                {/*            <span className={styles.date}>01.01.01</span> <span>Подписка по тарифу Standart</span> <span className={styles.medium}>17 900KZT</span>*/}
                {/*        </div>*/}
                {/*        <div className={styles.listItemR}>*/}
                {/*            <span className={styles.date}>01.01.01</span> <span>Подписка по тарифу Standart</span> <span className={styles.medium}>17 900KZT</span>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <div style={{marginTop: 50}}>
                <span className={styles.headerTitle}>Подписочные планы</span>
            </div>
            <br/>
            <SubscriptionCardsWrapper/>
            <br/><br/><br/>
        </div>
    )
}

export default SubscriptionBlock;