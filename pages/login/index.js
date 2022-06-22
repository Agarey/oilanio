import Head from 'next/head'
import Header from '../../src/components/Header/Header'
import styles from "../../styles/components/content/SignIn.module.css";
import CourseCard from "../../src/components/CourseCard/CourseCard";
import HorizontalLine from "../../src/components/HorizontalLine/HorizaontalLine";
import Footer from "../../src/components/Footer/Footer";
import React, { useState, useEffect } from "react";
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css'
import SimpleSlider from "../../src/components/SimpleSlider/SimpleSlider";
import StockCard from "../../src/components/StockCard/StockCard";
import ContactButton from "../../src/components/ContactButton/ContactButton";
import classnames from 'classnames';
import Courses from "../courses";
import {useRouter} from "next/router";
const axios = require('axios').default;
const bcrypt = require('bcryptjs');
import globals from "../../src/globals";
import UserContext from "../../src/userContext";
import { useContext } from "react";
import { useCookies } from 'react-cookie';
import {SignupToCourseForm} from "../../src/components/Forms/SignupToCourseForm/SignupToCourseForm";
import ModalWindow from "../../src/components/Modal/ModalWindow";
import {BecomeAPartner} from "../../src/components/Forms/BecomeAPartnerForm/BecomeAPartner";


