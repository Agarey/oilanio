import React, {useEffect, useState} from "react";
import styles from '../../../../styles/components/form.module.css'
const axios = require('axios').default;
import moment from 'moment'
import globals from "../../../globals";


export function TechSupportForm(props) {
    const [comment, setComment] = useState("");
    const [messageText, setMessageText] = useState('');
    const handleSubmit = (evt) => {

    }
    return (
        <div className={styles.contactFormBody}>
            <div className={styles.techSupportHeader}>
                <span className={styles.contactFormTitle}>Возникли вопросы?</span>
                <span className={styles.contactFormDesc}>У Вас есть предложения или возникли проблемы с личным кабинетом? Оставьте комментари и контакты для связи ниже</span>
            </div>
            <div className={styles.techSupportInputsWrapper}>
                <textarea placeholder={'Сообщение'} rows={4} onChange={(e)=>{
                    setComment(e.target.value)
                }} className={styles.techSupportTextArea}>

                </textarea>
            </div>

            <div style={{color: 'black', textAlign: 'center', marginTop: 5, fontWeight: 'bold'}}>{messageText}</div>

            <div style={{width: '100%', display: 'flex', justifyContent: 'center', margin: '10px 0'}}>
                <span className={styles.contactFormButton} onClick={() => {
                    axios({
                        method: 'post',
                        url: `${globals.productionServerDomain}/createTechSupportTicket`,
                        data: {
                            studentAccount: props.studentAccount !== undefined ? props.studentAccount : false,
                            phone: props.studentAccount ?
                                JSON.parse(localStorage.getItem(globals.localStorageKeys.currentStudent)).phone : '',
                            center_id: props.studentAccount === undefined ? props.center.id : null,
                            message: comment
                        }
                    });

                    setMessageText('Заявка успешно отправлена!');

                }}>Отправить </span>
            </div>
            <div className={styles.contactFormFooter}>
                <div className={styles.hideOnMobile}>
                    <span className={styles.contactFormTitle} style={{fontSize: '14px', fontFamily: 'Rubik Medium'}}>Или кликните на номер, чтобы позвонить</span>
                </div>
                <div className={styles.contactFormFooterFlex}>
                    <div><a href="tel:+77470953440" className={styles.contactFormLink}>+7 (747) 095-34-40</a></div>
                    <div><a href="tel:+77470953441" className={styles.contactFormLink}>+7 (747) 095-34-41</a></div>
                    {/*<div><img src="/phone-call.png" alt="" className={styles.contactFormIcon}/><a href="tel:87086157439" className={styles.contactFormLink}>+7 (708) 800-71-77</a></div>*/}
                    <div><a href="mailto:oilanedu@gmail.com" className={styles.contactFormLink}>oilanedu@gmail.com</a></div>
                </div>
            </div>
        </div>
    );
}
