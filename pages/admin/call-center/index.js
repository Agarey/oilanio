import Head from 'next/head'
import Header from '../../../src/components/Header/Header'
import styles from "../../../styles/components/Admin.module.css";
import CourseCard from "../../../src/components/CourseCard/CourseCard";
import Footer from "../../../src/components/Footer/Footer";
import React, { useState, useEffect } from "react";
import 'react-animated-slider/build/horizontal.css'
import ContactButton from "../../../src/components/ContactButton/ContactButton";
import classnames from 'classnames';
import RequestCourseCard from "../../../src/components/RequestCourseCard/RequestCourseCard";
import RequestTeacherCard from "../../../src/components/RequestTeacherCard/RequestTeacherCard";
const axios = require('axios').default;
import globals from "../../../src/globals";
import CallCenterElement from "../../../src/components/CallCenterElement/CallCenterElement";
import CallCenterTableElement from "../../../src/components/CallCenterTableElement/CallCenterTableElement";
import SalerCardTableElement from "../../../src/components/SalerCard/SalerCard";
import CallCenterCoursesTableElement from "../../../src/components/CallCenterCoursesTableElement/CallCenterCoursesTableElement";
import tablesStyles from '../../../styles/components/CallCenterElement.module.css'

function CallCenter(){
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
    let [callCenterCards, setCallCenterCards] = useState([]);
    let [sallerCards, setSallerCards] = useState([]);
    let [rowsCont, setRowsCount] = useState(0);

    let [centerTitleSearchText, setCenterTitleSearchText] = useState('');
    let [directionIdFilter, setDirectionIdFilter] = useState('0');
    let [firstCallDateFilter, setFirstCallDateFilter] = useState(null);
    let [kpSendDateFilter, setKpSendDateFilter] = useState(null);
    let [secondCallDateFilter, setSecondCallDateFilter] = useState(null);
    let [meetingDateFilter, setMeetingDateFilter] = useState(null);
    let [kpSentFilter, setKpSentFilter] = useState(false);
    let [meetingSetFilter, setMeetingSetFilter] = useState(false);

    let [allRows, setAllRows] = useState([]);
    let [crmCategories, setCrmCategories] = useState([]);
    let [startRowNum, setStartRowNum] = useState('0');
    let [endRowNum, setEndRowNum] = useState('10');


    const loadInfo = async () => {
        setLoading(true);
        let token = localStorage.getItem("auth token");
        await axios({
            method: 'post',
            url: `${globals.productionServerDomain}/loadCallCenterInfo`,
            // data: {
            //   startRowNum: startRowNum,
            //   endRowNum: endRowNum
            // },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(function(res){
            setCallCenterCards(res.data.rows);
            setAllRows(res.data.rows);
            setRowsCount(res.data.length);
        });

        setLoading(false);
    }

    useEffect( () => {
        axios.post(`${globals.productionServerDomain}/crmCourseCategories`).then(res => {
            setCrmCategories(res.data);
            console.log(res);
        })
        setLoading(false);

        loadInfo();
    }, [])

    return(
        <div className={styles.body}>
            <Head>
                <title>Oilan - Колл-центр</title>
                <link rel="icon" href="/atom-icon.png" />
            </Head>

            <Header/>
            {/*<ContactButton/>*/}

            <div style={{width: '100%', textAlign: 'center'}}>
                <input type="text" onChange={e => setCenterTitleSearchText(e.target.value)} placeholder={"Название центра"}/>
                <select onChange={e => setDirectionIdFilter(e.target.value)}>
                    <option value={0}>Все направления</option>
                    <option value={1}>Языковой центр</option>
                    <option value={2}>Программирование</option>
                    <option value={3}>Искусство</option>
                    <option value={34}>Детское развитие</option>
                    <option value={35}>Образовательный центр</option>
                </select>
                <br/>
                <p>Дата первого звонка</p>
                <input type="date" onChange={e => setFirstCallDateFilter(e.target.value)} placeholder={"Дата первого звонка"}/>
                <br/>
                <p>Дата отправки КП</p>
                <input type="date" onChange={e => setKpSendDateFilter(e.target.value)} placeholder={"Дата отправки КП"}/>
                <br/>
                <p>Дата второго звонка</p>
                <input type="date" onChange={e => setSecondCallDateFilter(e.target.value)} placeholder={"Дата второго звонка"}/>
                <br/>
                <p>Дата встречи</p>
                <input type="date" onChange={e => setMeetingDateFilter(e.target.value)} placeholder={"Дата встречи"}/>
                <br/>
                Отправлено КП <input type="checkbox" value={"Отправлено КП"} onChange={e => setKpSentFilter(!kpSentFilter)}/> <br/>
                Назначена встреча <input type="checkbox" value={"Назначена встреча"} onChange={e => setMeetingSetFilter(!meetingSetFilter)}/> <br/>
                <button onClick={async () => {
                    await axios({
                        method: 'post',
                        url: `${globals.productionServerDomain}/filterCallCenterRows`,
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem("auth token")}`
                        },
                        data: {
                            centerTitleSearchText: centerTitleSearchText,
                            directionId: directionIdFilter,
                            firstCallDate: firstCallDateFilter,
                            kpSendDate: kpSendDateFilter,
                            secondCallDate: secondCallDateFilter,
                            meetingDate: meetingDateFilter,
                            kpSend: kpSentFilter,
                            meetingSet: meetingSetFilter
                        }
                    }).then(function(res){
                        setCallCenterCards([]);
                        setCallCenterCards(res.data.rows);
                        setRowsCount(res.data.length);
                    });
                }}>Поиск</button>
            </div>

            <h3 style={{width: '100%', textAlign: 'center', margin: 20, color: 'white'}}>Всего строк: {rowsCont}</h3>

            {/*<div style={{width: '100%', textAlign: 'center'}}>*/}
            {/*    <input type="number" placeholder={'Показать от'} onChange={e => setStartRowNum(e.target.value)}/>*/}
            {/*    <input type="number" placeholder={'Показать до'} onChange={e => setEndRowNum(e.target.value)}/>*/}
            {/*    <button onClick={() => {*/}
            {/*        loadInfo();*/}
            {/*    }}>Показать строки</button>*/}
            {/*</div>*/}

            {loading ? null : (
                <div>
                    <div className={styles.container}>
                        <div style={{width: '100%'}}>
                            <div className={styles.title_block} >
                                <img src="/two-books.png" style={{height: '18px'}} alt=""/>
                                <span style={{
                                    fontSize: 24,
                                    fontFamily: 'sans-serif',
                                    fontWeight: 'bold',
                                    marginLeft: 10
                                }}>Таблица курсов</span>
                            </div>
                            <div className={tablesStyles.tableBody}>
                                <table border={1} cellPadding={5} style={{width: '100%'}} className={tablesStyles.table}>
                                    <tr className={tablesStyles.tableTitleRow}>
                                        <td>Компания</td>
                                        <td>Направление</td>
                                        <td>Контактное лицо</td>
                                        <td>Телефон</td>
                                        <td>Почта</td>
                                        <td>Добавить</td>
                                    </tr>
                                    <CallCenterCoursesTableElement/>
                                </table>
                            </div>

                            {/*<div className={styles.callCenterElements}>*/}
                            {/*    {callCenterCards.map(item => <CallCenterElement card={item}/>)}*/}
                            {/*</div>*/}
                        </div>
                        <div style={{width: '100%'}}>
                            <div className={styles.title_block} >
                                <img src="/two-books.png" style={{height: '18px'}} alt=""/>
                                <span style={{
                                    fontSize: 24,
                                    fontFamily: 'sans-serif',
                                    fontWeight: 'bold',
                                    marginLeft: 10
                                }}>Колл-центр</span>
                            </div>
                            <div className={tablesStyles.tableBody}>
                                <table border={1} cellPadding={5} style={{width: '100%'}} className={tablesStyles.table}>
                                    <tr className={tablesStyles.tableTitleRow}>
                                        <td>№</td>
                                        <td>Компания</td>
                                        <td>Направление</td>
                                        <td>Контактное лицо</td>
                                        <td>Телефон</td>
                                        <td>Почта</td>
                                        <td>Дата первого звонока</td>
                                        <td>Время первого звонка</td>
                                        <td>Коментарии</td>
                                        <td>Отправка КП</td>
                                        <td>Дата повторного звонка</td>
                                        <td>Время повторного звонка</td>
                                        <td>Коментарии</td>
                                        <td>Дата встречи</td>
                                        <td>Время встречи</td>
                                        <td>Сохранить изменения</td>
                                    </tr>
                                    {callCenterCards.map(item => <CallCenterTableElement card={item} categories={crmCategories}/>)}

                                </table>
                            </div>

                            {/*<div className={styles.callCenterElements}>*/}
                            {/*    {callCenterCards.map(item => <CallCenterElement card={item}/>)}*/}
                            {/*</div>*/}
                        </div>


                    </div>
                </div>
            )}


            <Footer/>
        </div>
    )
}
export default CallCenter;
