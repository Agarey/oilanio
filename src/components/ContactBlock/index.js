import styles from './ContactBlock.module.css'
import {Image} from "react-bootstrap";
import PhoneInput from "react-phone-number-input/input";
import React, {useState} from "react";
import {default as axios} from "axios";
import globals from "../../globals";

const ContactBlock = () => {

    const [phone, setPhone] = useState('8(7')
    const [status, setStatus] = useState('Отправить')
    const [message, setMessage] = useState('')

    const sendPhone = () => {
        if(phone.length >= 16){
            axios.post(`${globals.productionServerDomain}/callRequest/`, {phone: phone}).then(
                setMessage('Заявка успешно отправлена!')
            )
        } else {
            setMessage('Неккоректно введен номер!')
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftBlock}>
                <div className={styles.titleBlock}>
                    <Image src={'/bulb-dynamic-color.png'} className={styles.titleImage}/>
                    <span className={styles.title}>Остались вопросы?</span>
                </div>
                <div className={styles.footer}>
                    <span className={styles.subtitle}>Оставьте ваш номер и ожидайте звонка от оператора, мы с радостью вам ответим</span>
                    <div className={styles.form}>
                        {/*<PhoneInput*/}
                        {/*    value={phone}*/}
                        {/*    placeholder={'+7 (777) 777-77-77'}*/}
                        {/*    className={styles.input}*/}
                        {/*    labels={"Казахстан"}*/}
                        {/*    international={false}*/}
                        {/*    defaultCountry="KZ"*/}
                        {/*    minlength={11}*/}
                        {/*    maxlength={16}*/}
                        {/*    onChange={setPhone}/>*/}
                        <input
                            type="text"
                            className={styles.input}
                            onKeyDown={e => {
                                if(e.keyCode === 8){
                                    setPhone(phone.slice(0,-1));
                                }
                            }}
                            onChange={e => globals.checkPhoneMask(e.target.value, setPhone)}
                            placeholder='Номер телефона'
                            value={phone}
                        />
                        <span className={styles.btn} onClick={()=>{
                            sendPhone();
                        }}>
                            {status}
                        </span>
                    </div>
                    <br/>
                    <span className={styles.subtitle} style={{fontFamily: 'Rubik Medium', fontSize: 16}}>{message}</span>
                </div>
            </div>
            <div className={styles.rightBlock}>
                <Image src={'/Saly-43.png'} className={styles.image}/>
            </div>
        </div>
    )
}

export default ContactBlock;