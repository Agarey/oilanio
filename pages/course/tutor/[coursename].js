import Head from 'next/head'
import styles from '../../../styles/components/content/course.module.css'
import newStyles from './style.module.css'
import Header from '../../../src/components/Header/Header'
import Footer from "../../../src/components/Footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import ContactButton from "../../../src/components/ContactButton/ContactButton";
import ModalWindow from "../../../src/components/Modal/ModalWindow";
import globals from "../../../src/globals";
import {useRouter} from "next/router";
import classnames from 'classnames'
import {Image} from "react-bootstrap";
import {Map, Placemark, YMaps} from "react-yandex-maps";
import ContactBlock from "../../../src/components/ContactBlock";
import CourseCard from "../../../src/components/CourseCard/CourseCard";
import LoadingBlock from "../../../src/components/LoadingBlock";

const axios = require('axios').default;

function coursePage(props) {
    const router = useRouter();

    const [filters, setFilters] = useState([[], [], []]);
    const [loadingModal, setLoadingModal] = useState(false)
    const [courseCards, setCourseCards] = useState([])

    const [fullname, setFullname] = useState('Сергей Гуров')
    const [imgSrc, setImgSrc] = useState('https://realibi.kz/file/23027.png')
    const [description, setDescription] = useState('Школа английского языка H3 Unlimited с 2013 года предоставляет лучшие услуги и результаты в обучении английского языка. Более 1000 студентов обучались у нас и 98% наших студентов были довольны нашими результатами. Мы улучшаем разговорную речь, чтение, аудирование и письменные навыки.')
    const [canWorkOnline, setCanWorkOnline] = useState(true)
    const [canWorkOffline, setCanWorkOffline] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('+7 708 615 74 39')
    const [canWorkOnDeparture, setCanWorkOnDeparture] = useState(false)
    const [address, setAddress] = useState('Абая 49/9')
    const [cityId, SetCityId] = useState(2)
    const [cityName, setCityName] = useState('')
    const [teachingLanguage, setTeachingLanguage] = useState('Жоска турецкий')

    const [courseTitle, setCourseTitle] = useState('Турецкий для ботов')
    const [courseCategoryId, setCourseCategoryId] = useState(3)
    const [minAge, setMinAge] = useState(10)
    const [maxAge, setMaxAge] = useState(45)
    const [startRequirements, setStartRequirements] = useState('Желание учить язык')
    const [expectingResults, setExpectingResults] = useState('Выучите язык')
    const [durationValue, setDurationValue] = useState(1)
    const [price, setPrice] = useState(99000)
    const [unitOfTime, setUnitOfTime] = useState('Урок')
    const [schedule, setSchedule] = useState('Гибкий график')
    const [durationWord, setDurationWord] = useState('Месяцев')
    const [currency, etCurrency] = useState('KZT')

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

            let courseDetailsResult = await axios.post(`${globals.productionServerDomain}/courseCards/` + context.query.id);
            let courseDetails = courseDetailsResult['data'][0];
            console.log('courseDetails')
            console.log(courseDetails);

            let courseResult = await axios.get(`${globals.productionServerDomain}/courses/` + courseDetails.course_id);

            let courseInfo = courseResult['data'][0];

            //let similarCoursesResult = await axios.get(`${globals.productionServerDomain}/courseCards/` + courseDetails.category_id);
            let subCoursesResult = await axios.post(`${globals.productionServerDomain}/subcourses/` + courseInfo.id);
            let teachersResult = await axios.post(`${globals.productionServerDomain}/teachers/` + courseInfo.id);

            let feedbacksLink = `${globals.productionServerDomain}/feedbacks/${context.query.id}`;
            console.log(`feedbacks link: ` + feedbacksLink);
            let courseFeedbacksResult = await axios.get(`${globals.productionServerDomain}/feedbacks/${context.query.id}`);

            console.log("feedbacks:");
            console.log(courseFeedbacksResult.data);

            setCourse(courseInfo);
            setCourseDetails(courseDetails);
            setSubcourses(subCoursesResult['data']);
            //setSimilarCourses(similarCoursesResult['data']);
            setTeachers(teachersResult['data']);
            //setCourseFeedbacks(courseFeedbacksResult['data'])
        }
    }

    useEffect(async () => {
        // loadData().then(() => {
        //     console.log(course)
        //     setLoadingModal(false)
        // })

        axios({
            method: 'get',
            url: `${globals.productionServerDomain}/filters`,
        }).then(function(res){
            setFilters(res.data);
        }).catch(() => {
            alert('Ошибка при загрузке фильтров!');
        });

        axios.post(`${globals.productionServerDomain}/courseCards/` + 10).then(res => setCourseCards(res.data))

        searchCityValue()
    }, [])

    return (
        <div style={{ background: 'white', minHeight: '100vh' }}>
            {/*<ModalWindow show={show} handleClose={handleClose} heading={'Запись на пробный урок'} body={<SignupToCourseForm course={props.courseDetails} handleClose={handleClose} />} />*/}

            <Head>
                <title>Oilan - {fullname}</title>
                <link rel="icon" href="/atom-icon.png" />
                <div dangerouslySetInnerHTML={{__html: googleAdds()}}/>
            </Head>
            <Header white={true}/>
            <ContactButton />

            <div className={newStyles.container}>

                <div className={styles.headerBlock}>
                    <div className={newStyles.image} style={{backgroundImage: `url(${imgSrc})`}}></div>
                    <div className={newStyles.headerItemSecond}>
                        <div style={{width: '100%'}}>
                            <span className={newStyles.subTitle} style={{color: '#B6B6B6FF'}}>{searchDurationValue()}</span> <br/>
                            <span className={newStyles.fullname}>{fullname}</span> <br/> <br/>
                            <span className={newStyles.subTitle} style={{fontSize: 18}}>О преподавателе:</span>
                            <div className={newStyles.infoList}>
                                <span className={newStyles.value}>{description}</span>
                            </div>
                        </div>

                        <div>
                            <button className={styles.button} style={{fontSize: 16}}>Оставить заявку</button>
                        </div>
                    </div>
                    <div className={classnames(newStyles.headerItemThird)}>
                        <div className={newStyles.infoList}>
                            <div className={newStyles.infoItem}>
                                <span className={newStyles.leftSubTitle}>Преподаватель</span>
                                <span className={newStyles.leftValue}>{fullname}</span>
                            </div>
                            <div className={newStyles.infoItem}>
                                <span className={newStyles.leftSubTitle}>Адрес</span>
                                <span className={newStyles.leftValue}>{searchCityValue()}, {address}</span>
                            </div>
                            <div className={newStyles.infoItem}>
                                <span className={newStyles.leftSubTitle}>Цена</span>
                                <span className={newStyles.leftValue}>{prettify(price)}{currency}/{unitOfTime}</span>
                            </div>
                            <div className={newStyles.infoItem}>
                                <span className={newStyles.leftSubTitle}>Начальные знания</span>
                                <span className={newStyles.leftValue}>{startRequirements}</span>
                            </div>
                            <div className={newStyles.infoItem}>
                                <span className={newStyles.leftSubTitle}>Возрастная категория</span>
                                <span className={newStyles.leftValue}>{minAge}+</span>
                            </div>
                            <div className={newStyles.infoItem}>
                                <span className={newStyles.leftSubTitle}>Продолжительность курса</span>
                                <span className={newStyles.leftValue}>{durationValue} {durationWord}+</span>
                            </div>
                            <div className={newStyles.infoItem}>
                                <span className={newStyles.leftSubTitle}>Расписание</span>
                                <span className={newStyles.leftValue}>{schedule}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.titleBlock} style={{margin: '20px 0'}}>
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
                <span className={styles.titleTitle}>Так же {fullname} предлагает:</span>
            </div>
            <div>
                <div className={styles.courses_block}>
                    {courseCards.length != 0 ? (courseCards.slice(0, 3).map(course => (
                        <div className={styles.card_item}>
                            <CourseCard setLoadingModal={setLoadingModal} course={course} showApplicationModal={true}/>
                        </div>
                    ))) : <LoadingBlock/>}
                </div>
            </div>
            <div className={styles.backToCoursesPageButtonBody}>
                <Link href="/">
                    <a className={styles.backToCoursesPageButton}>Все курсы</a>
                </Link>
            </div>

            <ContactBlock/>

            <Footer/>
        </div>
    )
}

export default coursePage;
