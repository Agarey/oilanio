import styles from './style.module.css'
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {SignupToCourseForm} from "../Forms/SignupToCourseForm/SignupToCourseForm";
import ModalWindow from "../Modal/ModalWindow";
import classnames from 'classnames';
import globals from "../../globals";
import {Image} from "react-bootstrap";

const axios = require('axios').default;

export default function TutorCourseCard(props) {
    const [show, setShow] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);
    const [showContacts, setShowContacts] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [symbolsToShow, setSymbolsToShow] = useState(200)

    const [wordsToShowLength, setWordsToShowLength] = useState(10)
    const [heartValue, setHeartValue] = useState('\u2661')

    function prettify(num) {
        var n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    }


    const coursePrice = prettify(props.course.price)

    const getCurrentDateTime = () => {
        let currentDate = new Date();

        let dd = currentDate.getDate();
        if(dd < 10) dd = '0' + dd;

        let mm = currentDate.getMonth()+1;
        if(mm < 10) mm = '0' + mm;

        let yy = currentDate.getFullYear();

        let hours = currentDate.getHours();
        let min = currentDate.getMinutes();
        let sec = currentDate.getSeconds();

        return yy + "-" + mm + "-" + dd + " " + hours + ":" + min + ":" + sec;
    }

    const [applicationSent, setApplicationSent] = useState(false);

    useEffect(()=>{
        if(window.innerWidth <= 992) {
            setSymbolsToShow(200)
        } else {
            setSymbolsToShow(300)
        }
    }, [])

    return (
        <div className={styles.container} style={{width: props.application !== undefined ? '40%' : null}} >
            <ModalWindow show={show} handleClose={handleClose} heading={'Оставить заявку репетитору'} body={<SignupToCourseForm sendApplicationCallback={props.sendApplicationCallback} course={props.course} tutor={props.course} handleClose={handleClose}/>}/>

            <div style={{width: '100%'}}>
                <div  className={styles.titleImage__Body}>
                    <div className={styles.titleImageWrapper}>
                        <div className={styles.titleImageBody}
                             style={{
                                 backgroundImage: `url(${props.coverImage})`
                             }}
                        >
                        </div>
                        <div className={styles.titleLinkButtonBody}>
                            <span className={styles.infoTitle}>Информация о репетиторе:</span> <br/>
                            <span className={styles.infoSubtitle}>
                                {
                                    props.course.tutor_description === null
                                    ?
                                    'Репетитор не указал информацию о себе. :('
                                    :
                                        props.course.tutor_description.length > symbolsToShow ?
                                            <>
                                                {props.course.tutor_description.substr(0, symbolsToShow).concat('')}
                                                <b>...остальное в "Узнать больше"</b>
                                            </>
                                             :
                                            props.course.tutor_description
                                }
                            </span>
                        </div>
                    </div>

                    <div className={styles.titleImage__Body}>
                        <div className={styles.image_block} style={{
                            backgroundImage: `url(${props.course.img_src})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundColor: 'white',
                            border: '1px solid white'
                        }}>
                        </div>
                    </div>
                </div>

                <div>
                    <p className={styles.fullname}>

                        {props.course.fullname!=undefined && props.course.fullname.length < 20 ? (props.course.fullname) : (props.course.fullname.substr(0, 20).concat('...'))}

                    </p>
                </div>

                <div className={styles.info_block}>
                    <div>
                        <p className={styles.course_title}>

                            {props.course.category_name!=undefined && props.course.category_name.length < 20 ? (props.course.category_name) : (props.course.category_name.substr(0, 20).concat('...'))}

                        </p>

                        {/*<span className={styles.info_title}>:</span>*/}
                        {/*<span className={styles.info_value}> {props.course.phone_number}</span>*/}
                    </div>

                    <div style={{margin: 0}}>
                        <span className={styles.info_value}>{props.course.city_name}. {props.course.can_work_online && 'Онлайн. '}{props.course.can_work_offline && 'Офлайн. '}</span>
                    </div>

                    <div style={{margin: 0}}>
                        <span className={styles.info_value}>Язык преподавания: {props.course.teaching_language}</span>
                    </div>

                    <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: -15, marginTop: 10}}>
                        <div>
                            {props.course.currency === '$' ?
                                (
                                    <p className={styles.info_price}>Цена: {props.course.currency}{coursePrice}/{props.course.unit_of_time}</p>
                                )
                                : (
                                    <p className={styles.info_price}>Цена: {coursePrice} {props.course.currency}/{props.course.unit_of_time}</p>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.linkButtonBody}>
                <div style={{display: 'flex'}}>
                    {applicationSent ? (
                        <p className={styles.applicationSentText}>Заявка отправлена!</p>
                    ) : (
                        <button onClick={async () => {
                            setShow(!show);
                        }} className={styles.linkButton}>Узнать больше</button>
                    )}

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
            </div>
        </div>
    )
}
