import styles from './style.module.css'
import {useState} from "react";
import {Image} from "react-bootstrap";
import bcrypt from "bcryptjs";
import globals from "../../globals";
import {default as axios} from "axios";
import {useRouter} from "next/router";

const SubscriptionTutorCardsWrapper = () => {
    function prettify(num) {
        let n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    }

    const router = useRouter();

    const [subsriptionsCards, setSubscriptionsCards] = useState([
        {
            id: 1,
            title: 'Месяц',
            opportunities: ["Неограниченное размещение курсов", "Публикация акции", "Активация личного кабинета", "Рассылка заявок", "Обработка заявок"],
            price: 7000
        },
        {
            id: 3,
            title: 'Месяца',
            opportunities: ["Неограниченное размещение курсов", "Публикация акции", "Активация личного кабинета", "Рассылка заявок", "Обработка заявок"],
            price: 18000
        },
        {
            id: 6,
            title: 'Месяцев',
            opportunities: ["Неограниченное размещение курсов", "Публикация акции", "Активация личного кабинета", "Рассылка заявок", "Обработка заявок"],
            price: 30000
        },
    ]);

    const createPayment = async (monthCount, totalPrice) => {
        let reference_id = Math.floor(Math.random() * 999999) + 1;

        let paymentHost = "https://finddifferences.club/proxy";
        let secret_key = "CbYf5sAuv4VJyFz9cD9x";

        const salt = bcrypt.genSaltSync(10);

        const paymentPayload = {
            centerId: localStorage.getItem(globals.localStorageKeys.centerId),
            monthCount: monthCount,
        }

        let paymentData = {
            reference_id: reference_id,
            request_url: `${globals.productionServerDomain}/handlepayment`,
            back_url: `${globals.productionServerDomain}/handlepayment`,
            amount: totalPrice,
            description: JSON.stringify(paymentPayload),
            merchant_id: 66,
            secret_key: bcrypt.hashSync(reference_id + secret_key, salt)
        };

        const result = await axios.post(
            `${paymentHost}/invoice/create`,
            paymentData,
            {headers: {'Access': 'application/json '}}
        );

        if(result['data']['success']){
            let redirectUrl = result['data']['data']['redirect_url'];
            await router.push(redirectUrl)
        }else{
            console.log(result);
        }
    }

    return (
        <div className={styles.container}>
            {
                subsriptionsCards.map(card => (
                    <div className={styles.card}>
                        <div style={{width: "100%"}}>
                            <div className={styles.cardTop}>
                                <span className={styles.id}>{card.id}</span>
                                <span className={styles.cardTitle}>{card.title}</span>
                            </div>
                            <div className={styles.list}>
                                {card.opportunities.map(title => (
                                    <div className={styles.listItem}>
                                        <Image src={'violet_galochka.png'} className={styles.opportunitiesImage}/>
                                        <span className={styles.opportunities}>{title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles.price}>
                            {prettify(card.price)} KZT
                        </div>

                        <div className={styles.center}>
                            <button
                                className={styles.btn}
                                onClick={() => createPayment(card.id, card.price)}
                            >Подключить</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default SubscriptionTutorCardsWrapper;