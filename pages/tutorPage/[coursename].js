import Head from 'next/head'
import styles from './tutorPage.module.css'
import newStyles from '../tutor/course/course.module.css'
import Header from '../../src/components/Header/Header'
import Footer from "../../src/components/Footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LurkingFilterBlock from "../../src/components/LurkingFilterBlock";
import Link from "next/link";
import { SignupToCourseForm } from "../../src/components/Forms/SignupToCourseForm/SignupToCourseForm";
import ContactButton from "../../src/components/ContactButton/ContactButton";
import ModalWindow from "../../src/components/Modal/ModalWindow";
import globals from "../../src/globals";
import {useRouter} from "next/router";
import classnames from 'classnames'
import {Image} from "react-bootstrap";
import {Map, Placemark, YMaps} from "react-yandex-maps";
import ContactBlock from "../../src/components/ContactBlock";
import TutorCourseCardOnPage from "../../src/components/TutorCourseCardOnPage";
import LoadingBlock from "../../src/components/LoadingBlock";
import FeedbackForm from '../../src/components/FeedbackForm';
import FeedbacksList from '../../src/components/Feedback/FeedbacksList';
import { SubcourseOfCourseModal } from '../../src/components/SubcoursesOfCourseModal/SubcoursesOfCourseModal';

const axios = require('axios').default;

