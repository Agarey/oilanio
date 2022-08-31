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
import { object } from 'prop-types';

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

    let [courseCardsTable, setCourseCardsTable] = useState(false);
    let [tutorCardsTable, setTutorCardsTable] = useState(false)
    const [allCardsList, setAllCardsList] = useState([]);
    const [tutorAllCardsList, setTutorAllCardsList] = useState([]);
    const [uniqueCards, setUniqueCards] = useState([])
    const [selectedSubCourseTitle, setSelectedSubCourseTitle] = useState([])
    const [selectedSubCourseClicksCount, setSelectedSubCourseClicksCount] = useState('')

    const [tutorCardsStatistics, setTutorCardsStatistics] = useState()

    const [allTutorsList, setAllTutorsList] = useState([])
    const [courseCardsStatistics, setCourseCardsStatistics] = useState([])

    const [cardsOfCourseAndTutorCardsTable, setCardsOfCourseAndTutorCardsTable] = useState(false)
    const [cardsOfCourseAndTutor, setcardsOfCourseAndTutor] = useState([])

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

        axios.get(`${globals.productionServerDomain}/tutors`).then(res => { setTutors(res.data) 
        setAllTutorsList(res.data)})

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



    // Отчет по карточкам центров и репетиторов
    useEffect(async () => {
      await loadCourseCards();
      await loadTutorCourseCards();
    }, []);
    const loadCourseCards = async () => {
      let result = await axios
        .get(`${globals.productionServerDomain}/courseCards/`)
        .then((result) => {
          setAllCardsList(result.data);
        });
    };
    const loadTutorCourseCards = async () => {
        let result = await axios
          .get(`${globals.productionServerDomain}/tutorCourseCards/`)
          .then((result) => {
            setTutorAllCardsList(result.data);
          });
      };

    const cardsOfTutor = () => {
        const cardsOfTutor = tutorAllCardsList?.map(el => el.tutorsId)
        let container = {}
        const tutorAllCardsListOnlyCategory = tutorAllCardsList?.map(el => [['courseCategoryName', el.courseCategory], ['id', el.tutorsId]]).map(Object.fromEntries)
        let hash = Object.create(null);
        let AllCardsListOnlyCategorySorted = tutorAllCardsListOnlyCategory?.reduce(function (r, o) {
            if (!hash[o.id]) {
                hash[o.id] = { id: o.id, categories: [] };
                r.push(hash[o.id]);
            }
            hash[o.id].categories.push({ courseCategoryName: o.courseCategoryName });
            return r;
        }, []);
        let uniqueCategoriesOfCards = AllCardsListOnlyCategorySorted.map(el => {
            let AllCardsListOnlyCategorySortedToString = el.categories.map(el => {
                return el['courseCategoryName']
            })
            let uniqueCategories = AllCardsListOnlyCategorySortedToString.filter((element, index) => {
                return AllCardsListOnlyCategorySortedToString.indexOf(element) === index;
            });
            // console.log("uniqueCategories", uniqueCategories)
            let uniqueCategoriesPlacing = el.categories = uniqueCategories
            let uniqueCategoriesPlacingId = el.id = el.id
            let uniqueCategoriesPlacingWrapper = [uniqueCategoriesPlacing, uniqueCategoriesPlacingId]
            
            let uniqueCategoriesPlacingFinal = {'categories': uniqueCategoriesPlacing.join(', '), 'id': uniqueCategoriesPlacingId}
           
            return uniqueCategoriesPlacingFinal
        })

        const cardsOfTutorCounting = cardsOfTutor.reduce((acc, el) => {
          acc[el] = (acc[el] || 0) + 1;
        //   container[acc]
          return acc;
        }, {});
        // let containerId = Object.keys(cardsOfTutorCounting)
        // let containerCount = cardsOfTutorCounting
        // let test = containerId.map(el => container[{"id": el[0]}])
        const array2 = Object.entries(cardsOfTutorCounting).map(([k,v]) => [['id', k], ['countOfCards', v]]).map(Object.fromEntries); 

        const arr3 = allTutorsList?.map((y) => Object.assign(y, array2?.find((x) => x.id == y.id)));
        const arr4 = arr3?.map((y) => Object.assign(y, tutorAllCardsListOnlyCategory?.find((x) => x.id == y.id)))
        const arr5 = arr3?.map((y) => Object.assign(y, uniqueCategoriesOfCards?.find((x) => x.id == y.id)))
        console.log("cardsOfCourse", arr5)

        console.log("allCardsList", allCardsList)
        console.log("tutorAllCardsList", tutorAllCardsList)
        console.log("tutorAllCardsListOnlyCategory", tutorAllCardsListOnlyCategory)
        setTutorCardsStatistics(arr5)
    }

    const cardsOfCourse = () => {
        const cardsOfCenter = allCardsList?.map(el => el.course_id)
        let container = {}
        const AllCardsListOnlyCategory = allCardsList?.map(el => [['courseCategoryName', el.category], ['id', el.course_id]]).map(Object.fromEntries)
        let hash = Object.create(null);
        let AllCardsListOnlyCategorySorted = AllCardsListOnlyCategory?.reduce(function (r, o) {
            if (!hash[o.id]) {
                hash[o.id] = { id: o.id, categories: [] };
                r.push(hash[o.id]);
            }
            hash[o.id].categories.push({ courseCategoryName: o.courseCategoryName });
            return r;
        }, []);
        console.log("AllCardsListOnlyCategorySorted", AllCardsListOnlyCategorySorted);
        let uniqueCategoriesOfCards = AllCardsListOnlyCategorySorted.map(el => {
            let AllCardsListOnlyCategorySortedToString = el.categories.map(el => {
                return el['courseCategoryName']
            })
            let uniqueCategories = AllCardsListOnlyCategorySortedToString.filter((element, index) => {
                return AllCardsListOnlyCategorySortedToString.indexOf(element) === index;
            });
            // console.log("uniqueCategories", uniqueCategories)
            let uniqueCategoriesPlacing = el.categories = uniqueCategories
            let uniqueCategoriesPlacingId = el.id = el.id
            let uniqueCategoriesPlacingWrapper = [uniqueCategoriesPlacing, uniqueCategoriesPlacingId]
            // let uniqueCategoriesPlacingFinal = Object.entries(uniqueCategoriesPlacingWrapper).map(([k, v]) => [['categoriesUnique', k], ['id', v]]).map(Object.fromEntries)
            // let uniqueCategoriesPlacingFinal = [['categories', uniqueCategoriesPlacing], ['id', uniqueCategoriesPlacingId]].map(Object.fromEntries)
            let uniqueCategoriesPlacingFinal = {'categories': uniqueCategoriesPlacing.join(', '), 'id': uniqueCategoriesPlacingId}
            // .map(Object.fromEntries)
            return uniqueCategoriesPlacingFinal
        })
        console.log("uniqueCategoriesOfCards", uniqueCategoriesOfCards)
        
        const cardsOfCourseCounting = cardsOfCenter.reduce((acc, el) => {
          acc[el] = (acc[el] || 0) + 1;

          return acc;
        }, {});
        const array2 = Object.entries(cardsOfCourseCounting).map(([k,v]) => [['id', k], ['countOfCards', v]]).map(Object.fromEntries); 
        const arr3 = courses?.map((y) => Object.assign(y, array2?.find((x) => x.id == y.id)));
        const arr4 = arr3?.map((y) => Object.assign(y, AllCardsListOnlyCategory?.find((x) => x.id == y.id)))
        const arr5 = arr3?.map((y) => Object.assign(y, uniqueCategoriesOfCards?.find((x) => x.id == y.id)))
        console.log("cardsOfCourse", arr5)
        setCourseCardsStatistics(arr5)
    }


    const cardsOfCourseAndTutorFunction = () => {
        const courseCards = allCardsList?.map(el => [['id', el.course_id], ['isCenter', true], ['teachingLanguage', ''], ['city', el.city], ['departure', ''], ['cardId',  el.id], ['name', el.course_title], ['title', el.title], ['price', el.price], ['unit_of_time', el.unit_of_time], ['description', el.description], ['schedule', el.schedule], ['duration', el.duration], ['ages', el.ages], ['min_age', '' ], ['max_age', ''], ['format', el.format], ['category', el.category], ['expected_result', el.expected_result], ['start_requirements', el.start_requirements], ['type', el.type]]).map(Object.fromEntries)
        const tutorCards = tutorAllCardsList?.map(el => [['id', el.tutorsId], ['isCenter', false], ['teachingLanguage', el.teaching_language], ['city', el.city], ['departure', el.canWorkOnDeparture], ['cardId',  el.id], ['name', el.tutorsName], ['title', el.title], ['price', el.price], ['unit_of_time', el.unit_of_time], ['description', ''], ['schedule', el.schedule], ['duration_value', el.duration_value], ['duration_word', el.duration_word], ['ages', ''], ['min_age', el.min_age ], ['max_age', el.max_age], ['format', el.is_online], ['category', el.courseCategory], ['expected_result', el.expecting_results], ['start_requirements', el.start_requirements], ['type', '']]).map(Object.fromEntries)
        // console.log('tutorCards', tutorCards);
        // console.log("tutorAllCardsList", tutorAllCardsList);
        const cardsOfCourseAndTutorWrapping = [...courseCards, ...tutorCards].sort((a, b) => a.id > b.id ? 1 : -1);
        console.log("cardsOfCourseAndTutorWrapping", cardsOfCourseAndTutorWrapping);
        setcardsOfCourseAndTutor(cardsOfCourseAndTutorWrapping)
        return cardsOfCourseAndTutorWrapping
        // console.log('tutors', tutors)
    } 

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
                            <div className={styles.title_block}>
                                <img src="/two-books.png" style={{height: '18px'}} alt=""/>
                                <span style={{
                                    fontSize: 24,
                                    fontFamily: 'sans-serif',
                                    fontWeight: 'bold',
                                    marginLeft: 10
                                }}>Глобальный отчет по карточкам</span>
                                <button onClick={() =>{
                                    setCardsOfCourseAndTutorCardsTable(!cardsOfCourseAndTutorCardsTable)
                                    cardsOfCourseAndTutorFunction()
                                }}>{tutorCardsTable?'Скрыть':'Раскрыть'}</button>
                            </div>
                            <div 
                            className={styles.coursesBlock} 
                            style={{display: cardsOfCourseAndTutorCardsTable?'block':'none'}}>
                            <table className={styles.applicationsTable} border={2}>
                            <tr>
                                <th>ID центра/репа</th>
                                <th>Категория</th>
                                <th>Язык преподавания</th>
                                <th>Правильное название</th>
                                <th>Город</th>
                                <th>Может работать на выезд</th>
                                <th>ID карточки</th>
                                <th>Название курса</th>
                                <th>Цена</th>
                                <th>Период</th>
                                <th>Описание</th>
                                <th>Расписание</th>
                                <th>Длительность курса</th>
                                <th>Возрастная категория</th>
                                <th>Формат (Offline/Online)</th>
                                <th>Категория</th>
                                <th>Результат обучения</th>
                                <th>Входной уровень</th>
                                <th>Тип занятий</th>
                            </tr>

                                {cardsOfCourseAndTutor?.map(item => (
  

                                <tbody>

                                    <tr className={styles.table_row}>
                                            <td>{item.id}</td>
                                            <td>{item.isCenter ? 'Центр' : 'Репетитор'}</td>
                                            <td>{item.teachingLanguage}</td>
                                            <td>{item.name}</td>
                                            <td>{item.city}</td>
                                            <td>{item.departure}</td>
                                            <td>{item.cardId}</td>
                                            <td>{item.title}</td>
                                            <td>{item.price}</td>
                                            <td>{item.unit_of_time}</td>                            
                                            <td>{item.description}</td>
                                            <td>{item.schedule}</td>
                                            <td>{item.duration ? item.duration : item.duration_value + item.duration_word}</td>
                                            <td>{item.ages ? item.ages : item.min_age + '-' + item.max_age }</td>
                                            <td>{item.isCenter ? item.format : (item.format ? 'Online' : 'Offline')}</td>
                                            <td>{item.category}</td>
                                            <td>{item.expected_result}</td>
                                            <td>{item.start_requirements}</td>
                                            <td>{item.type}</td>
                                    </tr>

                                </tbody>

                                ))}

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
                            }}>Глобальный отчет по карточкам репетиторов</span>
                            <button onClick={() =>{
                                setTutorCardsTable(!tutorCardsTable)
                                console.log("allCardsList", tutorAllCardsList)
                                console.log("tutors", tutors)
                                
                                cardsOfTutor()
                                console.log("cardsOfTutor", cardsOfTutor)
                            }}>{tutorCardsTable?'Скрыть':'Раскрыть'}</button>
                        </div>
                        <div 
                            className={styles.coursesBlock} 
                            style={{display: tutorCardsTable?'block':'none'}}>
                            <table className={styles.applicationsTable} border={2}>
                            <tr>
                                <th>Id</th>
                                <th>Репетитор</th>
                                <th>Телефон</th>
                                <th>Дата регистрации</th>
                                <th>Направления</th>
                                <th>Количество карточек</th>
                                <th>Количество заявок</th>
                            </tr>

                                {tutorCardsStatistics?.map(item => (
  

                                <tbody>

                                    <tr className={styles.table_row}>
                                            <td>{item.id}</td>
                                            <td>{item.fullname}</td>
                                            <td>{item.phone_number}</td>
                                            <td>{item.last_payment_date}</td>
                                            <td>{item.categories}</td>
                                            <td>{item.countOfCards}</td>
                                            <td>{item.count}</td>
                                    </tr>

                                </tbody>

                                ))}

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
                            }}>Глобальный отчет по карточкам центров</span>
                            <button onClick={() =>{
                                setCourseCardsTable(!courseCardsTable)
                                cardsOfCourse()
                                console.log("allCardsList", allCardsList)
                            }}>{courseCardsTable?'Скрыть':'Раскрыть'}</button>
                        </div>
                        <div 
                            className={styles.coursesBlock} 
                            style={{display: courseCardsTable?'block':'none'}}>
                            <table className={styles.applicationsTable} border={2}>
                                <tr>
                                    <th>Id</th>
                                    <th>Центр</th>
                                    <th>Телефон</th>
                                    <th>Дата регистрации</th>
                                    <th>Направления</th>
                                    <th>Количество карточек</th>
                                    <th>Количество заявок</th>
                                </tr>
                                <tbody>
                                {
                                    courseCardsStatistics.map(item => (
                                        <tr className={styles.table_row}>
                                            <td>{item.id}</td>
                                            <td>{item.title}</td>
                                            <td>{item.phones}</td>
                                            <td>{item.last_payment_date}</td>
                                            <td>{item.categories}</td>
                                            <td>{item.countOfCards}</td>
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
                    {/* <div className={styles.container}>
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
                    </div> */}
                    {/* <div className={styles.container}>
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
                    </div> */}

                    {/* Количество заявок по репетиторам и центрам */}

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
                                let selectedCourse = courses.find(el => el.title == selectedCourseTitle); 
                                let selectedCourseId = selectedCourse.id
                                let token = JSON.parse(localStorage.getItem(globals.localStorageKeys.authToken)).token;
                                await axios({
                                    method: 'post',
                                    data:{
                                        centerId: selectedCourseId
                                    },
                                    url: `${globals.productionServerDomain}/getClickStatistics`,
                                    headers: {
                                        'Authorization': `Bearer ${token}`
                                    }
                                }).then(function(result) {
                                    let cardClicks = [];
                                    result.data.map((item) => {
                                      cardClicks.push(item.card_id);
                                    })
                            
                                    let uniqueCards = [...new Set(cardClicks)];
                            
                                    for(let i = 0; i < uniqueCards.length; i++){
                                      let count = 0;
                                      let cardTitle = null;
                                      let cardCategoryName = null;
                                      let cardId = uniqueCards[i];
                                      let cardPrice = null;
                                      let cardCurrency = null;
                                      let cardUnitOfTime = null;
                                      let cardIsOnline = null;
                            
                                      for(let click of result.data){
                                        if(click.card_id === cardId){
                                          count++;
                                          cardTitle = click.title;
                                          cardCategoryName = click.name;
                                          cardPrice = click.price;
                                          cardCurrency = click.currency;
                                          cardUnitOfTime = click.unit_of_time;
                                          cardIsOnline = click.isonline;
                                        }
                                      }
                            
                                      uniqueCards[i] = {
                                        id: cardId,
                                        title: cardTitle,
                                        categoryName: cardCategoryName,
                                        clicksCount: count,
                                        price: cardPrice,
                                        currency: cardCurrency,
                                        unitOfTime: cardUnitOfTime,
                                        isOnline: cardIsOnline
                                      }
                                    }
                            
                                    uniqueCards = uniqueCards.sort((a, b) => {
                                      if (a.clicksCount > b.clicksCount) {
                                        return -1;
                                      }else {
                                        return 1;
                                      }
                                    });
                                    setUniqueCards(uniqueCards)
                                    console.log("uniqueCards", uniqueCards);
                                    console.log("result.data", result.data)
                                    console.log("courses", courses)
                                    console.log("selectedCourseId", selectedCourseId)
                                  });
                            }}>Посмотреть</button>

                        </div>
                        <select style={{display: clicker?'block':'none'}} value={selectedSubCourseTitle} 
                            onChange={e => {setSelectedSubCourseTitle(e.target.value)
                                let selectedSubCourseClicksCount = (uniqueCards?.find(el => el.title == selectedSubCourseTitle))
                                setSelectedSubCourseClicksCount(selectedSubCourseClicksCount.clicksCount)
                            console.log("selectedSubCourseTitle", selectedSubCourseClicksCount)}}>
                                {uniqueCards.map(item => <option value={item.title}>{item.title}</option>)}
                        </select>

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
                                <td>{selectedSubCourseClicksCount}</td>
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
