import styles from './CourseHelpWithFullPage.module.css'
import classnames from 'classnames'
import PhoneInput from "react-phone-number-input/input";
import React, {useEffect, useState} from "react";
import 'react-phone-number-input/style.css'
import kz from 'react-phone-number-input/locale/ru.json'
import {Image} from "react-bootstrap";
import globals from "../../globals";
import ym from 'react-yandex-metrika';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import style from "../../../pages/direction/direction.module.css";
import CourseCard from "../CourseCard/CourseCard";
import TutorCourseCard from "../TutorCourseCard";
import ModalWindow from "../Modal/ModalWindow";
import {BecomeAPartner} from "../Forms/BecomeAPartnerForm/BecomeAPartner";
import CourseSearchResultIsNotDefind from "../CourseSearchResultIsNotDefind";
import validator from 'validator'

const axios = require('axios').default;

export default function CourseSearchApplicationFullPage(props){
    const [step, setStep] = useState(1)
    const [firstStepValidationState, setFirstStepValidationState] = useState(false)

    const [searchCenter, setSearchCenter] = useState(0);

    const [show, setShow] = useState(false);

    const [directionId, setDirectionId] = useState(1);
    const [cityDistrict, setCityDistrict] = useState(0);
    const [price, setPrice] = useState('0');

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [cityId, setCityId] = useState('1');
    const [isOnline, setIsOnline] = useState(false);
    const [age, setAge] = useState(null);
    const [applicationMessage, setApplicationMessage] = useState('');

    const [messageForUser, setMessageForUser] = useState(null);
    const [subMessageForUser, setSubMessageForUser] = useState(null);
    const [submitButtonPressed, setSubmitButtonPressed] = useState(false);
    const [successfulApplication, setSuccessfulApplication] = useState(false);

    const [ofertaCheck, setOfertaCheck] = useState(false);

    const [data,setData]= useState({})
    const [courseCards, setCourseCards] = useState([])

    const [loading, setLoading] = useState(false)
    const [length, setLength] = useState(8)

    const [loadingModal, setLoadingModal] = useState(false);

    const [regions, setRegions] = useState([]);

    const [imagesBase, setImagesBase] = useState([]);

    const handleClose = () => {
        setShow(false);
        props.close(false)
    }

    function firstStepValidation(){
        if(name.length < 3){
            setMessageForUser("Заполните все поля!");
            setSubMessageForUser("Заполните имя!");
            ym('reachGoal','send_application_button_pressed_unsuccessfully')
            return false
        }else if(phone.length < 16){
            setMessageForUser("Заполните все поля!");
            setSubMessageForUser("Заполните номер телефона!");
            ym('reachGoal','send_application_button_pressed_unsuccessfully')
            return false
        }else if(email.length < 1){
            setMessageForUser("Заполните все поля!");
            setSubMessageForUser("Заполните электронную почту!");
            ym('reachGoal','send_application_button_pressed_unsuccessfully')
            return false
        }else if(!validator.isEmail(email)){
            setMessageForUser("Заполните все поля!");
            setSubMessageForUser("Неверная электронная почта!");
            ym('reachGoal','send_application_button_pressed_unsuccessfully')
            return false
        }else if(comment.length < 3){
            setMessageForUser("Заполните все поля!");
            setSubMessageForUser("Заполните описание курса!");
            ym('reachGoal','send_application_button_pressed_unsuccessfully')
            return false
        }else{
            setFirstStepValidationState(true)
            return true
        }
    }
    

    function Main(){
        return(
            <div className={styles.body}>
                {/*<div className={styles.displayNoneOnMobile}>*/}
                {/*    <Image src={'Other05.png'} style={{left: 0, bottom: 0, position: 'absolute', height: 256}}/>*/}
                {/*</div>*/}

                <div className={styles.header}>
                    <div className={styles.goBack} onClick={()=>{
                        if(step === 1){
                            props.close(false)
                        }
                        if(step === 2){
                            setStep(1)
                        }
                    }}>
                        <Image src={'/left-arrow.png'} className={styles.goBackImg}/>
                    </div>
                    <h1 className={styles.main_title}>
                        {
                            step === 1 ? (
                                <>
                                    Введите свои данные
                                </>
                            ) : (
                                <>
                                    <span className={ styles.orange}>Шаг 2 –</span> Введите ваши персональные данные
                                </>
                            )
                        }
                    </h1>
                </div>

                <div className={styles.wrapper}>
                    <div className={styles.techSupportInputsWrapper}>
                        {
                            step === 1 ? firstStep() : secondStep()
                        }
                    </div>
                    <div className={styles.imageBlock} >
                        {
                            step === 2 &&
                            <span className={styles.imageTitle}>
                                Подбираем - <span className={styles.orange}>Мы</span> <br/>
                                Выбираете - <span className={styles.orange}>Вы</span> <br/>
                            </span>
                        }

                        <Image className={styles.image} src={step === 1 ? '/Other11.png' : '/Other04.png'}/>
                    </div>
                </div>

            </div>
        )
    }

    const sendApplication = (courseId, userInfo) => {

        let data = {
            name: userInfo.fullName,
            phone: userInfo.phone,
            email: userInfo.email,
            message: comment,
        };
        console.log(data)
        console.log(data.message)
        axios.post(`${globals.productionServerDomain}/helpRequest/`, {name: userInfo.fullName, phone: userInfo.phone, email: userInfo.email, message: comment}).then(
                alert('Заявка успешно отправлена!')
            )
    }

    function firstStep(){
        return(
            <>
                <ModalWindow show={show} handleClose={handleClose} heading={'Ваша заявка была отправлена'} body={(
                    <div style={{color: '#000', fontSize: 16, textAlign: 'center'}}>
                        <p>Ваш запрос был направлен нашим специалистам <br/>
                        В ближайшее время с вами свяжутся</p>
                        <button 
                        className={styles.downButton}
                        onClick = {handleClose}
                        >
                            Понятно
                        </button>
                    </div>
                )}/>

                <input type="text" value={name} onChange={e => setName(e.target.value)} className={styles.selectBlock} style={{cursor: "text"}} placeholder={'Имя'}/>
                <input
                    type="text"
                    className={styles.selectBlock}
                    style={{cursor: "text"}}
                    onKeyDown={e => {
                        if(e.keyCode === 8){
                            setPhone(phone.slice(0,-1));
                        }
                    }}
                    onChange={e => globals.checkPhoneMask(e.target.value, setPhone)}
                    placeholder='Номер телефона'
                    value={phone}
                />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={styles.selectBlock} style={{cursor: "text"}} placeholder={'Электронная почта'}/>

                <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    className={styles.selectBlock}
                    style={{cursor: "text"}}
                    rows="5"
                    placeholder={'Опишите ваши предпочтения: возраст, онлайн/оффлайн обучение, как с вами связаться (позвонить, написать на WhatsApp, Telegram)'}
                ></textarea>
                <label style={{fontFamily: 'Rubik Medium', color: 'white', marginTop: '5px', cursor: 'pointer'}}>
                    <input
                        type="checkbox"
                        onClick={() => {
                            setOfertaCheck(!ofertaCheck)
                        }}
                        checked={ofertaCheck ? true : false}
                    /> Я принимаю условия <a href="/offer/student" style={{color: 'white', textDecoration: 'underline'}}>публичной оферты.</a>
                </label>
                <button className={styles.button}
                      onClick={() => {
                            if(ofertaCheck === false){
                                setMessageForUser("Заявка не была отправлена!");
                                setSubMessageForUser("Прочтите публичную оферту и дайте свое согласие!");
                                ym('reachGoal','send_application_button_pressed_unsuccessfully')
                            }
                            else {
                                if(firstStepValidation()){
                                    sendApplication(0, {
                                        fullName: name,
                                        phone: phone,
                                        email: email
                                    });
                                    ym('reachGoal','go-to-help-button-pressed')
                                    setShow(true);
                                }
                            }
                        }}
                >Подберите мне курс/репетитора</button>

                <span className={styles.message}>
                    {messageForUser}
                    <br/>
                    {subMessageForUser}
                </span>
            </>
        )
    }
    function secondStep(){
        return(
            <>
                <input type="text" placeholder={'ФИО'} value={name} onChange={(e)=>{
                    setName(e.target.value)
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
                <input type="text" value={email} placeholder={'Электронная почта'} onChange={(e)=>{
                    setEmail(e.target.value)
                }} className={styles.techSupportInput}/>
                {/*<textarea*/}
                {/*    placeholder={`Описание курса - возраст учащегося, желаемое время и так далее. Чем подробнее описание, тем лучше будет поиск.`}*/}
                {/*    rows={4}*/}
                {/*    onChange={(e)=>{*/}
                {/*        setComment(e.target.value)*/}
                {/*    }}*/}
                {/*    className={styles.techSupportInput}*/}
                {/*    style={{resize:"none"}}*/}
                {/*>*/}
                {/*</textarea>*/}
                <label style={{fontFamily: 'Rubik Medium', color: 'white', marginTop: '5px', cursor: 'pointer'}}>
                    <input
                        type="checkbox"
                        onClick={() => {
                            setOfertaCheck(!ofertaCheck)
                        }}
                        checked={ofertaCheck ? true : false}
                    /> Я принимаю условия <a href="/offer/student" style={{color: 'white', textDecoration: 'underline'}}>публичной оферты.</a>
                </label>
                <button className={styles.button}
                        onClick={() => {
                            if(name === ''){
                                setMessageForUser("Заполните все поля!");
                                setSubMessageForUser("Введите имя!");
                                ym('reachGoal','send_application_button_pressed_unsuccessfully')
                            }
                            else if(phone === ''){
                                setMessageForUser("Заполните все поля!");
                                setSubMessageForUser("Введите телефон!");
                                ym('reachGoal','send_application_button_pressed_unsuccessfully')
                            }
                            else if(email === ''){
                                setMessageForUser("Заполните все поля!");
                                setSubMessageForUser("Введите почту!");
                                ym('reachGoal','send_application_button_pressed_unsuccessfully')
                            }
                            else if(ofertaCheck === false){
                                setMessageForUser("Заявка не была отправлена!");
                                setSubMessageForUser("Прочтите публичную оферту и дайте свое согласие!");
                                ym('reachGoal','send_application_button_pressed_unsuccessfully')
                            }
                            else {
                                setData({
                                    city_id: cityId,
                                    direction_id: directionId,
                                    name: name,
                                    phone: phone,
                                    email: email,
                                    age: age,
                                    isOnline: isOnline,
                                    course_id: 0,
                                    role_id: props.searchCenter ? 4 : 6
                                })
                                setSuccessfulApplication(true);
                                setSubmitButtonPressed(true);
                                setStep(3)
                                setLoading(true)
                                ym('reachGoal','pick-course-or-tutor-button-pressed')
                                getCards()
                            }

                        }}
                >{submitButtonPressed ? ('Подобрать курсы!') : ('Подобрать курсы')}</button>
                <span className={styles.message}>
                    {messageForUser}
                    <br/>
                    {subMessageForUser}
                </span>
            </>
        )
    }

    function lastStep(){
        return(
            <div className={styles.whiteBody}>
                <Header white={true} setStep={setStep} reload={true} close={props.close}/>

                <div className={styles.header}>
                    <div className={styles.goBack} onClick={()=>{
                        if(step === 1){
                            props.close(false)
                        }
                        if(step === 2){
                            setStep(1)
                        }
                        if(step === 3){
                            setStep(1)
                        }
                    }}>
                        <Image src={'/left-arrow-black.png'} className={styles.goBackImg}/>
                    </div>
                    <h1 className={styles.main_title} style={{color: 'black', marginLeft: 30}}>Мы подобрали вам {props.searchCenter ? 'следующие курсы' : 'следующих репетиторов'}!</h1>
                </div>
                {
                    loading ? null : (
                        courseCards.length===0 && <CourseSearchResultIsNotDefind setStep={setStep}/>
                    )
                }
                <div className={styles.cards_block}>
                    {
                        loading ? (
                            <div className={styles.loading}>
                                <span>Поиск курсов...</span>
                            </div>
                        ) : (
                            courseCards.length !== 0 ? (
                                courseCards.splice(0, courseCards.length).map(item => {
                                    if(props.searchCenter){
                                        if(item.title!='test'){
                                            return(
                                                <CourseCard coverImage={imagesBase[Math.floor(Math.random() * imagesBase.length)].src} showApplicationModal={true} sendApplicationCallback={sendApplication} setLoadingModal={setLoadingModal} direction={true} course={item}/>
                                            )
                                        }
                                    }else{
                                        return(
                                            <TutorCourseCard coverImage={imagesBase[Math.floor(Math.random() * imagesBase.length)].src} showApplicationModal={true} sendApplicationCallback={sendApplication} setLoadingModal={setLoadingModal} direction={true} course={item}/>
                                        )
                                    }
                                })
                            ) : null
                        )
                    }
                </div>
                {
                    length<courseCards.length && (
                        <div style={{width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: '30px'}}>
                            <span className={styles.seeMore} onClick={()=>{
                                setLength(length+4)
                            }}>Показать еще</span>
                        </div>
                    )
                }
            </div>
        )
    }

    return(
        step === 1 || step === 2 ? Main() : lastStep()
    )
}