function coursePage(props) {
    const router = useRouter();
    const [tutorSerfs, setTutorSerfs] = useState([]);
    const [filters, setFilters] = useState([[], [], []]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loadingModal, setLoadingModal] = useState(false)
    const [courseCards, setCourseCards] = useState([])
    const [course, setCourse] = useState(null);
    const [coursesLoading, setCoursesLoading] = useState(false);
    const [showUps, setShowUps] = useState(false);
    const [directionName, setDirectionName] = useState([]);
    const [directionLogo, setDirectionLogo] = useState([]);
    const [fullname, setFullname] = useState('')
    const [imgSrc, setImgSrc] = useState('https://realibi.kz/file/23027.png')
    const [description, setDescription] = useState('')
    const [tutorCards, setTutorCards] = useState([]);
    const [canWorkOnline, setCanWorkOnline] = useState(true)
    const [canWorkOffline, setCanWorkOffline] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [canWorkOnDeparture, setCanWorkOnDeparture] = useState(false)
    const [address, setAddress] = useState('')
    const [cityId, SetCityId] = useState(2)
    const [cityName, setCityName] = useState('')
    const [teachingLanguage, setTeachingLanguage] = useState('')
    const [courseDetails, setCourseDetails] = useState({});
    const [courseTitle, setCourseTitle] = useState('')
    const [courseCategoryId, setCourseCategoryId] = useState(3)
    const [minAge, setMinAge] = useState(10)
    const [maxAge, setMaxAge] = useState(45)
    const [startRequirements, setStartRequirements] = useState('')
    const [expectingResults, setExpectingResults] = useState('')
    const [durationValue, setDurationValue] = useState(1)
    const [price, setPrice] = useState(99000)
    const [unitOfTime, setUnitOfTime] = useState('Урок')
    const [schedule, setSchedule] = useState('Гибкий график')
    const [durationWord, setDurationWord] = useState('Месяцев')
    const [currency, etCurrency] = useState('KZT')
    const [subcourses, setSubcourses] = useState(props?.subcourses);
    const [sertificates, setSertificates] = useState([]);
    const [cardsToShow, setCardsToShow] = useState(4);
    const [subcourseCardsToShow, setSubcourseCardsToShow] = useState(4)
    const [showDesc, setShowDesc] = useState(true)
    const [showAboutCenter, setShowAboutCenter] = useState(true)

    const [imagesBase, setImagesBase] = useState([]);
    const [showSubourses, setShowSubourses] = useState(false);
    const handleShowSubourses = () => setShowSubourses(true)
    const handleCloseSubourses = () => setShowSubourses(false)

    const addCards = () => {
        setCardsToShow(cardsToShow+4)
    };

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

    const sendApplication = (courseId, userInfo) => {

        let data = {
            city_id: props?.course.city_id,
            direction_id: courseDetails.direction_id,
            name: userInfo.fullName,
            phone: userInfo.phone,
            email: userInfo.email,
            promocode: userInfo.promocode,
            age: 0,
            isOnline: props?.course.format !== 'Offline',
            course_id: courseDetails.course_id,
            role_id: 6
        };

        axios({
            method: 'post',
            url: `${globals.productionServerDomain}/createCourseSearchTicket`,
            data: data,
            headers: {
                'Authorization': `Bearer ${globals.localStorageKeys.authToken}`
            }
        }).then(function(res){

        }).catch(() => {
            alert('Что-то пошло нетак!');
        });
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

    //ctx.query.coursename на самом деле id, не стал тратить и без того маленькое количество времени на разбирательство
    const loadData = async () => {
        console.log("Context query:");
        console.log(router.query.coursename);

        if (router.query.coursename !== undefined) {

            let courseDetailsResult = await axios.post(`${globals.productionServerDomain}/tutorCourseCards/` + router.query.coursename);
            let courseDetails = courseDetailsResult['data'][0];
            console.log('courseDetails')
            console.log(courseDetails);

            let courseResult = await axios.get(`${globals.productionServerDomain}/tutorCourses/` + courseDetails.id);

            let courseInfo = courseResult['data'][0];

            //let similarCoursesResult = await axios.get(`${globals.productionServerDomain}/courseCards/` + courseDetails.category_id);
            let subCoursesResult = await axios.post(`${globals.productionServerDomain}/tutorSubcourses/` + courseInfo.tutor_id);
            let sertificatesResult = await axios.post(`${globals.productionServerDomain}/tutorSertificates/` + courseInfo.tutor_id);

            setCourse(courseInfo);
            setCourseDetails(courseDetails);
            setSubcourses(subCoursesResult['data']);
            setSertificates(sertificatesResult['data']);
            //setSimilarCourses(similarCoursesResult['data']);
           

        }
    }

    useEffect(async () => {
        // loadData().then(() => {
        //     console.log(course)
        //     setLoadingModal(false)
        // })
        axios.get(`${globals.productionServerDomain}/getSertificates`).then(res => {
          setTutorSerfs(res.data);
        });
        axios({
            method: 'get',
            url: `${globals.productionServerDomain}/filters`,
        }).then(function(res){
            setFilters(res.data);
        }).catch(() => {
            alert('Ошибка при загрузке фильтров!');
        });
        axios.post(`${globals.productionServerDomain}/courseCategory`, {id: props?.courseDetails?.direction_id}).then(res => {
          setDirectionName(res.data.name);
          setDirectionLogo(res.data.img_src);
        });
        console.log('PROPSESIS', props)
        // axios.post(`${globals.productionServerDomain}/courseCards/` + 10).then(res => setCourseCards(res.data))
        loadData();
        searchCityValue()
        // const data = {
        //     direction: props?.courseDetails?.direction_id
        //   };
        //   let postResult = await axios.post(`${globals.productionServerDomain}/tutorCourseCardsFilterByCategory/`, data);
        //   console.log("postResult равно", postResult.data);
        //   setCourseCards(postResult.data);
          setCoursesLoading(false);
    }, [])

    const [filteredCities, setFilteredCities] = useState([])
    const [filteredCategories, setFilteredCategories] = useState([])
    const handlerForModal = () => {
        let cardsList = props.subcourses
        let categories = filters[1];
        let cities = filters[0];
        let cityName = props?.courseDetails?.city_name

        let filteredCities = cardsList?.map(el => {
            return cities?.find(el2 => {
              if (el.city_name === el2.name) {
                return el2.name
              }
            })
        })
        let filteredCities2 = cities?.find(el => {
            if (el.name == cityName) {
                let array1 = el.name
                // let array2 = Object.values(array1)
                return Array.from(array1)
            }
        })
        let filteredCitiesWrapper = [...new Set(filteredCities)]
        // const filteredCities2Wrapper = Object.values(filteredCities2)
        // let filteredCities2Wrapper = [...new Set(filteredCities2)]
        let filteredCities2Wrapper = [filteredCities]
        let filteredCities2Wrapper2 = filteredCities2Wrapper = filteredCities2
        

        let filteredCategoriesInitial = cardsList?.map(el => {
            let array1 = categories?.find(el2 => {
                if (el.category_id === el2.id) {
                    return el2.name
                }
            })
            return array1
        })
        let filteredCategoriesParent = filteredCategoriesInitial?.map(el2 => {
                return categories?.find(el3 => {
                    if (el2.parent == el3.id)
                    return el3.name
                })
            })
        let filteredCategoriesChildren = filteredCategoriesInitial?.map(el2 => {
            return categories?.find(el3 => {
                if (el2.id == el3.parent)
                return el3.name
            })
        })
        let filteredCategoriesWrapper = [...filteredCategoriesInitial, ...filteredCategoriesParent, ...filteredCategoriesChildren]
        let filteredCategoriesWrapper2 = filteredCategoriesWrapper.filter(el => {
            return el !== undefined
        }) //избавляюсь от undefined
        let filteredCategoriesWrapper3 = [...new Set(filteredCategoriesWrapper2)] //избавляюсь от дубликатов
        // просто гениальный код
        console.log("cardsList", cardsList)
        console.log("cities", cities)
        console.log("filteredCitiesWrapper", filteredCitiesWrapper)
        console.log("filteredCategoriesInitial", filteredCategoriesInitial)
        console.log('filteredCategoriesParent', filteredCategoriesParent)
        console.log('filteredCategoriesChildren', filteredCategoriesChildren)
        console.log("filteredCategoriesWrapper3", filteredCategoriesWrapper3)
        // setFilteredCities(props.courseDetails.city_name)
        setFilteredCategories(filteredCategoriesWrapper3)
        setFilteredCities(filteredCities2)
        // console.log("filteredCities2Wrapper", filteredCities2Wrapper)
      }
      useEffect(() => {
        console.log("filteredCities", filteredCities)
      }, [filteredCities])
    useEffect(() => {
        console.log("filteredCategoriesfilteredCategories", filteredCategories)
    }, [filteredCategories])
    useEffect(() => {
        console.log("filters", filters)
        handlerForModal()
    }, [filters, props.subcourses])

    useEffect(async ()=> {
        let imagesBaseResponse = await axios.get(`${globals.productionServerDomain}/imagesBase`);
        setImagesBase(imagesBaseResponse.data);
        console.log('PROPS', props)
        axios.post(`${globals.productionServerDomain}/courseCategory`, {id: props.courseDetails?.direction_id}).then(res => {
          setDirectionName(res.data.name);
          setDirectionLogo(res.data.img_src);
        });
        // axios.get(`${globals.productionServerDomain}/getPromotionBySubcourse/` + props.courseDetails?.id, {subcourseId: props.courseDetails?.id}).then(res => {
        //   setPromotion(res.data);
        // });
        console.log('category',directionName)
        console.log('ACTION',props?.courseDetails?.id)
        // loadStocks();
        loadData();
    }, imagesBase)


    // const getCards = async () => {
    //     console.log("Функция getCards");
    //     if (isTutors) {
    //       const data = {
    //         centerName: "",
    //         city: 1,
    //         direction: "1",
    //         priceFrom: "0",
    //         priceTo: "0",
    //         center: "0",
    //         isOnline: false,
    //       };
        
    //     //   let postResult = await axios.post(`${globals.productionServerDomain}/tutorCourseCardsFilter`, data);
    //       console.log("postResult равно", postResult.data);
    //       setTutorCards(postResult.data);
    //       setCoursesLoading(false);
    //     } else {
    //       const data = {
    //         direction: props.courseDetails?.direction_id
    //       };
    //       let postResult = await axios.post(`${globals.productionServerDomain}/courseCardsFilterByCategory/`, data);
    //       console.log("postResult равно", postResult.data);
    //       setCourseCards(postResult.data);
    //       setCoursesLoading(false);
    //     }
    //   };


    //   useEffect(() => {
    //     // getCards();
    //   }, [isTutors]);
      useEffect(() => {

        // setCardsList(props.subcourses)
        // console.log(cardsList)
        // setCitiesOfCards(cardsList?.map(el => el.city_name))
        // console.log(citiesOfCards, 'citiesOfCards')
    }, [])


    //window size исправление window is not defined window undefined window is undefined
    const [windowSizeFinal, setWindowSizeFinal] = useState()
    useEffect(() => {
        console.log("windowSizeFinal", windowSizeFinal)
    }, [windowSizeFinal])
    if (typeof window !== "undefined"){
        function getWindowSize() {
            const {innerWidth, innerHeight} = window;
            return {innerWidth, innerHeight};
          }
          const [windowSize, setWindowSize] = useState(getWindowSize());
          useEffect(() => {
            function handleWindowResize() {
              setWindowSize(getWindowSize());
            }
        
            window.addEventListener('resize', handleWindowResize);
        
            return () => {
              window.removeEventListener('resize', handleWindowResize);
            };
          }, []);
          useEffect(() => {
            // console.log("windowSize", windowSize)
            setWindowSizeFinal(windowSize)
          }, [windowSize])
    }
    



    return (
        <div style={{ background: '#F3F3F3' }}>
            <ModalWindow show={show} handleClose={handleClose} heading={'Оставить центру заявку'} body={<SignupToCourseForm sendApplicationCallback={sendApplication} course={courseDetails} handleClose={handleClose} />} />
            {/* <ModalWindow show={showSubourses} handleClose={handleCloseSubourses} heading={'Курсы центра'} body={<SubcourseOfCourseModal subourses={props.subcourses} handleClose={handleCloseSubourses} />} /> */}
            <Head>
                <title>Oilan - {props.course?.title}</title>
                <link rel="icon" href="/atom-icon.png" />
                <div dangerouslySetInnerHTML={{__html: googleAdds()}}/>
            </Head>

            <Header white={true}/>

            <div className={styles.container} >
            {/* <div className={showSubourses ? styles.modalShow : styles.modalHide}>
                <span className={styles.close_modal} onClick={handleCloseSubourses}></span>
                <h2>Все курсы - Репетитора {props.courseDetails.tutor_fullname}</h2>
            </div> */}
            {showSubourses ? <SubcourseOfCourseModal 
                                subcourses={props.subcourses} 
                                handleClose={handleCloseSubourses} 
                                title={props.courseDetails.tutor_fullname} 
                                categories={props.categories} 
                                cityName={props.courseDetails.city_name}
                                filteredCategories={filteredCategories}
                                filteredCities={props.filteredCities}
                                courseDetails={props.courseDetails}
                                isTutors={true}/> 
                                : ''}
                <div className={styles.wrapper_1}>
                    <div className={styles.image} style={props.courseDetails.img_src?{ backgroundImage: `url(${props.courseDetails.img_src})` }:{backgroundImage: `url('https://realibi.kz/file/510188.jpg')`}}>
                    <div className={styles.image_block}>
                    </div>
                    </div>
                    <div className={styles.infoBlock}>
                        <div className={styles.titleBlock}>
                            <p className={styles.subTitle}>Репетитор</p>
                            <h1 className={styles.courseTitle}>{props.courseDetails.tutor_fullname}</h1>
                            <div className={styles.webAndRate}>
                                <p className={styles.subTitle}></p>
                                {/* <a href={props.course.website_url ? props.course.website_url : '#!'}>
                                    {props.course.title}
                                </a> */}
                                {/* Rating */}
                            </div>
                        </div>
                        <div className={styles.infoBlock_wrapper}>
                            <div className={styles.infoBlock_first}>
                            <div className={styles.infoBlock_info}>
                                <h3>Адрес</h3>
                                <p className={styles.subTitle}>г.{props.courseDetails.city_name}</p>
                                <p className={styles.subTitle}>{props.courseDetails.address}</p>
                            </div>
                            <div className={styles.infoBlock_info}>
                                <h3>Возрастная категория</h3>
                                <p className={styles.subTitle}>{props.courseDetails.min_age ? props.courseDetails.min_age + '-' + props.courseDetails.max_age : 'Для всех возрастов'}</p>
                            </div>
                            <div className={styles.infoBlock_info}>
                                <h3>Формат занятий</h3>
                                <p className={styles.subTitle}>{props.courseDetails.can_work_offline ? 'Offline' : ''}/{props.courseDetails.can_work_online ? 'Online' : ''}</p>
                            </div>
                            <div className={styles.infoBlock_info}>
                                <h3>Язык преподования</h3>
                                <p className={styles.subTitle}>{props.courseDetails.teaching_language}</p>
                            </div>
                            <button style={{marginTop: '20px'}} className={styles.button} onClick={async () => {
                                handleShow();
                            }}>Оставить заявку</button>
                            <button className={styles.button} onClick={async () => {
                                handleShowSubourses()
                                window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
                            }}>Все курсы репетитора</button>
                            </div>
                            <div style={{display: windowSizeFinal?.innerWidth >= 1315 ? "block" : "none"}} className={styles.infoBlock_second}>
                            <button onClick={() => setShowAboutCenter(!showAboutCenter)} className={styles.showAboutCenter_button}>
                                <span>О репетиторе</span><span>{showAboutCenter?<span>&#709;</span>:<span>&#708;</span>}</span>
                            </button>
                            <div style={{display: showAboutCenter ? "block" : "none"}} className={styles.infoBlock_info}>
                                <h3>О репетиторе</h3>
                                <p className={styles.aboutCenter}>{props.courseDetails.tutor_description}</p>
                            </div>
                            <div  style={{display: sertificates.length > 0 ? "block" : "none"}} className={styles.sertificatesSection}>
                                <h3>Сертификаты и дипломы</h3>
                                <div className={styles.sertificates}>
                                    {props.sertificates.map(el => (
                                        <div className={styles.sertificate}>
                                            <img src={el.img_src}>

                                            </img>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div style={{display: windowSizeFinal?.innerWidth >= 1315 ? "none" : "block"}} className={styles.infoBlock_second}>
                            <button onClick={() => setShowAboutCenter(!showAboutCenter)} className={styles.showAboutCenter_button}>
                                <span>О репетиторе</span><span>{showAboutCenter?<span>&#709;</span>:<span>&#708;</span>}</span>
                            </button>
                            <div style={{display: showAboutCenter ? "block" : "none"}} className={styles.infoBlock_info}>
                                <h3 style={{marginBottom: '32px'}}>О репетиторе</h3>
                                <p className={styles.aboutCenter}>{props.courseDetails.tutor_description}</p>
                            </div>
                            <div style={{display: sertificates.length > 0 ? "block" : "none"}} className={styles.sertificatesSection}>
                                <h3>Сертификаты и дипломы</h3>
                                <div className={styles.sertificates}>
                                    {props.sertificates.map(el => (
                                        <div className={styles.sertificate}>
                                            <img src={el.img_src}>

                                            </img>
                                        </div>
                                    ))}
                                </div>
                            </div>
                    </div>
                </div>
                {/* <div className={styles.wrapper_2}>
                    <h2>
                        Преподаватели
                    </h2>
                    <div className={styles.teachers}>
                        {props.teachers? props.teachers.map(el => <>
                            <div className={styles.teacher_wrapper}>
                                <img src={el.img_url}></img>
                                <h3>{el.fullname}</h3>
                                <p>{el.description}</p>
                            </div>
                        </>) : ''}
                    </div>
                </div> */}
                {/* <div className={styles.wrapper_3}> */}
                {/* <div className={styles.feedbackSection}>
                        <h2>Отзывы</h2>
                        <FeedbackForm course_name={props.course.title} subcourse_id={'0'} course_id={props.courseDetails.course_id} target_role={'4'} />
                        <div className={styles.feedbacksList}>
                            <FeedbacksList feedbacks={props.feedbacksByCourseId}/>
                        </div>
                        
                        {/* <h2>Отзывы</h2>
                        <p>Оставьте ваш персональный отзыв о данном курсе</p>
                        <input placeholder='Имя Фамилия'></input>
                        <input placeholder='Опишите свой опыт работы с этим центром/репетитором'/>
                        <div className={styles.feedbackSection_bottom}>
                            <p>{props.course.title}</p> */}
                            {/* Rating */}
                        {/* </div> */}
                        {/* <button>Оставить отзыв</button> */}
                    {/* </div> */}
                    {/* <div className={styles.commentsSection}> */}

                    {/* </div> */}
                {/* </div> */} 
                <div className={styles.feedbackSection}>
                        <h2>Отзывы</h2>
                        <FeedbackForm course_name={props.courseDetails.tutor_fullname} subcourse_id={'0'} course_id={props.courseDetails.tutor_id} target_role={'6'} />
                        <div className={styles.feedbacksList}>
                            <FeedbacksList feedbacks={props.feedbacksByCourseId}/>
                        </div>
                        
                        {/* <h2>Отзывы</h2>
                        <p>Оставьте ваш персональный отзыв о данном курсе</p>
                        <input placeholder='Имя Фамилия'></input>
                        <input placeholder='Опишите свой опыт работы с этим центром/репетитором'/>
                        <div className={styles.feedbackSection_bottom}>
                            <p>{props.course.title}</p> */}
                            {/* Rating */}
                        {/* </div> */}
                        {/* <button>Оставить отзыв</button> */}
                    {/* </div> */}
                    {/* <div className={styles.commentsSection}> */}

                    {/* </div> */}
                </div>
            </div>
            
            <ContactBlock/>

            <br /><br /><br /><br />

            <Footer />
        </div>
    )
}

coursePage.getInitialProps = async (ctx) => {
    console.log("ctx")
    console.log(ctx)

    //ctx.query.coursename на самом деле id, не стал тратить и без того маленькое количество времени на разбирательство
    if(ctx.query.coursename !== undefined) {
        let courseDetailsResult = await axios.post(`${globals.productionServerDomain}/tutorCourseCards/` + ctx?.query?.coursename);
        let courseDetails = courseDetailsResult['data'][0];
        console.log('course details result', courseDetails)

        let courseResult = await axios.get(`${globals.productionServerDomain}/tutorCourses/` + courseDetails.id);
        let courseInfo = courseResult['data'][0];
        console.log(courseInfo)
        //let similarCoursesResult = await axios.get(`${globals.productionServerDomain}/courseCards/` + courseInfo.course_category_id);
        let subCoursesResult = await axios.post(`${globals.productionServerDomain}/tutorSubcourses/` + courseInfo.tutor_id);
        console.log('subcourses' , subCoursesResult.data)
        let sertificatesResult = await axios.post(`${globals.productionServerDomain}/tutorSertificates/` + courseInfo.tutor_id);
        console.log('sertificates' , sertificatesResult.data)
        let filteredCities = await axios.post(`${globals.productionServerDomain}/getFilteredCities/` + courseDetails.city_id )
        console.log("filteredCities.data", filteredCities.data)
        let categories = await axios.get(`${globals.productionServerDomain}/getCourseCategories`)
        let data = {
            course_id: courseInfo.tutor_id,
            target_role: 6
        }
        let feedbacksByCourseId = await axios.post(`${globals.productionServerDomain}/feedbacksByCourseId`, data)
        // setCourse(courseInfo);
        // setCourseDetails(courseDetails);
        // setSubcourses(subCoursesResult['data']);
        // setSimilarCourses(similarCoursesResult['data']);


        return {
            course: courseInfo,
            courseDetails: courseDetails,
            subcourses: subCoursesResult['data'],
            sertificates: sertificatesResult['data'],
            feedbacksByCourseId: feedbacksByCourseId['data'],
            categories: categories['data'],
            filteredCities: filteredCities['data'] 
            //similarCourses: similarCoursesResult['data'],
        }
    }else{
        return {};
    }
}

export default coursePage;
