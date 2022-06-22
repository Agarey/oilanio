import Head from 'next/head'
import Header from '../../src/components/Header/Header'
import styles from "../../styles/components/Admin.module.css";
import CourseCard from "../../src/components/CourseCard/CourseCard";
import Footer from "../../src/components/Footer/Footer";
import React, { useState, useEffect } from "react";
import 'react-animated-slider/build/horizontal.css'
import ContactButton from "../../src/components/ContactButton/ContactButton";
import classnames from 'classnames';
import RequestCourseCard from "../../src/components/RequestCourseCard/RequestCourseCard";
import RequestTeacherCard from "../../src/components/RequestTeacherCard/RequestTeacherCard";
const axios = require('axios').default;
import globals from "../../src/globals";
import CourseSearchApplicationInfo from "../../src/components/CourseSearchApplicationInfo/CourseSearchApplicationInfo";
import TelegramBotUser from "../../src/components/TelegramBotUser/TelegramBotUser";
import {useRouter} from "next/router";

function Admin(){
    const router = useRouter();
    let [cards, setCards] = useState([]);
    let [editCards, setEditCards] = useState([]);
    let [teachers, setTeachers] = useState([]);
    let [loading, setLoading] = useState(true);
    let [courses, setCourses] = useState([]);
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

    let [activeApplicationsCount, setActiveApplicationsCount] = useState(0);

    let [directionActiveCards, setDirectionActiveCards] = useState([]);

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

        await axios({
            method: 'post',
            url: `${globals.productionServerDomain}/getCourseSearchApplicationStatistics`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(function(res){
            console.log("getCourseSearchApplicationStatistics:");
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
        loadInfo()
    }, [])

    return(
        <div className={styles.body}>
            <Head>
                <title>Oilan - Админ-панель</title>
                <link rel="icon" href="/atom-icon.png" />
                <div dangerouslySetInnerHTML={{__html: googleAdds()}}/>
            </Head>

            <Header/>
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
                            }}>Отправить сообщение центру</span>
                        </div>
                        <div className={styles.coursesBlock}>
                            <div>
                                <select onChange={e => setNotificationCenterId(e.target.value)}>
                                    {courses.map(item => <option value={item.id}>{item.title}</option>)}
                                </select>
                                <br/><br/>
                                <textarea cols={35} value={notificationMessage} onChange={e => setNotificationMessage(e.target.value)}/>
                                <br/><br/>
                                <button onClick={async () => {
                                    let token = JSON.parse(localStorage.getItem(globals.localStorageKeys.authToken)).token;
                                    console.log("notification message: " + notificationMessage)
                                    await axios({
                                        method: 'post',
                                        data:{
                                            center_id: notificationCenterId,
                                            message: notificationMessage
                                        },
                                        url: `${globals.productionServerDomain}/createCourseNotification`,
                                        headers: {
                                            'Authorization': `Bearer ${token}`
                                        }
                                    }).then(function(result){
                                        setNotificationMessage("");
                                    });
                                }}>Отправить сообщение</button>
                            </div>
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
                            }}>Создать акцию</span>
                        </div>
                        <div>
                            <select
                                onChange={e => {
                                    setSelectedCategoryId(e.target.value);
                                    axios({
                                        method: 'post',
                                        url: `${globals.productionServerDomain}/subcoursesByCategory`,
                                        data: {
                                            categoryId: e.target.value
                                        }
                                    }).then(res => {
                                        setSubcourses(res.data);
                                    })
                                }}
                            >
                                <option value={0}>Все категории</option>
                                {categories.map(item => (
                                    <option value={item.id}>{item.name}</option>
                                ))}
                            </select>

                            <br/><br/>

                            <select
                                onChange={e => {
                                    setSelectedSubcourseId(e.target.value)
                                }}
                            >
                                {subcourses.map(item => (
                                    <option value={item.id}>{`${item.center_title}. ${item.subcourse_title}`}</option>
                                ))}
                            </select>

                            <br/><br/>

                            <textarea cols="40" rows="5" onChange={e => setPromotionText(e.target.value)}>
                                {promotionText}
                            </textarea>
                            
                            <br/><br/>

                            <p>Акция действует до:</p>
                            <input type="date" onChange={e => setPromotionDateTill(e.target.value)}/>

                            <br/><br/>

                            <button
                                onClick={() => {
                                    let data = {
                                        selectedSubcourseId,
                                        selectedCategoryId,
                                        promotionText,
                                        promotionDateTill
                                    }
                                    console.log(data);

                                    axios({
                                        method: 'post',
                                        url: `${globals.productionServerDomain}/createPromotion`,
                                        data: data,
                                        headers: {
                                            'Authorization': `Bearer ${localStorage.getItem('auth token')}`
                                        }
                                    }).then(function(res){
                                        alert('Акция создана успешно!');
                                    }).catch((err)=>{
                                        alert('Что-то пошло нетак!')
                                    })
                                }}
                            >Создать акцию</button>
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
                            }}>Заявки на курсы</span>
                        </div>
                        <div className={styles.coursesBlock}>
                            {cards.length > 0 ? cards.map(course => (
                                <div style={{width: '22%'}}>
                                    <RequestCourseCard course={course}/>
                                </div>
                            )) : null}
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
                            }}>Заявки на учителей</span>
                        </div>
                        <div className={styles.coursesBlock}>
                            {teachers.map(teacher => (
                                <div style={{width: '22%'}}>
                                    <RequestTeacherCard teacher={teacher}/>
                                </div>
                            ))}
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
                            }}>Заявки на редактирование карточек</span>
                        </div>
                        <div className={styles.coursesBlock}>
                            {editCards.length > 0 ? editCards.map(course => (
                                <div style={{width: '22%'}}>
                                    <RequestCourseCard course={course} type={'editCard'}/>
                                </div>
                            )) : null}
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
                            }}>Статистика по заявкам</span>
                        </div>
                        <div>
                            <h5>Всего заявок: {courseSearchApplications.length}</h5>
                            <h5>Активных: {activeApplicationsCount}</h5>
                            <h5>Неактивных: {courseSearchApplications.length - activeApplicationsCount}</h5>
                            <br/>
                        </div>
                        <div className={styles.coursesBlock}>
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
                            }}>Активные карточки по направлениям</span>
                        </div>
                        <div className={styles.coursesBlock}>
                            <table className={styles.applicationsTable} border={2}>
                                <tr>
                                    <td>Направление</td>
                                    <td>Кол-во карточек</td>
                                </tr>
                                <tbody>
                                {
                                    directionActiveCards.map(item => (
                                        <tr className={styles.table_row}>
                                            <td>{item.name}</td>
                                            <td>{item.count}</td>
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
                            }}>Статистика</span>
                        </div>
                        <div className={styles.coursesBlock}>
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

                        <br/>

                        <table border={1} cellPadding={5}>
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

                    {/*<div className={styles.container}>*/}
                    {/*    <div className={styles.title_block} >*/}
                    {/*        <img src="/two-books.png" style={{height: '18px'}} alt=""/>*/}
                    {/*        <span style={{*/}
                    {/*            fontSize: 24,*/}
                    {/*            fontFamily: 'sans-serif',*/}
                    {/*            fontWeight: 'bold',*/}
                    {/*            marginLeft: 10*/}
                    {/*        }}>Статистика по заявкам</span>*/}
                    {/*    </div>*/}

                    {/*    <div className={styles.coursesBlock} style={{flexDirection: 'column'}}>*/}
                    {/*        {*/}
                    {/*            courseSearchApplications.map(item => (<CourseSearchApplicationInfo application={item}/>))*/}
                    {/*        }*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className={styles.container}>
                        <div className={styles.title_block} >
                            <img src="/two-books.png" style={{height: '18px'}} alt=""/>
                            <span style={{
                                fontSize: 24,
                                fontFamily: 'sans-serif',
                                fontWeight: 'bold',
                                marginLeft: 10
                            }}>Телеграм-бот (Центры)</span>
                        </div>

                        <div>
                            <h6>Всего зарегистрировано: {telegramBotUsersCenters.length}</h6>
                        </div>

                        <div>
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
                        </div>

                        <div>
                            <h6>Всего зарегистрировано: {telegramBotUsersTutors.length}</h6>
                        </div>

                        <div>
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
                        </div>

                        <div>
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
                        </div>

                        <div>
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

            <Footer/>
        </div>
    )
}
export default Admin;
