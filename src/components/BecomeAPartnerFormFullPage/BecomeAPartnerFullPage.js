import styles from './BecomeAPartner.module.css'
import classnames from 'classnames'
import PhoneInput from "react-phone-number-input/input";
import React, {useState} from "react";
import 'react-phone-number-input/style.css'
import kz from 'react-phone-number-input/locale/ru.json'
import {Image} from "react-bootstrap";
import globals from "../../globals";

const axios = require('axios').default;

export default function BecomeAPartnerFullPage(props){
    const [messageForUser, setMessageForUser] = useState(null);
    const [subMessageForUser, setSubMessageForUser] = useState(null);
    const [submitButtonPressed, setSubmitButtonPressed] = useState(false);
    const [successfulApplication, setSuccessfulApplication] = useState(false);


    const [companyName, setCompanyName] = useState("");
    const [contactName, setContactName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage]= useState("");

    return(
        <div className={styles.body}>
            <div className={styles.goBack} onClick={()=>{
                props.close(false)
            }}>
                <Image src={'/left-arrow.png'} className={styles.goBackImg}/>
            </div>
            <h1 className={styles.main_title}>Стать партнером <span className={styles.orange}>Oilan.io</span></h1>

            <div style={{marginTop: 40}} className={styles.techSupportInputsWrapper}>
                <input type="text" placeholder={'Наименование компании'} onChange={(e)=>{
                    setCompanyName(e.target.value)
                }} className={styles.techSupportInput}/>

                <input
                    type="text"
                    className={styles.techSupportInput}
                    onKeyDown={e => {
                        if(e.keyCode === 8){
                            setPhone(phone.slice(0,-1));
                        }
                    }}
                    onChange={e => globals.checkPhoneMask(e.target.value, setPhone)}
                    placeholder='Номер телефона'
                    value={phone}
                />

                <input type="text" placeholder={'Ваш email'} onChange={(e)=>{
                    setEmail(e.target.value)
                }} className={styles.techSupportInput}/>

                <input type="text" placeholder={'Контактное лицо'} onChange={(e)=>{
                    setContactName(e.target.value)
                }} className={styles.techSupportInput}/>

            </div>
            <span className={styles.message}>
                {messageForUser}
                <br/>
                {subMessageForUser}
            </span>
            <div className={styles.center}>
                <button className={styles.button}
                        onClick={()=>{
                            if(companyName === ''){
                                setMessageForUser("Заполните все поля!");
                                setSubMessageForUser("Введите имя!");
                            }
                            else if(phone === ''){
                                setMessageForUser("Заполните все поля!");
                                setSubMessageForUser("Введите телефон!");
                            }
                            else if(email === ''){
                                setMessageForUser("Заполните все поля!");
                                setSubMessageForUser("Введите почту!");
                            }
                            else if(contactName === ''){
                                setMessageForUser("Заполните все поля!");
                                setSubMessageForUser("Введите описание!");
                            }
                            else{
                                const data = {
                                    company_name: companyName,
                                    fullname: contactName,
                                    phone: phone,
                                    email: email
                                };

                                axios.post(`${globals.productionServerDomain}/partnershipRequests`, data).then(res => {
                                    setSuccessfulApplication(true);
                                    setMessageForUser('Ваша заявка сохранена!');
                                    setSubMessageForUser('Проверьте электронную почту!');
                                    setSubmitButtonPressed(true);
                                });
                        }}}
                >{submitButtonPressed ? ('Заявка отправлена!') : ('Оставить заявку')}</button>
            </div>

        </div>
    )
}