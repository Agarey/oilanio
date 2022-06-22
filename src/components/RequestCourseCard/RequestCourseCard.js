import styles from '../../../styles/components/CourseCard.module.css'
import Link from "next/link";
import React, {useState} from "react";
import {SignupToCourseForm} from "../Forms/SignupToCourseForm/SignupToCourseForm";
import ModalWindow from "../Modal/ModalWindow";
import classnames from 'classnames';
import globals from "../../globals";

const axios = require('axios').default;

export default function RequestCourseCard(props) {
    const [show, setShow] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);
    const [showContacts, setShowContacts] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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

    return (
        <div className={styles.container}>
            <ModalWindow show={show} handleClose={handleClose} heading={'Запись на пробный урок'} body={<SignupToCourseForm course={props.course} handleClose={handleClose}/>}/>
            <div className={styles.titleImage__Body}>
                <div className={styles.titleImageWrapper}>
                    <div className={styles.titleImageBody}
                         style={{
                             backgroundImage: `url(${props.course.background_image_url})`
                         }}
                    >
                    </div>
                </div>
                <div className={styles.image_block} style={{
                    backgroundImage: `url(${props.course.img_src})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundColor: 'white',
                    border: '1px solid white'
                }}>
                </div>
            </div>

            <div className={styles.info_block}>
                <div style={{}}>
                    <div className={styles.titleBlock}>
                        <div>
                            <p className={styles.course_title}>{props.course.course_title}</p>
                        </div>
                        <div className={styles.socnetBlock} style={{marginBottom: 5}}>
                            {props.course.instagram ? (
                                <>
                                    <a href={`https://www.instagram.com/${props.course.instagram}/`}>
                                        <img src="/instagram.png" className={styles.icons} alt=""/>
                                    </a>
                                </>
                            ) : null || undefined }
                            {props.course.website !== null ? (
                                <>
                                    <a href={`${props.course.website}`}>
                                        <img src="/network.png" className={styles.icons} alt=""/>
                                    </a>
                                </>
                            ) : null }
                        </div>
                        {/*<div className={styles.rating_img}>*/}
                        {/*    /!*<img src="/star.png" alt="" height={'16px'}/>*!/*/}
                        {/*    <svg className={styles.svgStar} height="511pt" viewBox="0 -10 511.98685 511" width="511pt" xmlns="http://www.w3.org/2000/svg"><path d="m510.652344 185.902344c-3.351563-10.367188-12.546875-17.730469-23.425782-18.710938l-147.773437-13.417968-58.433594-136.769532c-4.308593-10.023437-14.121093-16.511718-25.023437-16.511718s-20.714844 6.488281-25.023438 16.535156l-58.433594 136.746094-147.796874 13.417968c-10.859376 1.003906-20.03125 8.34375-23.402344 18.710938-3.371094 10.367187-.257813 21.738281 7.957031 28.90625l111.699219 97.960937-32.9375 145.089844c-2.410156 10.667969 1.730468 21.695313 10.582031 28.09375 4.757813 3.4375 10.324219 5.1875 15.9375 5.1875 4.839844 0 9.640625-1.304687 13.949219-3.882813l127.46875-76.183593 127.421875 76.183593c9.324219 5.609376 21.078125 5.097657 29.910156-1.304687 8.855469-6.417969 12.992187-17.449219 10.582031-28.09375l-32.9375-145.089844 111.699219-97.941406c8.214844-7.1875 11.351563-18.539063 7.980469-28.925781zm0 0" fill="#ffc107"/></svg>*/}
                        {/*    <span className={styles.rating_value}>{props.course.rating}</span>*/}
                        {/*</div>*/}
                    </div>

                    <p className={styles.title}>{props.course.title}</p>

                    {/*<p className={styles.contactsButton}>Контакты и соц.сети</p>*/}

                    <div style={{}}>
                        <p className={styles.info_title}>Контакты: </p>
                        <div>
                                <span onClick={async () => {
                                    setShowPhoneNumber(!showPhoneNumber)
                                }} className={classnames(styles.info_small, styles.phone)}>
                                    { props.course.phones ?
                                        (showPhoneNumber ? `${props.course.phones} ←` : props.course.phones.substr(0, 8).concat("-...→")) :
                                        null }
                                </span>
                        </div>

                        <div className={classnames(showInfo ? styles.show : styles.hide)}>

                            <p className={styles.info_title}>Описание курса:</p>
                            <p className={styles.info_small}>{props.course.description}</p>

                            <p className={styles.info_title}>Ожидаемый результат:</p>
                            <p className={styles.info_small}>{props.course.expected_result}</p>

                            <p className={styles.info_title}>Необходимые начальные знания:</p>
                            <p className={styles.info_small}>{props.course.start_requirements}</p>

                            <p className={styles.info_title}>Продолжительность курса: </p>
                            <p className={styles.info_small}>{props.course.duration}</p>

                            <p className={styles.info_title}>Возрастная категория: </p>
                            <p className={styles.info_small}>{props.course.ages}</p>

                            <p className={styles.info_title}>Вид занятий: </p>
                            <p className={styles.info_small}>{props.course.type}</p>

                            <p className={styles.info_title}>Формат занятий: </p>
                            <p className={styles.info_small}>{props.course.format}</p>



                        </div>
                    </div>
                </div>
                <div className={styles.linkButtonBody}>
                    {/*<div style={{alignItems: 'center', width: '100%', textAlign: 'center', marginBottom: '15px'}}>*/}
                    {/*    <a className={styles.showHideBtn} onClick={() => {*/}
                    {/*        setShowInfo(!showInfo);*/}
                    {/*    }}>{showInfo ? 'Скрыть' : 'Показать больше'}</a>*/}

                    {/*    <img src="/arrow-bottom.png" alt="" onClick={() => {*/}
                    {/*        setShowInfo(!showInfo);*/}
                    {/*    }}*/}
                    {/*         className={ showInfo ? styles.hideArrow : styles.showArrow}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    <p className={styles.info_price}>Цена: {coursePrice} {props.course.currency}/{props.course.unit_of_time}</p>
                    <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                        <button onClick={async () => {
                            if(!showInfo){
                                setShowInfo(true);
                            }else{
                                setShowInfo(false);
                            }
                        }}
                                className={styles.info_button}>{showInfo ? 'Скрыть' : 'Показать больше'}</button>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                       <button className={styles.info_button} onClick={async () => {
                           console.log('card id: ' + props.course.id)
                           console.log('subcourse id: ' + props.course.subcourse_id)
                           if(props.type === 'editCard'){
                               await axios({
                                   method: 'post',
                                   url: `${globals.productionServerDomain}/approveEditCard`,
                                   data: {
                                       cardId: props.course.subcourse_id
                                   },
                                   headers: {
                                       'Authorization': `Bearer ${JSON.parse(localStorage.getItem(globals.localStorageKeys.authToken)).token}`
                                   }
                               }).then(() => location.reload()).catch(() => alert("что-то пошло нетак"));
                           }else{
                               await axios({
                                   method: 'post',
                                   url: `${globals.productionServerDomain}/approveCard`,
                                   data: {
                                       cardId: props.course.id
                                   },
                                   headers: {
                                       'Authorization': `Bearer ${JSON.parse(localStorage.getItem(globals.localStorageKeys.authToken)).token}`
                                   }
                               }).then(() => location.reload()).catch(() => alert("что-то пошло нетак"));
                           }
                       }}>Принять</button>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                       <button className={styles.info_button} onClick={async () => {
                           axios({
                               method: 'post',
                               url: `${globals.productionServerDomain}/declineCard`,
                               data: {
                                   cardId: props.course.subcourse_id
                               },
                               headers: {
                                   'Authorization': `Bearer ${JSON.parse(localStorage.getItem(globals.localStorageKeys.authToken)).token}`
                               }
                           }).then(() => location.reload())
                       }}>Отклонить</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
