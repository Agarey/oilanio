import React, { useState } from "react";
import styles from '../../../../styles/components/form.module.css'
const axios = require('axios').default;
import classnames from 'classnames'
import bcrypt from "bcryptjs";
import globals from "../../../globals";
import {useRouter} from "next/router";
import SubscriptionCardsWrapper from "../../SubscriptionCardsWrapper";
import {Image} from "react-bootstrap";

function SubscriptionPaymentForm(props) {

const router = useRouter();


    function prettify(num) {
        var n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    }

    const packages = [
        {
            id: 1,
            title: 'месяц',
            opportunities: ["Неограниченное размещение курсов", "Публикация акции", "Активация личного кабинета", "Рассылка заявок", "Обработка заявок"],
            price: 7000
        },
        {
            id: 3,
            title: 'месяца',
            opportunities: ["Неограниченное размещение курсов", "Публикация акции", "Активация личного кабинета", "Рассылка заявок", "Обработка заявок"],
            price: 18000
        },
        {
            id: 6,
            title: 'месяцев',
            opportunities: ["Неограниченное размещение курсов", "Публикация акции", "Активация личного кабинета", "Рассылка заявок", "Обработка заявок"],
            price: 30000
        },
    ]

    const [selectedPack, setSelectedPack] = useState(0);
    const [selectedMonthCount, setSelectedMonthCount] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showPackages, setShowPackages] = useState(true);

    const [message, setMessage] = useState('');
    const [ofertaCheck, setOfertaCheck] = useState(false);

    const createPayment = async (reference_id, price) => {
        let paymentHost = "https://finddifferences.club/proxy";
        let secret_key = "CbYf5sAuv4VJyFz9cD9x";

        const salt = bcrypt.genSaltSync(10);

        const paymentPayload = {
            centerId: +localStorage.getItem(globals.localStorageKeys.centerId),
        }

        let paymentData = {
            reference_id: reference_id,
            request_url: `${globals.productionServerDomain}/handlepayment`,
            back_url: `${globals.productionServerDomain}/handlepayment`,
            amount: price,
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
    function prettify(num) {
        var n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    }

    return (
        <div className={styles.formBody} >
            <div style={{width: '100%', display: showPackages ? 'block' : 'none'}}>
                {packages.map((pack)=>{
                    return(
                        <div className={classnames(styles.package)}>
                            <hr style={{margin: '5px 0'}}/>
                            <div className={styles.packageHeader}>
                                <span className={styles.packageTitle}><span className={styles.packId}>{pack.id}</span> {pack.title}</span>
                                <span className={styles.price}>
                                    <span className={styles.packId} style={{fontFamily: 'Rubik Bold', marginRight: 10}}>
                                        {prettify(pack.price)}
                                    </span>KZT
                                </span>
                            </div>
                            {pack.opportunities.map(title => (
                                <div className={styles.listItem}>
                                    <Image src={'/violet_galochka.png'} className={styles.opportunitiesImage}/>
                                    <span className={styles.opportunities}>{title}</span>
                                </div>
                            ))}
                            <button
                                className={styles.btn}
                                onClick={async () => {
                                    await setTotalPrice(pack.price);
                                    await createPayment(Math.floor(Math.random()*100000), pack.price)
                                }}
                            >Подключить</button>
                            <hr style={{margin: '5px 0'}}/>
                        </div>
                    )
                })}
                {/*<span style={{fontFamily: 'sans-serif', fontWeight: 'bold', color: 'black', marginTop: '10px'}}>{message}</span> <br/>*/}
                {/*<label style={{fontFamily: 'sans-serif', fontWeight: 'bold', color: 'white', marginTop: '10px'}}>*/}
                {/*    <input*/}
                {/*        type="checkbox"*/}
                {/*        onClick={() => {*/}
                {/*            setOfertaCheck(!ofertaCheck)*/}
                {/*        }}*/}
                {/*    /> <font style={{color: 'black'}}> Я принимаю условия </font> <a href="/offer" style={{color: 'blue', textDecoration: 'underline'}}>публичной оферты.</a>*/}
                {/*</label> <br/>*/}
                {/*<span style={{color: 'black'}}>Выберите количество месяцев подписки</span>*/}

                {/*<div style={{width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '10px', alignItems: 'center'}}>*/}
                {/*    <select onChange={ event => setSelectedMonthCount(event.target.value)} className={styles.paymentFormSelect} >*/}
                {/*        <option value={1}>1 месяц</option>*/}
                {/*        <option value={3}>3 месяца</option>*/}
                {/*        <option value={6}>6 месяцев</option>*/}
                {/*    </select>*/}


                {/*    <button className={styles.formSubmit} onClick={() => {*/}
                {/*        if(ofertaCheck){*/}
                {/*            setMessage('')*/}
                {/*            setShowPackages(false);*/}
                {/*            setTotalPrice(packages[0].periods.filter(item => item.monthCount === Number(selectedMonthCount))[0].price);*/}
                {/*        } else {*/}
                {/*            setMessage('Прочтите публичную оферту и дайте свое согласие!')*/}
                {/*        }*/}
                {/*    }}>Перейти к оплате</button>*/}
                {/*</div>*/}
            </div>

            <div style={{width: '100%', display: showPackages ? 'none' : 'block'}}>
                {
                    selectedPack !== 100 ?
                        (
                            <div style={{width: '100%'}}>
                                <span>
                                    Вы выбрали пакет на <span style={{fontWeight: 'bold'}}>{selectedMonthCount}</span> месяцев.
                                </span>

                                <br/> <br/>

                                <span>К оплате: <span style={{fontWeight: 'bold'}}>{totalPrice} KZT</span> </span>
                                <br/>

                                <button className={styles.formSubmit} style={{marginTop: '10px'}} onClick={ async() => {
                                    let referenceId = Math.floor(Math.random() * 999999) + 1;
                                    await createPayment(referenceId);
                                }}>Оплатить</button>
                            </div>
                        )
                        :
                        (
                            <div style={{width: '100%', textAlign: 'center', }}>
                                <span style={{fontWeight: 'bold', color: "white", borderBottom: '1px dashed red'}}>Вы не выбрали пакет для подписки!</span>
                            </div>
                        )
                }
                <div style={{display:'flex', width: '100%', justifyContent: 'center'}}>
                    <span style={{color: 'white', fontSize: '12px', textDecoration: 'underline', cursor: "pointer"}}
                          onClick={ () => {
                              setShowPackages(true)
                          }}>Вернуться к выбору пакетов</span>
                </div>
            </div>

        </div>
    );
}

export default SubscriptionPaymentForm;
