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
import tablesStyles from '../../../styles/components/CallCenterElement.module.css'

function Admin(){
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


    const loadInfo = async () => {
        await axios({
            method: 'get',
            url: `${globals.productionServerDomain}/loadSallerInfo`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("auth token")}`
            }
        }).then(function(res){
            setSallerCards(res.data);
        });

        setLoading(false);
    }

    useEffect( () => {
        loadInfo()
    }, [])

    return(
        <div className={styles.body}>
            <Head>
                <title>Oilan - Менеджер по продажам</title>
                <link rel="icon" href="/atom-icon.png" />
            </Head>

            <Header/>
            {/*<ContactButton/>*/}

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
                                }}>Продажник</span>
                            </div>
                            <div className={tablesStyles.tableBody}>
                                <table border={1} cellPadding={5} className={tablesStyles.table}>
                                    <tr className={tablesStyles.tableTitleRow}>
                                        <td>№</td>
                                        <td>Компания</td>
                                        <td>Направление</td>
                                        <td>Контактное лицо</td>
                                        <td>Телефон</td>
                                        <td>Почта</td>
                                        <td>Дата встречи</td>
                                        <td>Время встречи</td>
                                        <td>Проведение встречи</td>
                                        <td>Коментарии</td>
                                        <td>Статус заключение договора</td>
                                        <td>Дата заключения договора</td>
                                        <td>Сохранить изменения</td>
                                    </tr>
                                    {sallerCards.map(item => <SalerCardTableElement card={item}/>)}

                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            )}


            <Footer/>
        </div>
    )
}
export default Admin;
