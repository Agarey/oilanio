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
import FirstOperationPersonalTable from "../../../src/components/OperationPersonalTables/FirstOperationPersonalTable";
import SecondOperationPersonalTable from "../../../src/components/OperationPersonalTables/SecondOperationPersonalTable";
import ThirdOperationPersonalTable from "../../../src/components/OperationPersonalTables/ThirdOperationPersonalTable";
import tablesStyles from '../../../styles/components/CallCenterElement.module.css'

function Admin(){
    let [cards, setCards] = useState([]);
    let [editCards, setEditCards] = useState([]);
    let [teachers, setTeachers] = useState([]);
    let [loading, setLoading] = useState(true);
    let [callCenterCards, setCallCenterCards] = useState([]);
    let [sallerCards, setSallerCards] = useState([]);
    let [firstOperationPersonalTableInfo, setFirstOperationPersonalTableInfo] = useState([])
    let [secondOperationPersonalTableInfo, setSecondOperationPersonalTableInfo] = useState([])
    let [thirdOperationPersonalTableInfo, setThirdOperationPersonalTableInfo] = useState([])

    const loadInfo = async () => {
        await axios({
            method: 'get',
            url: `${globals.productionServerDomain}/loadOperationPersonal1Info`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("auth token")}`
            }
        }).then(function(res){
            setFirstOperationPersonalTableInfo(res.data);
            console.log('OPERATION PERSONAL FIRST TABLE INFO: ' + res.data)
        });

        await axios({
            method: 'get',
            url: `${globals.productionServerDomain}/loadOperationPersonal2Info`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("auth token")}`
            }
        }).then(function(res){
            setSecondOperationPersonalTableInfo(res.data);
            console.log('OPERATION PERSONAL SECOND TABLE INFO: ' + res.data)
        });

        await axios({
            method: 'get',
            url: `${globals.productionServerDomain}/loadOperationPersonal3Info`,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("auth token")}`
            }
        }).then(function(res){
            setThirdOperationPersonalTableInfo(res.data);
            console.log('OPERATION PERSONAL THIRD TABLE INFO: ' + res.data)
        });

        setLoading(false);
    }

    useEffect( () => {
        loadInfo()
    }, [])

    return(
        <div className={styles.body}>
            <Head>
                <title>Oilan - Операционный персонал</title>
                <link rel="icon" href="/atom-icon.png" />
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
                            }}>Таблица 1</span>
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
                                    <td>Статус заключения договора</td>
                                    <td>Дата заключения договора</td>
                                    <td>Дата сбора информации</td>
                                    <td>Отправка договора</td>
                                    <td>Коментарии</td>
                                    <td>Согласование договора</td>
                                    <td>Коментарии</td>
                                    <td>Подписание договора</td>
                                    <td>Коментарии</td>
                                    <td>Дата подписания договора</td>
                                    <td>Сохранить изменения</td>
                                </tr>
                                {firstOperationPersonalTableInfo.map(item => <FirstOperationPersonalTable card={item}/>)}

                            </table>
                        </div>


                        <div className={styles.title_block} >
                            <img src="/two-books.png" style={{height: '18px'}} alt=""/>
                            <span style={{
                                fontSize: 24,
                                fontFamily: 'sans-serif',
                                fontWeight: 'bold',
                                marginLeft: 10
                            }}>Таблица 2</span>
                        </div>
                        <div className={tablesStyles.tableBody}>
                            <table border={1} cellPadding={5} style={{width: '100%'}} className={tablesStyles.table}>
                                <tr className={tablesStyles.tableTitleRow}>
                                    <td>№</td>
                                    <td>Компания</td>
                                    <td>Направление центра</td>
                                    <td>Контактное лицо</td>
                                    <td>Телефон</td>
                                    <td>Почта</td>
                                    <td>Дата подписания договора</td>
                                    <td>Дата сбора информации</td>
                                    <td>Ожидаемый результат</td>
                                    <td>Необходимые начальные знания</td>
                                    <td>Продолжительность курса</td>
                                    <td>Необходимый возраст</td>
                                    <td>Вид занятий</td>
                                    <td>Формат занятий</td>
                                    <td>Краткое описание курса</td>
                                    <td>Цена</td>
                                    <td>Расписание</td>
                                    <td>Название курса</td>
                                    {/*<td>Фото и информация о преподавателях</td>*/}
                                    <td>Краткое описание центра</td>
                                    <td>Адрес</td>
                                    <td>Инстаграм</td>
                                    <td>Фейсбук</td>
                                    <td>Сайт</td>
                                    <td>Номер телефона</td>
                                    <td>Почта</td>
                                    <td>Логотип</td>
                                    <td>Дата размещения</td>
                                    <td>Сохранить изменения</td>
                                </tr>
                                {secondOperationPersonalTableInfo.map(item => <SecondOperationPersonalTable card={item}/>)}

                            </table>
                        </div>



                        <div className={styles.title_block} >
                            <img src="/two-books.png" style={{height: '18px'}} alt=""/>
                            <span style={{
                                fontSize: 24,
                                fontFamily: 'sans-serif',
                                fontWeight: 'bold',
                                marginLeft: 10
                            }}>Таблица 3</span>
                        </div>
                        <div className={tablesStyles.tableBody}>
                            <table border={1} cellPadding={5} style={{width: '100%'}} className={tablesStyles.table}>
                                <tr className={tablesStyles.tableTitleRow}>
                                    <td>№</td>
                                    <td>Компания</td>
                                    <td>Направление центра</td>
                                    <td>Контактное лицо</td>
                                    <td>Телефон</td>
                                    <td>Почта</td>
                                    <td>Дата размещения</td>
                                    <td>Дата отправки отчета <br/> (Предоставление отчетности после 14 дней)</td>
                                    <td>Созвон с центром (коментарии)</td>
                                    <td>Повторный созвон с центром (коментарии)</td>
                                    <td>Заключение (оплачивают/нет)</td>
                                    <td>Тариф</td>
                                    <td>Отправка счета на оплату (Отправлен/нет)</td>
                                    <td>Напоминание об оплате (коментарии)</td>
                                    <td>Получение оплаты (Прошла/нет)</td>
                                    <td>Предоставление доступа к ЛК</td>
                                    <td>Дата оплаты</td>
                                </tr>
                                {thirdOperationPersonalTableInfo.map(item => <ThirdOperationPersonalTable card={item}/>)}

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
