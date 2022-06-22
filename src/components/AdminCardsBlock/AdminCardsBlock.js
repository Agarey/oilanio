import Head from 'next/head'
import styles from "./AdminCardsBlock.module.css";
import CourseCard from "../CourseCard/CourseCard";

import React, { useState, useEffect } from "react";
import 'react-animated-slider/build/horizontal.css'
import ContactButton from "../ContactButton/ContactButton";
import classnames from 'classnames';
import RequestCourseCard from "../RequestCourseCard/RequestCourseCard";
import RequestTeacherCard from "../RequestTeacherCard/RequestTeacherCard";
const axios = require('axios').default;
import globals from "../../globals";
import CourseSearchApplicationInfo from "../CourseSearchApplicationInfo/CourseSearchApplicationInfo";
import TelegramBotUser from "../TelegramBotUser/TelegramBotUser";
import {useRouter} from "next/router";

function AdminCardsBlock(){
    const router = useRouter();
    let [cards, setCards] = useState([]);
    let [editCards, setEditCards] = useState([]);
    let [teachers, setTeachers] = useState([]);
    let [loading, setLoading] = useState(true);
    let [courses, setCourses] = useState([]);
    let [tutors, setTutors] = useState([]);
    let [selectedCourseTitle, setSelectedCourseTitle] = useState("GSCSTUDY");
    let [oKurse, setOKurse] = useState(0);
    let [otpravitZayavku, setOtpravitZayavku] = useState(0);
    let [pokazatBolshe, setPokazatBolshe] = useState(0);
    let [nomerTelefona, setNomerTelefona] = useState(0);
    let [website, setWebsite] = useState(0);
    let [instagram, setInstagram] = useState(0);
    let [notificationMessage, setNotificationMessage] = useState("");
    let [notificationCenterId, setNotificationCenterId] = useState(null)
    let [courseSearchApplications, setCourseSearchApplications] = useState([]);
    let [applicationResponses, setApplicationResponses] = useState([]);
    let [telegramBotUsersCenters, setTelegramBotUsersCenters] = useState([]);
    let [telegramBotUsersTutors, setTelegramBotUsersTutors] = useState([]);
    let [telegramFeedbacksCenters, setTelegramFeedbacksCenters] = useState([]);
    let [telegramFeedbacksTutors, setTelegramFeedbacksTutors] = useState([]);
    let [activeCardsTable, setActiveCardsTable] = useState(false);
    let [activeApplicationsCount, setActiveApplicationsCount] = useState(0);
    let [centerRequestsTable, setCenterRequestsTable] = useState(false);
    let [tutorRequestsTable, setTutorRequestsTable] = useState(false);
    let [requestStat, setRequestStat] = useState(false);
    let [centersBot, setCentersBot] = useState(false);
    let [tutorsBot, setTutorsBot] = useState(false);
    let [centersBotFeedback, setCentersBotFeedback] = useState(false);
    let [tutorsBotFeedback, setTutorsBotFeedback] = useState(false);
    let [clicker, setClicker] = useState(false);
    let [directionActiveCards, setDirectionActiveCards] = useState([]);
    let [tutorsActiveCards, setTutorsActiveCards] = useState([]);

    let [categories, setCategories] = useState([]);
    let [selectedCategoryId, setSelectedCategoryId] = useState(0);
    let [selectedSubcourseId, setSelectedSubcourseId] = useState(0);
    let [subcourses, setSubcourses] = useState([]);
    let [promotionText, setPromotionText] = useState('');
    let [promotionDateTill, setPromotionDateTill] = useState('');

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
            "</script>" +

            "<!-- Google Tag Manager -->\n" +
            "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\n" +
            "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\n" +
            "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n" +
            "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n" +
            "})(window,document,'script','dataLayer','GTM-MFV3BJ3');</script>\n" +
            "<!-- End Google Tag Manager -->\n" +
            "\n" + "\n" +
            "<!-- Google Tag Manager (noscript) -->\n" +
            "<noscript><iframe src=\"https://www.googletagmanager.com/ns.html?id=GTM-MFV3BJ3\"\n" +
            "height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\"></iframe></noscript>\n" +
            "<!-- End Google Tag Manager (noscript) -->"
        )
    }
    const loadFilters = async () => {
        setFiltersLoading(true)
        let result = await axios.get(`${globals.productionServerDomain}/filters`);
        setFilters(result.data)
        setFiltersLoading(false)
    }
    const [filtersLoading, setFiltersLoading] = useState(false);
    const [filters, setFilters] = useState([]);
    useEffect(async () => {
        loadFilters();
    }, [])
    const loadInfo = async () => {
        let token = '';
        if(localStorage.getItem(globals.localStorageKeys.authToken) !== null){
            token = JSON.parse(localStorage.getItem(globals.localStorageKeys.authToken)).token;
        }else{
            router.push('/login');
        }

        await axios({
            method: 'get',
            url: `${globals.productionServerDomain}/adminCards`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            setCards(res.data);
        }).catch(() => {
            router.push('/login');
        })

        await axios({
            method: 'post',
            url: `${globals.productionServerDomain}/getDirectionActiveCards`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            setDirectionActiveCards(res.data);
        }).catch(() => {
            router.push('/login');
        })

        await axios({
            method: 'post',
            url: `${globals.productionServerDomain}/getTutorsActiveCards`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            setTutorsActiveCards(res.data);
        })

        await axios({
            method: 'post',
            url: `${globals.productionServerDomain}/courseCategories`,
        }).then(res => {
            setCategories(res.data);
        })

        await axios({
            method: 'get',
            url: `${globals.productionServerDomain}/adminTeachers`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            setTeachers(res.data);
        }).catch(() => {
            router.push('/login');
        })

        await axios({
            method: 'get',
            url: `${globals.productionServerDomain}/editCards`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            setEditCards(res.data);
        }).catch(() => {
            router.push('/login');
        })

        axios.get(`${globals.productionServerDomain}/courses`).then(res => { setCourses(res.data) })

        axios.get(`${globals.productionServerDomain}/tutors`).then(res => { setTutors(res.data) })

        await axios({
            method: 'post',
            url: `${globals.productionServerDomain}/getCourseSearchApplicationStatistics`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(function(res){
            console.log("getCourseSearchApplicationStatistics:", res.data.applications);
            setCourseSearchApplications(res.data.applications);

            let activeCount = 0;

            res.data.applications.map(item => {
                if(item.is_active){
                    activeCount++
                }
            });
            setActiveApplicationsCount(activeCount);

            setApplicationResponses(res.data.responses);
            console.log(courseSearchApplications)
        }).catch(() => {
            router.push('/login');
        })
        await axios({
            method: 'post',
            url: `${globals.productionServerDomain}/getTelegramUsersCenters`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(function(res){
            setTelegramBotUsersCenters(res.data);
        }).catch(() => {
            router.push('/login');
        })

        await axios({
            method: 'post',
            url: `${globals.productionServerDomain}/getTelegramUsersTutors`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(function(res){
            setTelegramBotUsersTutors(res.data);
        }).catch(() => {
            router.push('/login');
        })

        await axios({
            method: 'get',
            url: `${globals.productionServerDomain}/getTelegramFeedbacksCenters`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(function(res){
            setTelegramFeedbacksCenters(res.data);
        }).catch(() => {
            router.push('/login');
        })

        await axios({
            method: 'get',
            url: `${globals.productionServerDomain}/getTelegramFeedbacksTutors`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(function(res){
            setTelegramFeedbacksTutors(res.data);
        }).catch((err)=>{
            console.log("telegram bot feedbacks tutors load error")
        })

        setLoading(false);
    }

    useEffect( () => {
        loadInfo();
    }, [])
    courses.forEach(function(course) {
        course.count = 0;
        courseSearchApplications.forEach(function(item){
            if ((course.id == item.course_id) && (item.role_id == 4)){course.count = course.count+1}
            });
        // console.log('aaa', course)
    });

    tutors.forEach(function(tutor) {
        tutor.count = 0;
        courseSearchApplications.forEach(function(item){
            if ((tutor.id == item.course_id) && (item.role_id == 6)){tutor.count = tutor.count+1}
            });
        // console.log('aaa', course)
    });

    directionActiveCards.forEach(function(item){
        item.t_count = 0;
        tutorsActiveCards.forEach(function(tcc){
            if (item.name == tcc.name){item.t_count = tcc.count}
        });
    });
    return(
        <div className={styles.body}>
            <Head>
                <title>Oilan - Админ-панель</title>
                <link rel="icon" href="/atom-icon.png" />
                <div dangerouslySetInnerHTML={{__html: googleAdds()}}/>
            </Head>

            
            {/*<ContactButton/>*/}

            {loading ? null : (
                <div>
                    <div className={styles.container}>
                        <div className={styles.title_block} >
                            <img src="/two-books.png" style={{height: '18px'}} alt=""/>
                            <span style={{
                                fontSize: 24,
                                fontFamily: 'sans-serif',
                                fontWeight: 'bold',
                                marginLeft: 10
                            }}>Активные карточки по направлениям</span>
                            <button onClick={() =>{
                                setActiveCardsTable(!activeCardsTable)
                            }}>{activeCardsTable?'Скрыть':'Раскрыть'}</button>
                        </div>
                        <div 
                            className={styles.coursesBlock} 
                            style={{display: activeCardsTable?'block':'none'}}>
                            <table className={styles.applicationsTable} border={2}>
                                <tr>
                                    <th>Направление</th>
                                    <th>Кол-во карточек центров</th>
                                    <th>Кол-во карточек репетиторов</th>
                                </tr>
                                <tbody>
                                {
                                    directionActiveCards.map(item => (
                                        <tr className={styles.table_row}>
                                            <td>{item.name}</td>
                                            <td>{item.count}</td>
                                            <td>{item.t_count}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.title_block} >
                            <img src="/two-books.png" style={{height: '18px'}} alt=""/>
                            <span style={{
                                fontSize: 24,
                                fontFamily: 'sans-serif',
                                fontWeight: 'bold',
                                marginLeft: 10
                            }}>Количество заявок по центрам</span>
                            <button onClick={() =>{
                                setCenterRequestsTable(!centerRequestsTable)
                            }}>{centerRequestsTable?'Скрыть':'Раскрыть'}</button>
                        </div>
                        <div className={styles.coursesBlock}
                        style={{display: centerRequestsTable?'block':'none'}}>
                            <table className={styles.applicationsTable} border={2}>
                                <tr>
                                    <th>Id центра</th>
                                    <th>Центр</th>
                                    <th>Кол-во карточек</th>
                                </tr>
                                <tbody>
                                {
                                    (courses.map(course =>                               
                                            (<tr className={styles.table_row}>
                                                    <td>{course.id}</td>
                                                    <td>{course.title}</td>
                                                    <td>{course.count}</td>
                                            </tr>)
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.title_block} >
                            <img src="/two-books.png" style={{height: '18px'}} alt=""/>
                            <span style={{
                                fontSize: 24,
                                fontFamily: 'sans-serif',
                                fontWeight: 'bold',
                                marginLeft: 10
                            }}>Количество заявок по репетиторам</span>
                            <button onClick={() =>{
                                setTutorRequestsTable(!tutorRequestsTable)
                            }}>{tutorRequestsTable?'Скрыть':'Раскрыть'}</button>
                        </div>
                        <div className={styles.coursesBlock}
                            style={{display: tutorRequestsTable?'block':'none'}}>
                            <table className={styles.applicationsTable} border={2}>
                                <tr>
                                    <th>Id репетитора</th>
                                    <th>Репетитор</th>
                                    <th>Кол-во карточек</th>
                                </tr>
                                <tbody>
                                {
                                    (tutors.map(tutor =>                               
                                            (<tr className={styles.table_row}>
                                                    <td>{tutor.id}</td>
                                                    <td>{tutor.fullname}</td>
                                                    <td>{tutor.count}</td>
                                            </tr>)
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className={styles.container}>
                        <div className={styles.title_block} >
                            <img src="/teacher.png" style={{height: '18px'}} alt=""/>
                            <span style={{
                                fontSize: 24,
                                fontFamily: 'sans-serif',
                                fontWeight: 'bold',
                                marginLeft: 10
                            }}>Детализация по заявкам</span>
                            <button onClick={() =>{
                                setRequestStat(!requestStat)
                            }}>{requestStat?'Скрыть':'Раскрыть'}</button>
                        </div>
                        <div style={{display: requestStat?'block':'none'}}>
                            <h5>Всего заявок: {courseSearchApplications.length}</h5>
                            <h5>Активных: {activeApplicationsCount}</h5>
                            <h5>Неактивных: {courseSearchApplications.length - activeApplicationsCount}</h5>
                            <br/>
                        </div>
                        <div className={styles.coursesBlock}
                            style={{display: requestStat?'block':'none'}}>
                            <table className={styles.applicationsTable} border={2}>
                                <tr>
                                    <td>Номер</td>
                                    <td>Дата</td>
                                    <td>Ищет</td>
                                    <td>ID центра/реп</td>
                                    <td>Имя</td>
                                    <td>Телефон</td>
                                    <td>Направление</td>
                                    <td>Отклики</td>
                                    <td>Центры</td>
                                    <td>В телеге</td>
                                    <td>Ссылка</td>
                                </tr>
                                <tbody>
                                {
                                    courseSearchApplications.map(item =>
                                    {
                                        let date = new Date(Date.parse(item.datetime));
                                        let dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                                        return(
                                            <tr className={item.is_active ? styles.active_application : styles.inactive_application}>
                                                <td>{item.id}</td>
                                                <td>{date.toLocaleDateString('ru-ru', dateOptions)}</td>
                                                <td>{item.role_id === 6 ? 'Репетитора' : 'Центр'}</td>
                                                <td>{item.course_id === 0 ? 'Всем' : item.course_id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.direction_name}</td>
                                                <td>{item.responses_count}</td>
                                                <td>{item.centers_count}</td>
                                                <td>{item.telegram_count}</td>
                                                <td><a href={globals.productionSiteDomain + "/application/" + item.uuid_string}>Ссылка</a></td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className={styles.container}>
                        <div className={styles.title_block} >
                            <img src="/two-books.png" style={{height: '18px'}} alt=""/>
                            <span style={{
                                fontSize: 24,
                                fontFamily: 'sans-serif',
                                fontWeight: 'bold',
                                marginLeft: 10
                            }}>Детализация по кликам</span>
                            <button onClick={() =>{
                                setClicker(!clicker)
                            }}>{clicker?'Скрыть':'Раскрыть'}</button>
                        </div>
                        <div className={styles.coursesBlock}
                            style={{display: clicker?'block':'none'}}>
                            <select value={selectedCourseTitle} onChange={e => setSelectedCourseTitle(e.target.value)}>
                                {courses.map(item => (<option value={item.title}>{item.title}</option>))}
                            </select>

                            <button onClick={async () => {
                                let token = JSON.parse(localStorage.getItem(globals.localStorageKeys.authToken)).token;
                                await axios({
                                    method: 'post',
                                    data:{
                                        centerName: selectedCourseTitle
                                    },
                                    url: `${globals.productionServerDomain}/getClickStatistics`,
                                    headers: {
                                        'Authorization': `Bearer ${token}`
                                    }
                                }).then(function(result){
                                    setOKurse(result.data[0].o_kurse);
                                    setOtpravitZayavku(result.data[0].otpravit_zayavku);
                                    setPokazatBolshe(result.data[0].pokazat_bolshe);
                                    setNomerTelefona(result.data[0].nomer_telefona);
                                    setWebsite(result.data[0].website);
                                    setInstagram(result.data[0].instagram);
                                });
                            }}>Посмотреть</button>

                        </div>

                        <br style={{display: clicker?'block':'none'}}/>

                        <table border={1} cellPadding={5}
                            style={{display: clicker?'block':'none'}}>
                            <tr>
                                <td>О курсе</td>
                                <td>Отправить заявку</td>
                                <td>Показать больше</td>
                                <td>Номер телефона</td>
                                <td>Веб-сайт</td>
                                <td>Инстаграм</td>
                            </tr>
                            <tr>
                                <td>{oKurse}</td>
                                <td>{otpravitZayavku}</td>
                                <td>{pokazatBolshe}</td>
                                <td>{nomerTelefona}</td>
                                <td>{website}</td>
                                <td>{instagram}</td>
                            </tr>
                        </table>
                    </div>

                    <div className={styles.container}>
                        <div className={styles.title_block} >
                            <img src="/two-books.png" style={{height: '18px'}} alt=""/>
                            <span style={{
                                fontSize: 24,
                                fontFamily: 'sans-serif',
                                fontWeight: 'bold',
                                marginLeft: 10
                            }}>Телеграм-бот (Центры)</span>
                            <button onClick={() =>{
                                setCentersBot(!centersBot)
                            }}>{centersBot?'Скрыть':'Раскрыть'}</button>
                        </div>

                        <div style={{display: centersBot?'block':'none'}}>
                            <h6>Всего зарегистрировано: {telegramBotUsersCenters.length}</h6>
                        </div>

                        <div style={{display: centersBot?'block':'none'}}>
                            <table className={styles.applicationsTable} border={2}>
                                <tr>
                                    <td>id</td>
                                    <td>Название центра</td>
                                    <td>Логин ЛК</td>
                                    <td>Пароль ЛК</td>
                                    <td>Последний вход в ЛК</td>
                                </tr>
                                <tbody>
                                {telegramBotUsersCenters.map(item => {
                                    let dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                                    let date = new Date(Date.parse(item.last_login_datetime));
                                    let displayDate = date.toLocaleDateString('ru-ru', dateOptions);

                                    return(
                                        <tr className={styles.table_row}>
                                            <td>{item.course_id}</td>
                                            <td>{item.title}</td>
                                            <td>{item.login}</td>
                                            <td>{item.password}</td>
                                            <td>{item.last_login_datetime === null ? 'Никогда' : displayDate}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div className={styles.container}>
                        <div className={styles.title_block} >
                            <img src="/two-books.png" style={{height: '18px'}} alt=""/>
                            <span style={{
                                fontSize: 24,
                                fontFamily: 'sans-serif',
                                fontWeight: 'bold',
                                marginLeft: 10
                            }}>Телеграм-бот (Репетиторы)</span>
                            <button onClick={() =>{
                                setTutorsBot(!tutorsBot)
                            }}>{tutorsBot?'Скрыть':'Раскрыть'}</button>
                        </div>

                        <div style={{display: tutorsBot?'block':'none'}}>
                            <h6>Всего зарегистрировано: {telegramBotUsersTutors.length}</h6>
                        </div>

                        <div style={{display: tutorsBot?'block':'none'}}>
                            <table className={styles.applicationsTable} border={2}>
                                <tr>
                                    <td>id</td>
                                    <td>ФИО</td>
                                    <td>Логин ЛК</td>
                                    <td>Пароль ЛК</td>
                                </tr>
                                <tbody>
                                {telegramBotUsersTutors.map(item => {
                                    return(
                                        <tr className={styles.table_row}>
                                            <td>{item.course_id}</td>
                                            <td>{item.fullname}</td>
                                            <td>{item.login}</td>
                                            <td>{item.password}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div className={styles.container}>
                        <div className={styles.title_block} >
                            <img src="/two-books.png" style={{height: '18px'}} alt=""/>
                            <span style={{
                                fontSize: 24,
                                fontFamily: 'sans-serif',
                                fontWeight: 'bold',
                                marginLeft: 10
                            }}>Фидбэк от центров телеграм-бот</span>
                            <button onClick={() =>{
                                setCentersBotFeedback(!centersBotFeedback)
                            }}>{centersBotFeedback?'Скрыть':'Раскрыть'}</button>
                        </div>

                        <div style={{display: centersBotFeedback?'block':'none'}}>
                            <table className={styles.applicationsTable} border={2}>
                                <tr>
                                    <td>id заявки</td>
                                    <td>Центр</td>
                                    <td>Сообщение</td>
                                    <td>Дата пробного урока</td>
                                </tr>
                                <tbody>
                                {telegramFeedbacksCenters.map(item => {
                                    let message = '';
                                    switch(item.answer){
                                        case 'wrngnmbr':
                                            message = 'НЕВЕРНЫЙ НОМЕР';
                                            break;
                                        case 'cnctlater':
                                            message = 'СВЯЖУСЬ ПОЗЖЕ';
                                            break;
                                        case 'missing':
                                            message = 'НЕ ДОЗВОНИЛИСЬ';
                                            break;
                                        case 'frlss':
                                            message = 'ПРОБНЫЙ УРОК';
                                            break;
                                        case 'rfsl':
                                            message = 'ОТКАЗ';
                                            break;
                                        default:
                                            message = item.answer;
                                            break;
                                    }

                                    return(
                                        <tr className={styles.table_row}>
                                            <td>{item.ticket_id}</td>
                                            <td>{item.title}</td>
                                            <td>{message}</td>
                                            <td>{item.trial_lesson_date}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div className={styles.container}>
                        <div className={styles.title_block} >
                            <img src="/two-books.png" style={{height: '18px'}} alt=""/>
                            <span style={{
                                fontSize: 24,
                                fontFamily: 'sans-serif',
                                fontWeight: 'bold',
                                marginLeft: 10
                            }}>Фидбэк от репетиторов телеграм-бот</span>
                            <button onClick={() =>{
                                setTutorsBotFeedback(!tutorsBotFeedback)
                            }}>{tutorsBotFeedback?'Скрыть':'Раскрыть'}</button>
                        </div>

                        <div style={{display: tutorsBotFeedback?'block':'none'}}>
                            <table className={styles.applicationsTable} border={2}>
                                <tr>
                                    <td>id заявки</td>
                                    <td>Репетитор</td>
                                    <td>Сообщение</td>
                                    <td>Дата пробного урока</td>
                                </tr>
                                <tbody>
                                {telegramFeedbacksTutors.map(item => {
                                    let message = '';
                                    switch(item.answer){
                                        case 'wrngnmbr':
                                            message = 'НЕВЕРНЫЙ НОМЕР';
                                            break;
                                        case 'cnctlater':
                                            message = 'СВЯЖУСЬ ПОЗЖЕ';
                                            break;
                                        case 'missing':
                                            message = 'НЕ ДОЗВОНИЛИСЬ';
                                            break;
                                        case 'frlss':
                                            message = 'ПРОБНЫЙ УРОК';
                                            break;
                                        case 'rfsl':
                                            message = 'ОТКАЗ';
                                            break;
                                        default:
                                            message = item.answer;
                                            break;
                                    }
                                    return(
                                        <tr className={styles.table_row}>
                                            <td>{item.ticket_id}</td>
                                            <td>{item.fullname}</td>
                                            <td>{message}</td>
                                            <td>{item.trial_lesson_date}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            
        </div>
    )
}
export default AdminCardsBlock;
