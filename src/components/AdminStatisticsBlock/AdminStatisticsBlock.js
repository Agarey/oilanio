import Head from 'next/head'
import styles from "./AdminStatisticsBlock.module.css";
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

function AdminStatisticsBlock(){
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


                </div>
            )}

            
        </div>
    )
}
export default AdminStatisticsBlock;
