import React, {useEffect, useState} from "react";
import styles from '../../../../styles/components/form.module.css'
const axios = require('axios').default;
const bcrypt = require('bcryptjs');
import { init } from 'emailjs-com';
import * as emailjs from "emailjs-com";
import { useRouter } from 'next/router'
import globals from "../../../globals";
import moment from 'moment'
import classnames from 'classnames'
moment.locale('ru');

let verificationCode = (Math.floor(Math.random() * 999999) + 100000).toString();

export function SignupToCourseForm(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [subMessage, setSubMessage] = useState("");
    const [ofertaCheck, setOfertaCheck] = useState(false);
    const router = useRouter();
    const [showPromocodeInput, setShowPromocodeInput] = useState(props.course.promocode !== null);
    const [promocode, setPromocode] = useState("");
    const [showBlock, setShowBlock] = useState(false);
    const [submitBtnClicked, setSubmitBtnClicked] = useState(false);
    const [courseDescription, setCourseDecription] = useState(props.course.description!=null ? props.course.description.split('|') : [])
    const [lvl, setLvl] = useState(2)
    const [periodicity, setPeriodicity] = useState('')
    const [knowledgeLevel, setKnowledgeLevel] = useState('')
    const [lessonDuration, setLessonDuration] = useState('')
    const coursePrice = prettify(props.course.price)

    function prettify(num) {
        let n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    }

    const validateInputs = () => {
        return name !== '' && email !== '' && phone !== '' && ofertaCheck;
    }

    console.log(props.tutor);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if(validateInputs()){
            props.sendApplicationCallback(props.course.course_id || props.course.tutor_id, {fullName: name, phone: phone, email: email, promocode: promocode});
            setSubmitBtnClicked(true);
            setLvl(3);
        }else{
            setSubmitBtnClicked(true);
            setMessage("Заполните все поля!");
        }
    }

    return (
        <div className={styles.form}>
            <div>
                {props.tutor!=undefined ? (
                    <>
                        <span className={styles.courseTitle} >{props.tutor.tutorsName}</span>
                        <span className={styles.courseTitle} style={{fontSize: 18, fontFamily: 'Rubik Medium', marginBottom: 10, display: 'block'}}>
                            {props.tutor.courseCategory}
                        </span>
                        <div style={{margin: '10xp 0', display: 'flex', alignItems: 'center'}}>
                        <span className={styles.courseDescription}>{props.tutor.tutorDescription === null ? 'Репетитор не указал информацию о себе. :(' : props.tutor.tutorDescription}</span>
                        </div>
                        <div style={{marginTop: '10px'}}>
                            <span className={styles.courseInfoTitle}>Город :</span>
                        </div>
                        <span className={styles.courseDescription}>{props.tutorCity} {props.tutor.can_work_online && 'Онлайн. '}{props.tutor.can_work_offline && 'Офлайн. '}</span>
                        <div style={{marginTop: '10px'}}>
                            <span className={styles.courseInfoTitle}>Язык преподавания:</span>
                        </div>
                        <span className={styles.courseDescription}>{props.tutor.teaching_language}</span>
                        {/*<div style={{marginTop: '10px'}}>*/}
                        {/*    <span className={styles.courseInfoTitle}>Расписание:</span>*/}
                        {/*</div>*/}
                        {/*<span className={styles.courseDescription}>{props.course.schedule}</span>*/}
                        <div style={{marginTop: '10px'}}>
                            <span className={styles.coursePrice}>{coursePrice} {props.course.currency}/{props.course.unit_of_time}</span>
                        </div>
                    </>
                ) : (
                    <>
                        <span className={styles.courseTitle} >{props.course.title}</span>
                        <div style={{margin: '10xp 0', display: 'flex', alignItems: 'center'}}>
                        <span className={styles.courseDescription}>
                            {
                                courseDescription.map(item => {
                                    return(
                                        <>
                                            {item}
                                            <br/>
                                        </>
                                    )
                                })
                            }
                        </span>
                        </div>
                        {/*<div style={{marginTop: '10px'}}>*/}
                        {/*    <span className={styles.courseInfoTitle}>Продолжительность курса:</span>*/}
                        {/*</div>*/}
                        {/*<span className={styles.courseDescription}>{props.course.duration}</span>*/}
                        {/*<div style={{marginTop: '10px'}}>*/}
                        {/*    <span className={styles.courseInfoTitle}>Расписание:</span>*/}
                        {/*</div>*/}
                        {/*<span className={styles.courseDescription}>{props.course.schedule}</span>*/}
                        <div style={{marginTop: '10px'}}>
                            <span className={styles.coursePrice}>{coursePrice} {props.course.currency}/{props.course.unit_of_time}</span>
                        </div>
                    </>
                )}
            </div>
            <br/>
            {/*<div className={classnames(styles.lvlsBlock)}>*/}
            {/*    <div className={classnames(styles.lvl, lvl === 1 ? (styles.active) : null)}>*/}
            {/*        <span>1</span>*/}
            {/*    </div>*/}
            {/*    <div className={styles.line}></div>*/}
            {/*    <div className={classnames(styles.lvl, lvl === 2 ? (styles.active) : null)}>*/}
            {/*        <span>2</span>*/}
            {/*    </div>*/}
            {/*    <div className={styles.line}></div>*/}
            {/*    <div className={classnames(styles.lvl, lvl === 3 ? (styles.active) : null)}>*/}
            {/*        <span>3</span>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {
                lvl === 1
                    ?
                    (<div style={{display: submitBtnClicked ? 'none' : 'block', marginTop: '20px'}}>
                        <div className={styles.selectBlock}>
                            <div style={{width: '40%'}}>
                                <span className={styles.selectTitle}>Ваш уровень знаний: </span>
                            </div>
                            <select name="" id="" className={styles.select}
                                onChange={e => setKnowledgeLevel(e.target.value)}
                            >
                                <option value="Выберите уровень">Выберите уровень</option>
                                <option value="Begginer">Begginer</option>
                                <option value="Elementary">Elementary</option>
                                <option value="Intermediate">Intermediate</option>
                            </select>
                        </div>
                        <div className={styles.selectBlock}>
                            <div style={{width: '40%'}}>
                            <span className={styles.selectTitle}>Периодичность занятий: </span>
                            </div>
                            <select name="" id="" className={styles.select}
                                onChange={e => setPeriodicity(e.target.value)}
                            >
                                <option value="Выберите уровень">Выберите периодичность</option>
                                <option value="1 раз в неделю">1 раз в неделю</option>
                                <option value="2 раза в неделю">2 раза в неделю</option>
                                <option value="3 раза в неделю или более">3 раза в неделю или более</option>
                            </select>
                        </div>
                        <div className={styles.selectBlock}>
                            <div style={{width: '40%'}}>
                                <span className={styles.selectTitle}>Длительность занятия: </span>
                            </div>
                            <select name="" id="" className={styles.select}
                                onChange={e => setLessonDuration(e.target.value)}
                            >
                                <option value="Выберите уровень">Выберите длительность</option>
                                <option value="1 раз в неделю">60 мин</option>
                                <option value="2 раза в неделю">90 мин</option>
                                <option value="3 раза в неделю или более">120 мин</option>
                            </select>
                        </div>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                            <button
                                className={styles.formSubmit}
                                onClick={()=>{
                                    setLvl(2)
                                }
                                }>Далее »</button>
                        </div>

                    </div>)
                    : null
            }
            {
                lvl === 2
                    ?
                    (<div style={{display: 'block'}}>
                        <form className={styles.formBody} onSubmit={handleSubmit}>
                            <div className={styles.formInputBody}>
                                <input
                                    type="text"
                                    value={name}
                                    placeholder={'ФИО'}
                                    onChange={e => setName(e.target.value)}
                                    className={styles.formInput}
                                    id={'name'}
                                />
                            </div>

                            <div className={styles.formInputBody}>
                                <input
                                    type="text"
                                    value={email}
                                    placeholder={'Эл. почта'}
                                    onChange={e => setEmail(e.target.value)}
                                    className={styles.formInput}
                                />
                            </div>
                            {/*<span className={styles.courseDescription}>Код будет отправлен на указанную Вами почту!</span>*/}
                            {/*<div className={styles.codeBlock}>*/}
                            {/*    <input*/}
                            {/*        type="text"*/}
                            {/*        value={code}*/}
                            {/*        placeholder={'Код подтверждения'}*/}
                            {/*        onChange={e => setCode(e.target.value)}*/}
                            {/*        className={styles.codeInput}*/}
                            {/*    />*/}
                            {/*    <button*/}
                            {/*        className={styles.codeButton}*/}
                            {/*        onClick={sendCodeButtonHandler}*/}
                            {/*    >Получить код</button>*/}
                            {/*</div>*/}
                            <div className={styles.formInputBody}>
                                <input
                                    type="text"
                                    className={styles.formInput}
                                    onKeyDown={e => {
                                        if(e.keyCode === 8){
                                            setPhone(phone.slice(0,-1));
                                        }
                                    }}
                                    onChange={e => globals.checkPhoneMask(e.target.value, setPhone)}
                                    placeholder='Номер телефона'
                                    value={phone}
                                />
                            </div>

                            {
                                showPromocodeInput ?
                                    (
                                        <div className={styles.formInputBody}>
                                            <input
                                                type="text"
                                                value={promocode}
                                                placeholder={'Промокод'}
                                                onChange={e => setPromocode(e.target.value)}
                                                className={styles.formInput}
                                            />
                                        </div>
                                    ) : null
                            }
                            <label style={{fontFamily: 'Rubik Medium', color: 'black', marginTop: '10px', cursor: 'pointer'}}>
                                <input
                                    type="checkbox"
                                    onClick={() => {
                                        setOfertaCheck(!ofertaCheck)
                                    }}
                                /> Я принимаю условия <a href="/offer" style={{color: 'black', textDecoration: 'underline'}}>публичной оферты.</a>
                            </label>
                            {/*<div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>*/}
                            {/*    <span style={{fontFamily: 'Rubik Medium', color: 'black', fontSize: '14px',textDecoration: 'underline', cursor: 'pointer',*/}
                            {/*        display: 'flex', alignItems: 'center'}}*/}
                            {/*          onClick={()=>{*/}
                            {/*              setShowPromocodeInput(!showPromocodeInput)*/}
                            {/*          }}*/}
                            {/*    >*/}
                            {/*        {showPromocodeInput ? 'Отмена' : 'У меня есть промокод!'}*/}
                            {/*    </span>*/}
                            {/*</div>*/}
                            <div style={{
                                marginTop: 10,
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                <input
                                    type="submit"
                                    value="Отправить заявку"
                                    className={styles.formSubmit}
                                />

                                <a
                                    onClick={() => {
                                        ym(78186067,'reachGoal','whatsapp_click_tutor');
                                        axios.post(globals.productionServerDomain + '/logUserClick',{
                                            course_id: props.course.tutor_id,
                                            card_id: props.course.id,
                                            event_name: 'whatsapp',
                                            is_tutor_card: true
                                        })
                                    }}
                                    href={`https://api.whatsapp.com/send?phone=${props.course.phone_number}&text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D0%BF%D0%B8%D1%88%D1%83%20%D0%92%D0%B0%D0%BC%20%D1%81%20%D0%BF%D0%BB%D0%B0%D1%82%D1%84%D0%BE%D1%80%D0%BC%D1%8B%20Oilan,`}>
                                    <div
                                        style={{
                                            height: '100%',
                                            width: 45,
                                            marginLeft: 10,
                                            borderRadius: 8,
                                            backgroundImage: `url('/whatsapp_logo.png')`,
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'contain',
                                            boxShadow: '0 0 1px grey',
                                            backgroundColor: '#23d366'
                                        }}
                                    >
                                    </div>
                                </a>
                            </div>
                        </form>

                        <br/>

                        <div style={{
                            display: submitBtnClicked ? 'block' : 'none',
                            textAlign: 'center',
                            fontFamily: 'Rubik Medium',
                            color: '#000'
                        }}>
                            <p>{message}</p>
                            <p>{subMessage}</p>
                        </div>
                    </div>)
                    : null
            }
            {
                lvl === 3
                    ?
                    (<div style={{display: 'block', marginTop: '20px'}}>
                        <div style={{
                            width: "100%",
                            display: 'flex',
                            justifyContent: 'center',
                            textAlign: 'center'
                        }}>
                            <br/> <br/> <br/> <br/>
                            <span className={styles.selectTitle}>
                                <b>
                                    Заявка была отправлена. <br/>
                                    Для отслеживания заявки войдите в личный кабинет под номером телефона, который указали в заявке
                                </b>
                            </span>
                            <br/> <br/> <br/> <br/>
                        </div>
                    </div>)
                    : null
            }
        </div>

    );
}
