import Head from 'next/head'
import styles from '../../../styles/components/content/course.module.css'
import newStyles from './style.module.css'
import Header from '../../../src/components/Header/Header'
import Footer from "../../../src/components/Footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LurkingFilterBlock from "../../../src/components/LurkingFilterBlock";
import Link from "next/link";
import { SignupToCourseForm } from "../../../src/components/Forms/SignupToCourseForm/SignupToCourseForm";
import ContactButton from "../../../src/components/ContactButton/ContactButton";
import ModalWindow from "../../../src/components/Modal/ModalWindow";
import globals from "../../../src/globals";
import {useRouter} from "next/router";
import classnames from 'classnames'
import {Image} from "react-bootstrap";
import {Map, Placemark, YMaps} from "react-yandex-maps";
import ContactBlock from "../../../src/components/ContactBlock";
import TutorCourseCardOnPage from "../../../src/components/TutorCourseCardOnPage";
import LoadingBlock from "../../../src/components/LoadingBlock";

const axios = require('axios').default;

function coursePage(props) {
    const router = useRouter();
    const [tutorSerfs, setTutorSerfs] = useState([]);
    const [filters, setFilters] = useState([[], [], []]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loadingModal, setLoadingModal] = useState(false)
    const [courseCards, setCourseCards] = useState([])
    const [course, setCourse] = useState(null);
    const [coursesLoading, setCoursesLoading] = useState(false);
    const [showUps, setShowUps] = useState(false);
    const [directionName, setDirectionName] = useState([]);
    const [directionLogo, setDirectionLogo] = useState([]);
    const [fullname, setFullname] = useState('')
    const [imgSrc, setImgSrc] = useState('https://realibi.kz/file/23027.png')
    const [description, setDescription] = useState('')
    const [tutorCards, setTutorCards] = useState([]);
    const [canWorkOnline, setCanWorkOnline] = useState(true)
    const [canWorkOffline, setCanWorkOffline] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [canWorkOnDeparture, setCanWorkOnDeparture] = useState(false)
    const [address, setAddress] = useState('')
    const [cityId, SetCityId] = useState(2)
    const [cityName, setCityName] = useState('')
    const [teachingLanguage, setTeachingLanguage] = useState('')
    const [courseDetails, setCourseDetails] = useState({});
    const [courseTitle, setCourseTitle] = useState('')
    const [courseCategoryId, setCourseCategoryId] = useState(3)
    const [minAge, setMinAge] = useState(10)
    const [maxAge, setMaxAge] = useState(45)
    const [startRequirements, setStartRequirements] = useState('')
    const [expectingResults, setExpectingResults] = useState('')
    const [durationValue, setDurationValue] = useState(1)
    const [price, setPrice] = useState(99000)
    const [unitOfTime, setUnitOfTime] = useState('Урок')
    const [schedule, setSchedule] = useState('Гибкий график')
    const [durationWord, setDurationWord] = useState('Месяцев')
    const [currency, etCurrency] = useState('KZT')
    const [subcourses, setSubcourses] = useState(props.subcourses);
    const [sertificates, setSertificates] = useState([]);
    const [cardsToShow, setCardsToShow] = useState(4);
    const [subcourseCardsToShow, setSubcourseCardsToShow] = useState(4)
    const [showDesc, setShowDesc] = useState(true)

    const addCards = () => {
        setCardsToShow(cardsToShow+4)
    };

    function prettify(num) {
        let n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    }

    function searchCityValue(){
        for(let i = 0; i < filters[0].length; i++){
            if(filters[0][i].id === cityId){
                return(filters[0][i].name)
            }
        }
    }
    function searchDurationValue(){
        for(let i = 0; i < filters[1].length; i++){
            if(filters[1][i].id === courseCategoryId){
                return(filters[1][i].name)
            }
        }
    }

    const sendApplication = (courseId, userInfo) => {

        let data = {
            city_id: props.course.city_id,
            direction_id: props.courseDetails.direction_id,
            name: userInfo.fullName,
            phone: userInfo.phone,
            email: userInfo.email,
            promocode: userInfo.promocode,
            age: 0,
            isOnline: props.course.format !== 'Offline',
            course_id: props.courseDetails.course_id,
            role_id: 4
        };

        axios({
            method: 'post',
            url: `${globals.productionServerDomain}/createCourseSearchTicket`,
            data: data,
            headers: {
                'Authorization': `Bearer ${globals.localStorageKeys.authToken}`
            }
        }).then(function(res){

        }).catch(() => {
            alert('Что-то пошло нетак!');
        });
    }

    const googleAdds = () => {
        return(
            "<!-- Global site tag (gtag.js) - Google Analytics -->\n" +
            "<script async src=\"https://www.googletagmanager.com/gtag/js?id=UA-210482103-1\"></script>\n" +
            "<script>\n" +
            "  window.dataLayer = window.dataLayer || [];\n" +
            "  function gtag(){dataLayer.push(arguments);}\n" +
            "  gtag('js', new Date());\n" +
            "\n" +
            "  gtag('config', 'UA-210482103-1');\n" +
            "</script>"
        )
    }


    const getCurrentDateTime = () => {
        let currentDate = new Date();

        let dd = currentDate.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = currentDate.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = currentDate.getFullYear();

        let hours = currentDate.getHours();
        let min = currentDate.getMinutes();
        let sec = currentDate.getSeconds();

        return yy + "-" + mm + "-" + dd + " " + hours + ":" + min + ":" + sec;
    }

    const loadData = async () => {
        console.log("Context query:");
        console.log(router.query.id);

        if (router.query.id !== undefined) {

            let courseDetailsResult = await axios.post(`${globals.productionServerDomain}/tutorCourseCards/` + router.query.id);
            let courseDetails = courseDetailsResult['data'][0];
            console.log('courseDetails')
            console.log(courseDetails);

            let courseResult = await axios.get(`${globals.productionServerDomain}/tutorCourses/` + props.courseDetails.id);

            let courseInfo = courseResult['data'][0];

            //let similarCoursesResult = await axios.get(`${globals.productionServerDomain}/courseCards/` + courseDetails.category_id);
            let subCoursesResult = await axios.post(`${globals.productionServerDomain}/tutorSubcourses/` + courseInfo.tutor_id);
            let sertificatesResult = await axios.post(`${globals.productionServerDomain}/tutorSertificates/` + courseInfo.tutor_id);

            setCourse(courseInfo);
            setCourseDetails(courseDetails);
            setSubcourses(subCoursesResult['data']);
            setSertificates(sertificatesResult['data']);
            //setSimilarCourses(similarCoursesResult['data']);
           

        }
    }

    useEffect(async () => {
        // loadData().then(() => {
        //     console.log(course)
        //     setLoadingModal(false)
        // })
        axios.get(`${globals.productionServerDomain}/getSertificates`).then(res => {
          setTutorSerfs(res.data);
        });
        axios({
            method: 'get',
            url: `${globals.productionServerDomain}/filters`,
        }).then(function(res){
            setFilters(res.data);
        }).catch(() => {
            alert('Ошибка при загрузке фильтров!');
        });
        axios.post(`${globals.productionServerDomain}/courseCategory`, {id: props.courseDetails.direction_id}).then(res => {
          setDirectionName(res.data.name);
          setDirectionLogo(res.data.img_src);
        });
        console.log('PROPSESIS', props)
        // axios.post(`${globals.productionServerDomain}/courseCards/` + 10).then(res => setCourseCards(res.data))
        loadData();
        searchCityValue()
        const data = {
            direction: props.courseDetails.direction_id
          };
          let postResult = await axios.post(`${globals.productionServerDomain}/tutorCourseCardsFilterByCategory/`, data);
          console.log("postResult равно", postResult.data);
          setCourseCards(postResult.data);
          setCoursesLoading(false);
    }, [])

    return (
        <div style={{ background: '#F3F3F3' }}>
            <ModalWindow show={show} handleClose={handleClose} heading={'Оставить репетитору заявку'} body={<SignupToCourseForm sendApplicationCallback={sendApplication} course={courseDetails} handleClose={handleClose} />} />
            <Head>
                <title>Oilan - {props.course.title}</title>
                <link rel="icon" href="/atom-icon.png" />
                <div dangerouslySetInnerHTML={{__html: googleAdds()}}/>
            </Head>

            <Header white={true}/>

            <div className={newStyles.container} >

                <div className={styles.headerBlock}>
                    <div className={newStyles.floatBlock}>
                        <div className={newStyles.image} style={props.courseDetails.img_src?{ backgroundImage: `url(${props.courseDetails.img_src})` }:{backgroundImage: `url('https://realibi.kz/file/510188.jpg')`}}>
                            <div className={newStyles.image_block} style={directionLogo?
                                {
                                    backgroundImage: `url(${directionLogo})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundColor: 'white',
                                    border: '1px solid white'
                                }:{
                                    backgroundImage: `url('https://realibi.kz/file/510188.jpg')`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundColor: 'white',
                                    border: '1px solid white'
                                }}>
                            </div>
                            <div className={newStyles.verificatedSheild} 
                                    style={props.courseDetails.verificated?
                                        {
                                            backgroundImage: 'url(https://realibi.kz/file/890265.png)',
                                        }:
                                        {}
                                    }
                            >
                            </div>
                        </div>
                        <div className={newStyles.aboutBlock}>
                            <span className={newStyles.leftSubTitle}>О репетиторе</span>
                            <div className={newStyles.infoList}>
                                <span className={newStyles.leftValue}>
                                    {props.courseDetails.tutor_description?props.courseDetails.tutor_description:'Репетитор '+props.courseDetails.tutor_fullname+' ещё не добавил информацию о себе'}
                                </span>
                            </div> 
                            <br/>
                            {props.sertificates.length!=0 ?
                                (
                                    <>
                                        <span className={newStyles.leftSubTitle}>Сертификаты и дипломы</span>
                                        <div className={newStyles.sertificatesList}>
                                                {tutorSerfs.map(item => (props.courseDetails.tutor_id == item.tutor_id)
                                                    ?(
                                                    <div className={newStyles.sertificate}>
                                                        <div style={{
                                                            backgroundImage: `url(${item.img_src})`,
                                                            backgroundPosition: 'center',
                                                            backgroundSize: 'cover',
                                                            width: '100%',
                                                            aspectRatio: '3/2'
                                                        }}>
                                                        </div>
                                                    </div>
                                                    )
                                                    : (
                                                    <></>
                                                    ))
                                                }
                                        </div> <br/>
                                    </>
                                ) :
                                    null
                            }
                        </div>
                        <div className={newStyles.underImgInfo}>
                            <div className={newStyles.infoItem}>
                                <span className={newStyles.leftSubTitle}>Формат занятий</span>
                                <span className={newStyles.leftValue}>{props.courseDetails.is_online?'Online':'Offline'}</span>
                            </div>
                            <div className={newStyles.infoItem}>
                                <span className={newStyles.leftSubTitle}>Выезд</span>
                                <span className={newStyles.leftValue}>{props.courseDetails.can_work_on_departure?'С выездом до дома':'Без выезда до дома'}</span>
                            </div>
                            <div className={newStyles.infoItem}>
                                <span className={newStyles.leftSubTitle}>Цена</span>
                                <span className={newStyles.leftValue}>{props.courseDetails.price} {props.courseDetails.currency?props.courseDetails.currency:'KZT'}/{props.courseDetails.unit_of_time}</span>
                            </div>
                        </div>
                    </div>
                    <div className={newStyles.primaryInfoRows}>
                        <div className={newStyles.categoryRow}>
                            {directionName}
                        </div>
                        <div className={newStyles.titleRow}>
                            {props.courseDetails.title}
                        </div>
                        <div className={newStyles.roleRow}>
                            Репетитор
                        </div>
                        <div className={newStyles.centerNameRow}>
                            {props.courseDetails.tutor_fullname}
                        </div>
                        <div className={newStyles.detailInfoRow}>
                            <div className={newStyles.twoColumnsAndTwoRows}>
                                <div className={newStyles.twoColumns}>
                                    <div className={newStyles.theFirstInfoColumn}>
                                        <div className={newStyles.infoItem}>
                                            <span className={newStyles.leftSubTitle}>Адрес</span>
                                            <span className={newStyles.leftValue}>г. {props.courseDetails.city_name}{props.courseDetails.address?', '+props.courseDetails.address:''}</span>
                                        </div>
                                        <div className={newStyles.infoItem}>
                                            <span className={newStyles.leftSubTitle}>Возрастная категория</span>
                                            <span className={newStyles.leftValue}>
                                                {(props.courseDetails.min_age && props.courseDetails.max_age)?
                                                    props.courseDetails.min_age+'-'+props.courseDetails.max_age:
                                                        (props.courseDetails.min_age && !props.courseDetails.max_age)?
                                                            'от'+props.courseDetails.min_age:
                                                                (!props.courseDetails.min_age && props.courseDetails.max_age)?
                                                                    'до'+props.courseDetails.max_age:
                                                                    'не указана'
                                                }
                                            </span>
                                        </div>
                                        <div className={newStyles.infoItem}>
                                            <span className={newStyles.leftSubTitle}>Расписание</span>
                                            <span className={newStyles.leftValue}>{props.courseDetails.schedule?props.courseDetails.schedule:'расписание отсутствует'}</span>
                                        </div>
                                    </div>
                                    <div className={newStyles.theSecondInfoColumn}>
                                        <div className={newStyles.infoItem}>
                                            <span className={newStyles.leftSubTitle}>Формат занятий</span>
                                            <span className={newStyles.leftValue}>{props.courseDetails.is_online?'Online':'Offline'}</span>
                                        </div>
                                        <div className={newStyles.infoItem}>
                                            <span className={newStyles.leftSubTitle}>Выезд</span>
                                            <span className={newStyles.leftValue}>{props.courseDetails.can_work_on_departure?'С выездом до дома':'Без выезда до дома'}</span>
                                        </div>
                                        <div className={newStyles.infoItem}>
                                            <span className={newStyles.leftSubTitle}>Цена</span>
                                            <span className={newStyles.leftValue}>{props.courseDetails.price} {props.courseDetails.currency?props.courseDetails.currency:'KZT'}/{props.courseDetails.unit_of_time}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className={newStyles.twoRows}>
                                    <div className={newStyles.firstButtonsRow}>
                                        <div style={{
                                            display: 'flex',
                                            width: '100%',
                                            marginTop: 10
                                        }}>
                                            <div className={styles.enableOnMobile}>
                                                <button className={newStyles.button} onClick={async () => {
                                                    handleShow();
                                                }}>Оставить заявку</button>
                                            </div>
                                            <div className={styles.disableOnMobile}>
                                                <button className={newStyles.button} onClick={async () => {
                                                    handleShow();
                                                }}>Оставить заявку</button>
                                            </div>
                                            {/*<a
                                                onClick={() => {
                                                    ym(78186067,'reachGoal','whatsapp_click_center');
                                                    axios.post(globals.productionServerDomain + '/logUserClick',{
                                                        course_id: courseDetails.course_id,
                                                        card_id: courseDetails.id,
                                                        event_name: 'whatsapp'
                                                    })
                                                }}
                                                href={`https://api.whatsapp.com/send?phone=${props.courseDetails.phone_number}&text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D0%BF%D0%B8%D1%88%D1%83%20%D0%92%D0%B0%D0%BC%20%D1%81%20%D0%BF%D0%BB%D0%B0%D1%82%D1%84%D0%BE%D1%80%D0%BC%D1%8B%20Oilan, `}>
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
                                            </a>*/}
                                        </div>
                                    </div>
                                    {/*<div className={newStyles.secondButtonsRow}>
                                        <div style={{
                                            display: 'flex',
                                            width: '100%',
                                            marginTop: 10
                                        }}>
                                            <div className={styles.enableOnMobile}>
                                                <button className={newStyles.button} onClick={async () => {
                                                    handleShow();
                                                }}>Перейти к репетитору</button>
                                            </div>
                                            <div className={styles.disableOnMobile}>
                                                <button className={newStyles.button} onClick={async () => {
                                                    handleShow();
                                                }}>Перейти к репетитору</button>
                                            </div>
                                        </div>
                                    </div>*/}
                                </div>
                            </div>
                            <div className={newStyles.theThirdInfoColumn}>
                                <div style={{width: '100%'}} className={classnames(styles.opacityFull)}>
                                    <span className={newStyles.leftSubTitle}>О репетиторе</span>
                                    <div className={newStyles.infoList}>
                                        <span className={newStyles.leftValue}>
                                            {props.courseDetails.tutor_description}
                                        </span>
                                    </div> <br/>
                                    {props.sertificates.length!=0 ?
                                        (
                                            <>
                                                <span className={newStyles.leftSubTitle}>Сертификаты и дипломы</span>
                                                <div className={newStyles.sertificatesList}>
                                                    
                                                        {tutorSerfs.map(item => (props.courseDetails.tutor_id == item.tutor_id)
                                                          ?(
                                                            <div className={newStyles.sertificate}>
                                                                <div style={{
                                                                    backgroundImage: `url(${item.img_src})`,
                                                                    backgroundPosition: 'center',
                                                                    backgroundSize: 'cover',
                                                                    width: '100%',
                                                                    aspectRatio: '3/2'
                                                                }}>
                                                                </div>

                                                            </div>
                                                          )
                                                          : (
                                                            <></>
                                                          ))
                                                        }
                                                    
                                                </div> <br/>
                                            </>
                                        ) :
                                            null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className={newStyles.twoColumnsAndTwoRowsMobile}>
                <div className={newStyles.twoColumnsMobile}>
                    <div className={newStyles.theFirstInfoColumnMobile}>
                        <div className={newStyles.infoItem}>
                            <span className={newStyles.leftSubTitle}>Адрес</span>
                            <span className={newStyles.leftValue}>г. {props.courseDetails.city_name}{props.courseDetails.address?', '+props.courseDetails.address:''}</span>
                        </div>
                        <div className={newStyles.infoItem}>
                            <span className={newStyles.leftSubTitle}>Возрастная категория</span>
                            <span className={newStyles.leftValue}>
                                {(props.courseDetails.min_age && props.courseDetails.max_age)?
                                    props.courseDetails.min_age+'-'+props.courseDetails.max_age:
                                        (props.courseDetails.min_age && !props.courseDetails.max_age)?
                                            'от'+props.courseDetails.min_age:
                                                (!props.courseDetails.min_age && props.courseDetails.max_age)?
                                                    'до'+props.courseDetails.max_age:
                                                    'не указана'
                                }
                            </span>
                        </div>
                        <div className={newStyles.infoItem}>
                            <span className={newStyles.leftSubTitle}>Расписание</span>
                            <span className={newStyles.leftValue}>{props.courseDetails.schedule?props.courseDetails.schedule:'расписание отсутствует'}</span>
                        </div>
                    </div>
                    <div className={newStyles.theSecondInfoColumnMobile}>
                        <div className={newStyles.infoItem}>
                            <span className={newStyles.leftSubTitle}>Формат занятий</span>
                            <span className={newStyles.leftValue}>{props.courseDetails.is_online?'Online':'Offline'}</span>
                        </div>
                        <div className={newStyles.infoItem}>
                            <span className={newStyles.leftSubTitle}>Выезд</span>
                            <span className={newStyles.leftValue}>{props.courseDetails.can_work_on_departure?'С выездом до дома':'Без выезда до дома'}</span>
                        </div>
                        <div className={newStyles.infoItem}>
                            <span className={newStyles.leftSubTitle}>Цена</span>
                            <span className={newStyles.leftValue}>{props.courseDetails.price} {props.courseDetails.currency?props.courseDetails.currency:'KZT'}/{props.courseDetails.unit_of_time}</span>
                        </div>
                    </div>
                </div>
                <div className={newStyles.twoRowsMobile}>
                    <div className={newStyles.firstButtonsRow}>
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            marginTop: 10
                        }}>
                            <div className={styles.enableOnMobile}>
                                <button className={newStyles.button} onClick={async () => {
                                    handleShow();
                                }}>Оставить заявку</button>
                            </div>
                            <div className={styles.disableOnMobile}>
                                <button className={newStyles.button} onClick={async () => {
                                    handleShow();
                                }}>Оставить заявку</button>
                            </div>
                            {/*<a
                                onClick={() => {
                                    // ym(78186067,'reachGoal','whatsapp_click_center');
                                    axios.post(globals.productionServerDomain + '/logUserClick',{
                                        course_id: courseDetails.course_id,
                                        card_id: courseDetails.id,
                                        event_name: 'whatsapp'
                                    })
                                }}
                                href={`https://api.whatsapp.com/send?phone=${props.course.phones}&text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D0%BF%D0%B8%D1%88%D1%83%20%D0%92%D0%B0%D0%BC%20%D1%81%20%D0%BF%D0%BB%D0%B0%D1%82%D1%84%D0%BE%D1%80%D0%BC%D1%8B%20Oilan, `}>
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
                            </a>*/}
                        </div>
                    </div>
                    {/*<div className={newStyles.secondButtonsRow}>
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            marginTop: 10
                        }}>
                            <div className={styles.enableOnMobile}>
                                <button className={newStyles.button} onClick={async () => {
                                    handleShow();
                                }}>Перейти к центру</button>
                            </div>
                            <div className={styles.disableOnMobile}>
                                <button className={newStyles.button} onClick={async () => {
                                    handleShow();
                                }}>Перейти к центру</button>
                            </div>
                        </div>
                    </div>*/}
                </div>
            </div>
            <div className={newStyles.aboutBlockMobile}>
                <div className={newStyles.aboutButton2}
                    onClick={()=>setShowDesc(!showDesc)}
                ><span>О репетиторе</span><span>{showDesc?<span>&#708;</span>:<span>&#709;</span>}</span></div>
                <span style={showDesc?{display:'block'}:{display:'none'}} className={newStyles.leftSubTitle}>О репетиторе</span>
                <div style={showDesc?{display:'block'}:{display:'none'}} className={newStyles.infoList}>
                    <span className={newStyles.leftValue}>
                        {props.courseDetails.tutor_description?props.courseDetails.tutor_description:'Репетитор '+props.courseDetails.tutor_fullname+' ещё не добавил информацию о себе'}
                    </span>
                </div> 
                <br/>
                {props.sertificates.length!=0 ?
                    (
                        <>
                            <span className={newStyles.leftSubTitle}>Сертификаты и дипломы</span>
                            <div className={newStyles.sertificatesList}>
                                                    
                                    {tutorSerfs.map(item => (props.courseDetails.tutor_id == item.tutor_id)
                                        ?(
                                        <div className={newStyles.sertificate}>
                                            <div style={{
                                                backgroundImage: `url(${item.img_src})`,
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                                width: '100%',
                                                aspectRatio: '3/2'
                                            }}>
                                            </div>
                                        </div>
                                        )
                                        : (
                                        <></>
                                        ))
                                    }             
                            </div> <br/>
                        </>
                    ) :
                        null
                }
            </div>
            {/*<div className={styles.titleBlock} style={{margin: '20px 0'}}>
                <Image src={'/Location.png'} className={styles.titleImg}/>
                <span className={styles.titleTitle}>Местоположение</span>
            </div>
            <div className={newStyles.container} style={{height: '300px'}}>
                <YMaps className={styles.ymaps}>
                    <Map width={'100%'} height={'100%'} defaultState={{ center: [43.226483, 76.830553], zoom: 16 }} >
                        <Placemark geometry={[43.226483, 76.830553]} />
                    </Map>
                </YMaps>
            </div>
            <div className={styles.titleBlock} style={{margin: '20px 0'}}>
                <Image src={'/Fist-Bump-Gesture.png'} className={styles.titleImg}/>
                <span className={styles.titleTitle}>Так же {courseDetails.tutor_fullname} предлагает:</span>
            </div>
            <div>
                <div className={styles.courses_block}>
                    {subcourses.length != 0 ? (subcourses.slice(0, 3).map(course => (
                        <div className={styles.card_item}>
                            <TutorCourseCard setLoadingModal={setLoadingModal} course={course} showApplicationModal={true}/>
                        </div>
                    ))) : <LoadingBlock/>}
                </div>
            </div>*/}
            <div className={styles.backToCoursesPageButtonBody}>
                <Link href={`/tutorPage/${encodeURIComponent(props.course.id)}`}
                target="_blank">
                    <a className={styles.backToCoursesPageButton}>Все курсы</a>
                </Link>
                {/* <Link
                    href={`/tutorPage/${encodeURIComponent(props.course.url)}?id=${encodeURIComponent(props.courseDetails.id)}`}
                    target="_blank" className={styles.noHover}
                >
                    <button className={newStyles.button} onClick={async () => {
                    // handleShow();
                    }}>Перейти к центру</button>
                </Link> */}
            </div>

            <div className={styles.titleBlock} style={{margin: '20px 0'}}>
                <span className={newStyles.locationTitle}>Похожие варианты</span>
            </div>
            <>
                {
                    courseCards.length > 0 && (
                        <div className={newStyles.courses_block}>
                            {
                                courseCards.slice(0, cardsToShow).map(course => {
                                    if(course.title !== 'test' && course.tutor_id != 584){
                                        return (
                                            <div style={{marginLeft: '5%', marginRight: '5%'}}>
                                                <TutorCourseCardOnPage setLoadingModal={setLoadingModal} course={course} courseDetails={courseDetails} showApplicationModal={true}/>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    )
                }
                </>
            


            <div style={{width: '100%', display: 'flex', justifyContent: 'center', margin: '10px 0'}}>
                <a className={styles.link} onClick={()=> {
                    addCards()
                }}>Смотреть еще</a>
            </div>
            <ContactBlock/>

            <Footer/>
        </div>
    )
}

coursePage.getInitialProps = async (ctx) => {
    console.log("ctx")
    console.log(ctx)

    if(ctx.query.id !== undefined) {
        let courseDetailsResult = await axios.post(`${globals.productionServerDomain}/tutorCourseCards/` + ctx.query.id);
        let courseDetails = courseDetailsResult['data'][0];
        console.log('course details result', courseDetails)

        let courseResult = await axios.get(`${globals.productionServerDomain}/tutorCourses/` + courseDetails.id);
        let courseInfo = courseResult['data'][0];
        console.log(courseInfo)
        //let similarCoursesResult = await axios.get(`${globals.productionServerDomain}/courseCards/` + courseInfo.course_category_id);
        let subCoursesResult = await axios.post(`${globals.productionServerDomain}/tutorSubcourses/` + courseInfo.tutor_id);
        console.log('subcourses' , subCoursesResult.data)
        let sertificatesResult = await axios.post(`${globals.productionServerDomain}/tutorSertificates/` + courseInfo.tutor_id);
        console.log('sertificates' , sertificatesResult.data)

        // setCourse(courseInfo);
        // setCourseDetails(courseDetails);
        // setSubcourses(subCoursesResult['data']);
        // setSimilarCourses(similarCoursesResult['data']);


        return {
            course: courseInfo,
            courseDetails: courseDetails,
            subcourses: subCoursesResult['data'],
            sertificates: sertificatesResult['data'],
            //similarCourses: similarCoursesResult['data'],
        }
    }else{
        return {};
    }
}

export default coursePage;
