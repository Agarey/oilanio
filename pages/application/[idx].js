import globals from "../../src/globals";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Head from 'next/head'
import styles from '../../styles/components/Application.module.css'
import ContactButton from "../../src/components/ContactButton/ContactButton";
import Header from "../../src/components/Header/Header";
import Footer from "../../src/components/Footer/Footer";
import CourseCard from "../../src/components/CourseCard/CourseCard";
import Loading from "../../src/components/Loading/Loading";

const axios = require('axios').default;

const Application = (props) => {
    const router = useRouter()
    const {idx} = router.query

    const [loadingModal, setLoadingModal] = useState(false);

    const [courseCards, setCourseCards] = useState([]);
    const [filters, setFilters] = useState([]);

    const [application, setApplication] = useState({})
    const [applicationStatus, setApplicationStatus] = useState('')
    const [fullname, setFullname] = useState('')
    const [phone, setPhone] = useState('')
    const [direction, setDirection] = useState('')
    const [message, setMessage] = useState('')
    const [isOnline, setIsOnline] = useState(application.is_online)
    const [email, setEmail] = useState('')
    const [applicationId, setApplicationId] = useState('')
    const [isActive, setIsActive] = useState(null);

    useEffect(async()=>{
        console.log('query id:', idx)
        let data = {
            uuid_string: idx.toString()
        }
        let applicationResult = null;

        let applicationId = null;

        await axios.post(`${globals.productionServerDomain}/getCourseSearchApplication`, data).then(res =>{
            setApplication(res.data);
            console.log("getCourseSearchApplication:")
            console.log(res.data)
            setFullname(res.data.name)
            setApplicationStatus(res.data.is_active)
            setPhone(res.data.phone)
            setEmail(res.data.email)
            setIsOnline(res.data.is_online)
            setMessage(res.data.message)
            setApplicationId(res.data.id)
            applicationResult = res
            applicationId = res.data.id
            setIsActive(res.data.is_active)
        })

        setTimeout(()=>{console.log(application)}, 5000)

       await axios.get(`${globals.productionServerDomain}/filters`).then(res => {
           setFilters(res.data);
           for(let i=0; i<res.data[1].length; i++){
               if(res.data[1][i].id === applicationResult.data.direction_id){
                   setDirection(res.data[1][i].name)
               }
           }
        })

        if(applicationId !== null){
            await axios.post(`${globals.productionServerDomain}/getApplicationResponses`,
                {
                    application_id: applicationId
                }).then(res =>{
                console.log("responses:")
                console.log(res.data)
                setCourseCards(res.data);
            })
        }
    }, []);

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

    return(
        <div style={{ background: 'linear-gradient(90deg, #7365C6 1.99%, #6657BF 46.33%, #412FAE 98.22%)' }}>
            <Head>
                <title>Oilan - Заявка</title>
                <link rel="icon" href="/atom-icon.png" />
                <div dangerouslySetInnerHTML={{__html: ym()}}/>
            </Head>
            {loadingModal
                ?
                (
                    <Loading/>
                )
                : null
            }
            <Header/>
            {/*<ContactButton/>*/}
                <div className={styles.body}>
                    <div className={styles.leftSideBlock}>
                        <div className={styles.application}>
                            <span className={styles.applicationTitle}>Заявка на поиск курса №{applicationId}</span>
                            <br/> <br/>
                            <span>Ваше имя <b>{fullname}</b>.</span> <br/>
                            <span>Указанный телефон: <b>{phone}</b></span> <br/>
                            <span>Указанный адрес эл. почты: <b>{email}</b></span> <br/>
                            <span>Направление по которому вы ищете курс: <b>{direction}</b>.</span> <br/>
                            <span>Формат занятий: <b>{isOnline ? 'Online' : 'Offline'}</b>.</span> <br/>
                            <span>Ваше сообщение: <b>{message}</b>.</span> <br/> <br/>
                            <div className={styles.applicationFooter}>
                                <span>Статус заявки - <b>{isActive ? 'Активна' : 'Не активна'}</b></span>
                                <div style={{width: '16px', height: '16px', borderRadius: '50%', marginLeft: '5px', background: isActive ? 'greenyellow' : 'red'}}></div>
                            </div>
                        </div>
                        <br/>
                        {isActive ? (
                            <button className={styles.disableButton}
                                    onClick={async ()=>{
                                        await axios({
                                            method: 'post',
                                            url: `${globals.productionServerDomain}/deactivateSearchApplication`,
                                            data: {
                                                application_id: applicationId
                                            }
                                        }).then(res => {
                                            setIsActive(false);
                                        });
                                    }}
                            >Деактивировать заявку</button>
                        ) : (<p>Заявка больше не активна</p>)}

                    </div>
                    <div className={styles.rightSideBlock}>
                        <span className={styles.applicationTitle}>Курсы которые предлагают Вам центры ориентируясь на заявку</span>
                        <div className={styles.cardsWrapper}>
                            {
                                courseCards.length > 0 ?
                                    courseCards.map(course => {
                                        if (course.title !== 'test') {
                                            return (
                                                <CourseCard application={true} setLoadingModal={setLoadingModal} course={course}/>
                                            )
                                        }
                                    })
                                    :
                                    (<p className={styles.message}>Вашу заявку еще никто не рассмотрел :( </p>)
                            }
                        </div>
                    </div>
                </div>
            <Footer/>
        </div>
    )
}

export async function getServerSideProps(context) {
    return {
        props: {

        }
    }
}

export default Application