function SignIn(props){
    let contextData = useContext(UserContext);
    const router = useRouter();
    const [studentPhone, setStudentPhone] = useState('8(7');
    const [loginValue, setLoginValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(false);
    const [messageText, setMessageText] = useState('Введите данные для входа');

    const [interfaceForStudent, setInterfaceForStudent] = useState(false);
    const [oldLoginDataIsRemoved, setOldDataIsRemoved] = useState(false);
    const [ofertaCheck, setOfertaCheck] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const removeOldLoginData = () => {
        localStorage.removeItem(globals.localStorageKeys.currentStudent)
        localStorage.removeItem(globals.localStorageKeys.authToken);
        localStorage.removeItem(globals.localStorageKeys.centerId);
        localStorage.removeItem(globals.localStorageKeys.currentUserId);
        localStorage.removeItem(globals.localStorageKeys.roleId);
        setOldDataIsRemoved(true)
    }

    async function register(centerName, login, password, website, addresses, phone, cityId){
        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);

        let data = {
            title: centerName,
            login: login,
            password: password,
            website_url: website,
            addresses: addresses,
            phones: phone,
            city_id: cityId,
        }

        const result = await axios.post(globals.productionServerDomain + '/courses/register', data);

        if(result.status !== 200){
            await router.push("https://www.oilan.io/")
        }else{
            console.log("errorritto");
        }
    }

    const ym = () => {
        return (
            "<!-- Yandex.Metrika counter -->\n" +
            "<script type=\"text/javascript\" >\n" +
            "   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};\n" +
            "   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})\n" +
            "   (window, document, \"script\", \"https://mc.yandex.ru/metrika/tag.js\", \"ym\");\n" +
            "\n" +
            "   ym(78186067, \"init\", {\n" +
            "        clickmap:true,\n" +
            "        trackLinks:true,\n" +
            "        accurateTrackBounce:true,\n" +
            "        webvisor:true,\n" +
            "        ecommerce:\"dataLayer\"\n" +
            "   });\n" +
            "</script>\n" +
            "<noscript><div><img src=\"https://mc.yandex.ru/watch/78186067\" style=\"position:absolute; left:-9999px;\" alt=\"\" /></div></noscript>\n" +
            "<!-- /Yandex.Metrika counter -->"
        );
    }

    useEffect(()=>{
        setOldDataIsRemoved(false)
        removeOldLoginData();
    }, [])

    return(
        <div>
            <Head>
                <title>Oilan - Вход</title>
                <link rel="icon" href="/atom-icon.png" />
                <div dangerouslySetInnerHTML={{__html: ym()}}/>
            </Head>

            {oldLoginDataIsRemoved && <Header white={true}/>}
            <ModalWindow show={show} handleClose={handleClose} heading={``} body={<BecomeAPartner handleClose={handleClose}/>}/>
            {/*<ContactButton/>*/}
            <div className={styles.modal} style={{display: showModal ? 'block' : 'none'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <span style={{fontSize: '14px', fontWeight: 'bold'}}>Служба заботы о пользователях</span>
                    <span style={{fontSize: '14px', fontWeight: 'bold', cursor: 'pointer'}}
                          onClick={()=>{
                              setShowModal(!showModal)
                          }}
                    >x</span>
                </div>

                <span style={{fontSize: '12px'}}>8:00-20:00 рабочие дни</span> <br/>
                <span style={{fontSize: '12px'}}>9:00-17:00 праздничные и выходные дни</span> <br/> <br/>
                <span style={{fontSize: '14px', fontWeight: 'bold'}}>Телефоны:</span> <br/>
                <span style={{fontSize: '12px'}}>+7 (747) 095 3440 (WhatsApp, Звонок)</span> <br/>
            </div>
            <div className={styles.signInBody}>
                {/*<img src="/motivation.png" className={styles.bgPic} alt=""/>*/}
                {/*<img src="/soon.png" className={styles.bgPic2} alt=""/>*/}
                    <div className={classnames(styles.formBody)}>
                        <div className={styles.header}>
                            <div className={classnames(styles.headerItem, styles.headerItemLeft, !interfaceForStudent && styles.selected)} onClick={()=>{
                                setInterfaceForStudent(false)
                                setLoginValue('')
                            }}>
                                <span>Я центр/репетитор</span>
                            </div>
                            <div className={classnames(styles.headerItem, styles.headerItemRight, interfaceForStudent && styles.selected)} onClick={()=>{
                                setInterfaceForStudent(true)
                            }}>
                                <span>Я студент</span>
                            </div>
                        </div>
                        <div className={styles.form}>
                            <span className={styles.title}>Рады, что вы вернулись</span>
                            <p className={error ? styles.errorMessage : styles.message}>{messageText}</p>

                            {interfaceForStudent ? (
                                <>
                                    <div className={styles.inputBody}>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            onKeyDown={e => {
                                                if(e.keyCode === 8){
                                                    setStudentPhone(studentPhone.slice(0,-1));
                                                }
                                            }}
                                            onChange={e => globals.checkPhoneMask(e.target.value, setStudentPhone)}
                                            placeholder='Номер телефона'
                                            value={studentPhone}
                                        />
                                    </div>
                                    <label style={{fontFamily: 'Rubik Medium', color: 'black', marginTop: '10px', cursor: 'pointer', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        <input
                                            type="checkbox"
                                            onClick={() => {
                                                setOfertaCheck(!ofertaCheck)
                                            }}
                                        /> <span style={{marginLeft: 10}}>Я принимаю условия <a href="/offer/student" style={{color: 'black', textDecoration: 'underline'}}>публичной оферты.</a></span>
                                    </label>
                                </>
                            ) : (
                                <>
                                    <div className={styles.inputBody}>
                                        <input type="text" className={styles.input} value={loginValue} onChange={e => setLoginValue(e.target.value)} placeholder='Логин' id='loginLogin'/>
                                    </div>

                                    <div className={styles.inputBody} style={{position: 'relative'}}>
                                        <input type={showPassword ? 'text' : "password"} onChange={e => setPasswordValue(e.target.value)} className={styles.input} placeholder='Пароль' id='loginPassword'/>
                                        {passwordValue.length!=0 && <img src={!showPassword ? "/view_eye.png" : '/hidden.png'} alt=""
                                              className={styles.eye}
                                              onClick={() => {
                                                  setShowPassword(!showPassword)
                                              }}
                                        />}
                                    </div>
                                </>
                            )}

                            <div className={styles.inputBody} style={{marginTop: '15px'}}>
                                <button
                                    className={styles.submitBtn}
                                    onClick={ () => {
                                        setError(false);
                                        setMessageText('Загрузка...');
                                        if(interfaceForStudent){
                                            if(studentPhone.length!==16){
                                                setMessageText('Неккоректная длина номера!')
                                            } else if (!ofertaCheck) {
                                                setMessageText('Потдвердите соглашение с публичной офертой!')
                                            } else {
                                                axios.post(`${globals.productionServerDomain}/studentLogin/`, {phone: studentPhone}).then(function(res){
                                                    localStorage.setItem(globals.localStorageKeys.currentStudent, JSON.stringify(res.data));
                                                    router.push(`/cabinet/student`)
                                                    return
                                                }).catch(function(){
                                                    setMessageText('Номер телефона не найден!')
                                                })
                                            }
                                        }else{
                                            let data = {
                                                login: loginValue,
                                                password: passwordValue,
                                            }

                                            axios.post(`${globals.productionServerDomain}/login/`, data).then(function(res){
                                                if(res.status === 200){
                                                    let date = new Date();
                                                    let loginObject = {
                                                        expireTime: date + (60 * 1000 * 60),
                                                        token: res.data.token
                                                    }

                                                    localStorage.setItem(globals.localStorageKeys.authToken, JSON.stringify(loginObject));
                                                    localStorage.setItem(globals.localStorageKeys.centerId, res.data.centerId);
                                                    localStorage.setItem(globals.localStorageKeys.currentUserId, res.data.userId);
                                                    localStorage.setItem(globals.localStorageKeys.roleId, res.data.roleId);

                                                    console.log('center id set', res.data.centerId);

                                                    if(res.data.roleId === 1){
                                                        router.push(`${globals.productionSiteDomain}/admin`)
                                                    }
                                                    else if(res.data.roleId === 4){
                                                        router.push(`${globals.productionSiteDomain}/cabinet`)
                                                    }
                                                    else if(res.data.roleId === 6){
                                                        router.push(`${globals.productionSiteDomain}/cabinet/tutor`)
                                                    }
                                                }else{
                                                    setError(true);
                                                    setMessageText("Неправильные данные")
                                                }
                                            }).catch((res) => {
                                                setError(true);
                                                setMessageText("Неправильные данные! Попробуйте еще раз.")
                                            });
                                        }


                                    }}
                                    >
                                    Войти в личный кабинет
                                </button>
                            </div>

                            <br/>
                            {!interfaceForStudent && (
                                <div className={styles.inputBody}>
                                    <span
                                        style={{
                                            color: 'black',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            textDecoration: 'underline',
                                            fontFamily: 'Rubik Regular'
                                        }}
                                        onClick={()=>{
                                            setShow(!show)
                                        }}
                                    >Стать партнером</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            <Footer/>
        </div>
    )
}

export default SignIn;
