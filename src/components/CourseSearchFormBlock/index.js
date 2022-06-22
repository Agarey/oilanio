import styles from '../../../styles/components/CourseSearchFormBlock.module.css'
import React, {useState} from "react";
import {default as axios} from "axios";
import globals from "../../globals";
import PhoneInput from "react-phone-number-input/input";
import 'react-phone-number-input/style.css'
import kz from 'react-phone-number-input/locale/ru.json'

const CourseSearchFormBlock = (props) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [cityId, setCityId] = useState(null);
    const [isOnline, setIsOnline] = useState(null);
    const [age, setAge] = useState(null);
    const [directionId, setDirectionId] = useState(null);
    const [messageForUser, setMessageForUser] = useState(null);
    const [subMessageForUser, setSubMessageForUser] = useState(null);
    const [submitButtonPressed, setSubmitButtonPressed] = useState(false);
    const [successfulApplication, setSuccessfulApplication] = useState(false);

    return(
        <div className={styles.container}>
            <div className={styles.title_block}>
                <span className={styles.title}>Какие курсы вы ищете?</span>
                <span className={styles.title}>Oilan</span>
            </div>
            <span className={styles.subtitle}>Заполните заявку, и центры свяжутся с вами!</span>
            <div className={styles.wrapper}>
                <div className={styles.leftBlock}>

                    <select
                        className={styles.selectBlock}
                        onChange={e => setDirectionId(e.target.value)}
                    >
                        <option value="0">Направление</option>
                        {
                            props.directions !== undefined
                                ?
                                (props.directions.map(filterOption => (
                                    filterOption.name !== "test"
                                        ?
                                        (<option value={filterOption.id}>{filterOption.name}</option>)
                                        : null
                                )))
                                :
                                null
                        }
                    </select>
                    <input type="text" placeholder={'Ваше имя'} onChange={(e)=>{
                        setName(e.target.value)
                    }} className={styles.techSupportInput}/>
                    <PhoneInput
                        placeholder={'Ваш номер телефона'}
                        className={styles.techSupportInput}
                        labels={kz}
                        international={false}
                        defaultCountry="KZ"
                        value={phone}
                        onChange={setPhone}/>
                    <input type="text" placeholder={'Ваш email'} onChange={(e)=>{
                        setEmail(e.target.value)
                    }} className={styles.techSupportInput}/>
                </div>
                <div className={styles.rightBlock}>
                    <select
                        className={styles.selectBlock}
                        onChange={e => setIsOnline(e.target.value)}
                        style={{width: '100%'}}
                    >
                        <option value="0">Формат занятий</option>
                        <option value={true}>Онлайн</option>
                        <option value={false}>Офлайн</option>
                    </select>
                    <textarea
                        placeholder={`Описание курса - возраст учащегося, желаемое время и так далее. Чем подробнее описание, тем лучше будет поиск.`
                        }
                        rows={2}
                        onChange={(e)=>{
                            setComment(e.target.value)
                        }}
                        className={styles.techSupportTextArea}
                    >

                </textarea>
                    <div className={styles.contactFormDesc} style={{
                        paddingTop: '3%',
                        paddingBottom: '3%',
                        textAlign: 'center',
                        color: successfulApplication ? 'green' : 'red',
                        width: '100%',
                    }}>
                        {messageForUser}
                        <br/>
                        {subMessageForUser}
                    </div>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center', margin: '10px 0'}}>
                        <span className={submitButtonPressed ? styles.techSupportSubmitPressed : styles.techSupportSubmitNotPressed} onClick={() => {

                            if(directionId === '0' || directionId === null){
                                setMessageForUser("Заполните все поля!");
                                setSubMessageForUser("Выберите направление!");
                            }else if(name === ''){
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
                            else if(comment === ''){
                                setMessageForUser("Заполните все поля!");
                                setSubMessageForUser("Введите описание!");
                            }
                            else {
                                axios({
                                    method: 'post',
                                    url: `${globals.productionServerDomain}/createCourseSearchTicket`,
                                    data: {
                                        city_id: cityId,
                                        direction_id: directionId,
                                        name: name,
                                        phone: phone,
                                        email: email,
                                        message: comment,
                                        age: age,
                                        isOnline: isOnline
                                    }
                                }).then(res => {
                                    setSuccessfulApplication(true);
                                    setMessageForUser('Ваша заявка сохранена!');
                                    setSubMessageForUser('Проверьте электронную почту!');
                                    setSubmitButtonPressed(true);
                                });

                                props.yandexMetricaFunction(78186067,'reachGoal','отправка формы на поиск курсов');
                            }

                        }}>{submitButtonPressed ? ('Заявка отправлена!') : ('Отправить заявку')}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseSearchFormBlock;