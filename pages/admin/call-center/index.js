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
                <title>Oilan - ????????-??????????</title>
                <link rel="icon" href="/atom-icon.png" />
            </Head>

            <Header/>
            {/*<ContactButton/>*/}

            <div style={{width: '100%', textAlign: 'center'}}>
                <input type="text" onChange={e => setCenterTitleSearchText(e.target.value)} placeholder={"???????????????? ????????????"}/>
                <select onChange={e => setDirectionIdFilter(e.target.value)}>
                    <option value={0}>?????? ??????????????????????</option>
                    <option value={1}>???????????????? ??????????</option>
                    <option value={2}>????????????????????????????????</option>
                    <option value={3}>??????????????????</option>
                    <option value={34}>?????????????? ????????????????</option>
                    <option value={35}>?????????????????????????????? ??????????</option>
                </select>
                <br/>
                <p>???????? ?????????????? ????????????</p>
                <input type="date" onChange={e => setFirstCallDateFilter(e.target.value)} placeholder={"???????? ?????????????? ????????????"}/>
                <br/>
                <p>???????? ???????????????? ????</p>
                <input type="date" onChange={e => setKpSendDateFilter(e.target.value)} placeholder={"???????? ???????????????? ????"}/>
                <br/>
                <p>???????? ?????????????? ????????????</p>
                <input type="date" onChange={e => setSecondCallDateFilter(e.target.value)} placeholder={"???????? ?????????????? ????????????"}/>
                <br/>
                <p>???????? ??????????????</p>
                <input type="date" onChange={e => setMeetingDateFilter(e.target.value)} placeholder={"???????? ??????????????"}/>
                <br/>
                ???????????????????? ???? <input type="checkbox" value={"???????????????????? ????"} onChange={e => setKpSentFilter(!kpSentFilter)}/> <br/>
                ?????????????????? ?????????????? <input type="checkbox" value={"?????????????????? ??????????????"} onChange={e => setMeetingSetFilter(!meetingSetFilter)}/> <br/>
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
                }}>??????????</button>
            </div>

            <h3 style={{width: '100%', textAlign: 'center', margin: 20, color: 'white'}}>?????????? ??????????: {rowsCont}</h3>

            {/*<div style={{width: '100%', textAlign: 'center'}}>*/}
            {/*    <input type="number" placeholder={'???????????????? ????'} onChange={e => setStartRowNum(e.target.value)}/>*/}
            {/*    <input type="number" placeholder={'???????????????? ????'} onChange={e => setEndRowNum(e.target.value)}/>*/}
            {/*    <button onClick={() => {*/}
            {/*        loadInfo();*/}
            {/*    }}>???????????????? ????????????</button>*/}
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
                                }}>?????????????? ????????????</span>
                            </div>
                            <div className={tablesStyles.tableBody}>
                                <table border={1} cellPadding={5} style={{width: '100%'}} className={tablesStyles.table}>
                                    <tr className={tablesStyles.tableTitleRow}>
                                        <td>????????????????</td>
                                        <td>??????????????????????</td>
                                        <td>???????????????????? ????????</td>
                                        <td>??????????????</td>
                                        <td>??????????</td>
                                        <td>????????????????</td>
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
                                }}>????????-??????????</span>
                            </div>
                            <div className={tablesStyles.tableBody}>
                                <table border={1} cellPadding={5} style={{width: '100%'}} className={tablesStyles.table}>
                                    <tr className={tablesStyles.tableTitleRow}>
                                        <td>???</td>
                                        <td>????????????????</td>
                                        <td>??????????????????????</td>
                                        <td>???????????????????? ????????</td>
                                        <td>??????????????</td>
                                        <td>??????????</td>
                                        <td>???????? ?????????????? ??????????????</td>
                                        <td>?????????? ?????????????? ????????????</td>
                                        <td>????????????????????</td>
                                        <td>???????????????? ????</td>
                                        <td>???????? ???????????????????? ????????????</td>
                                        <td>?????????? ???????????????????? ????????????</td>
                                        <td>????????????????????</td>
                                        <td>???????? ??????????????</td>
                                        <td>?????????? ??????????????</td>
                                        <td>?????????????????? ??????????????????</td>
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
