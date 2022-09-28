import styles from './ContactBlock.module.css'
import {Image} from "react-bootstrap";
import PhoneInput from "react-phone-number-input/input";
import React, {useState} from "react";
import {default as axios} from "axios";
import globals from "../../globals";

const ContactBlock = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('Отправить')
  const [message, setMessage] = useState('')

  const sendPhone = () => {
    if(phone.length >= 16){
      axios.post(`${globals.productionServerDomain}/callRequest/`, {phone: phone, name: name})
      .then(
        setMessage('Заявка успешно отправлена!')
      );
    } else {
      setMessage('Неккоректно введен номер!');
    };
  };

  return (
    <div className={styles.container}>
      <div className={styles.rightBlock}>
        <Image 
          src='https://realibi.kz/file/309178.png' 
          className={styles.image}
        />
      </div>
      <div className={styles.leftBlock}>
        <div className={styles.titleBlock}>
          <span className={styles.title}>
            Остались вопросы?
          </span>
        </div>
        <div className={styles.footer}>
          <span className={styles.subtitle}>
            Оставьте ваш номер и ожидайте звонка от оператора, мы с радостью вам ответим
          </span>
          <div className={styles.form}>
            <div className={styles.selectContainer}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.techSupportInput}
                style={{ cursor: "text", color: "black" }}
                placeholder="Имя Фамилия"
              />
            </div>
            <div className={styles.selectContainer}>
              <input
                type="text"
                className={styles.techSupportInput}
                style={{ cursor: "text" }}
                onKeyDown={(e) => {
                  if (e.keyCode === 8) {
                    setPhone(phone.slice(0, -1));
                  }
                }}
                onChange={(e) => {
                  globals.checkPhoneMask(e.target.value, setPhone)
                }}
                placeholder="Телефон"
                value={phone}
              />
            </div>
            <button
              className={styles.button}
              onClick={()=>{
                sendPhone();
              }}
            >
              Оставить заявку
            </button>
          </div>
          <br/>
          <span 
            className={styles.subtitle} 
            style={{fontFamily: 'Rubik Medium', fontSize: 16}}
          >
            {message}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ContactBlock;