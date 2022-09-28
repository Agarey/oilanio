import Head from 'next/head'
import styles from './centerPage.module.css'
import feedbackStyles from '../../styles/components/Feedback.module.css'
import Header from '../../src/components/Header/Header'
import Footer from "../../src/components/Footer/Footer";
import HorizontalLine from "../../src/components/HorizontalLine/HorizaontalLine";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import LurkingFilterBlock from "../../src/components/LurkingFilterBlock";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SimpleSlider from "../../src/components/SimpleSlider/SimpleSlider";
import CourseTeacherCard from "../../src/components/CourseTeacherCard/CourseTeacherCard";
import Link from "next/link";
import CourseCard from "../../src/components/CourseCard/CourseCard";
import ContactButton from "../../src/components/ContactButton/ContactButton";
import { SignupToCourseForm } from "../../src/components/Forms/SignupToCourseForm/SignupToCourseForm";
import ModalWindow from "../../src/components/Modal/ModalWindow";
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import globals from "../../src/globals";
import Loading from "../../src/components/Loading/Loading";
import Feedback from "react-bootstrap/Feedback";
import NewFeedback from "../../src/components/NewFeedback";
import FeedbackForm from "../../src/components/FeedbackForm";
import {useRouter} from "next/router";
import classnames from 'classnames'
import {Image} from "react-bootstrap";
import ContactBlock from "../../src/components/ContactBlock";
import { SubcourseOfCourseModal } from '../../src/components/SubcoursesOfCourseModal/SubcoursesOfCourseModal';
import FeedbacksList from '../../src/components/Feedback/FeedbacksList';

const axios = require('axios').default;

function coursePage(props) {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [showSubourses, setShowSubourses] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseSubourses = () => setShowSubourses(false)
    const handleShowSubourses = () => setShowSubourses(true)
    const [loadingModal, setLoadingModal] = useState(true);
    const [filters, setFilters] = useState([]);
    const [course, setCourse] = useState(null);
    const [directionName, setDirectionName] = useState([]);
    const [directionLogo, setDirectionLogo] = useState([]);
    const [promotion, setPromotion] = useState([]);
    const [courseDetails, setCourseDetails] = useState({});
    const [subcourses, setSubcourses] = useState(props.subcourses);
    const [similarCourses, setSimilarCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [coursesFeedback, setCoursesFeedback] = useState([]);
    const [cardsToShow, setCardsToShow] = useState(4);
    const [imagesBase, setImagesBase] = useState([]);
    const [courseCards, setCourseCards] = useState([]);
    const [feedbackStars, setFeedbackStars] = useState(1);
    const [fullname, setFullname] = useState('')
    const [feedbackMessage, setFeedbackMessage] = useState('')
    const [feedbackStarsOldState, setFeedbackStarsOldState] = useState(1);
    const [feedbackStarsComment, setFeedbackStarsComment] = useState('Ужасный курс')
    const [isTutors, setIsTutors] = useState(false);
    let [phones, setPhones] = useState(props.course?.phones.split('  '));
    const [courseDescription, setCourseDecription] = useState(props.course?.description!=null ? props.course?.description.split('|') : [])
    const [subcourseDescription, setSubcourseDecription] = useState(props.courseDetails?.description!=null ? props.courseDetails?.description.split('|') : []);
    const [tutorCards, setTutorCards] = useState([]);
    const [hideMap, setHideMap] = useState( true)
    const [coursesLoading, setCoursesLoading] = useState(false);
    const [subcourseCardsToShow, setSubcourseCardsToShow] = useState(4)
    const [showUps, setShowUps] = useState(false);
    const [promotions, setPromotions] = useState([])
    const [stocks, setStocks] = useState([]);
    const [promotionsLoaded, setPromotionsLoaded] = useState(false)
    const [feedbacks, setFeedbacks] = useState([])
    const [showAboutCenter, setShowAboutCenter] = useState(true)
    const addCards = () => {
        setCardsToShow(cardsToShow+4)
    };
    // const loadStocks = async () => {
    //     let result = await axios.post(`${globals.productionServerDomain}/loadDirectionPromotions`, {direction_id: 0});
    //     setStocks(result.data);
    //     for(let i=0;i<result.data.length;i++){
    //         if(result.data[i].center_id === courseDetails.course_id){
    //             promotions.push(result.data[i])
    //         }
    //     }
    //     setPromotions(promotions)
    //     console.log('promotions', promotions)
    //     if(result.data.length > 0){
    //         setPromotionsLoaded(true)
    //     } else {
    //         setPromotionsLoaded(false)
    //     }

    // }
    const [showPromotions, setShowPromotions] = useState(false)
    const [promotionIndex, setPromotionIndex] = useState(0)

    function prettify(num) {
        let n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
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

    function drawStar(count) {
        switch (count) {
            case 1:
                return (
                    <>
                        <img src="/star.png" alt="" className={styles.starIcon} />
                        <img src="/gray_star.png" alt="" className={styles.starIcon} />
                        <img src="/gray_star.png" alt="" className={styles.starIcon} />
                        <img src="/gray_star.png" alt="" className={styles.starIcon} />
                        <img src="/gray_star.png" alt="" className={styles.starIcon} />
                    </>
                )
                break;
            case 2:
                return (
                    <>
                        <img src="/star.png" alt="" className={styles.starIcon} />
                        <img src="/star.png" alt="" className={styles.starIcon} />
                        <img src="/gray_star.png" alt="" className={styles.starIcon} />
                        <img src="/gray_star.png" alt="" className={styles.starIcon} />
                        <img src="/gray_star.png" alt="" className={styles.starIcon} />
                    </>)
                break;
            case 3:
                return (
                    <>
                        <img src="/star.png" alt="" className={styles.starIcon} />
                        <img src="/star.png" alt="" className={styles.starIcon} />
                        <img src="/star.png" alt="" className={styles.starIcon} />
                        <img src="/gray_star.png" alt="" className={styles.starIcon} />
                        <img src="/gray_star.png" alt="" className={styles.starIcon} />
                    </>)
                break;
            case 4:
                return (
                    <>
                        <img src="/star.png" alt="" className={styles.starIcon} />
                        <img src="/star.png" alt="" className={styles.starIcon} />
                        <img src="/star.png" alt="" className={styles.starIcon} />
                        <img src="/star.png" alt="" className={styles.starIcon} />
                        <img src="/gray_star.png" alt="" className={styles.starIcon} />
                    </>)
                break;
            case 5:
                return (
                    <>
                        <img src="/star.png" alt="" className={styles.starIcon} />
                        <img src="/star.png" alt="" className={styles.starIcon} />
                        <img src="/star.png" alt="" className={styles.starIcon} />
                        <img src="/star.png" alt="" className={styles.starIcon} />
                        <img src="/star.png" alt="" className={styles.starIcon} />
                    </>)
                break;
        }

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

    const loadData = async () => {
        console.log("Context query:");
        console.log(router.query.id);

        if (router.query.id !== undefined) {

            let courseDetailsResult = await axios.post(`${globals.productionServerDomain}/courseCards/` + router.query.id);
            let courseDetails = courseDetailsResult['data'][0];
            console.log('courseDetails')
            console.log(courseDetails);

            let courseResult = await axios.get(`${globals.productionServerDomain}/courses/` + courseDetails.course_id);

            let courseInfo = courseResult['data'][0];

            //let similarCoursesResult = await axios.get(`${globals.productionServerDomain}/courseCards/` + courseDetails.category_id);
            let subCoursesResult = await axios.post(`${globals.productionServerDomain}/subcourses/` + courseInfo.id);
            let teachersResult = await axios.post(`${globals.productionServerDomain}/teachers/` + courseInfo.id);

            let feedbacksLink = `${globals.productionServerDomain}/feedbacks/${router.query.id}`;
            console.log(`feedbacks link: ` + feedbacksLink);
            let courseFeedbacksResult = await axios.get(`${globals.productionServerDomain}/feedbacks/${router.query.id}`);
            let filtersResult = await axios.get(`${globals.productionServerDomain}/filters`);

            console.log("feedbacks:");
            console.log("courseFeedbacksResult", courseFeedbacksResult.data);

            setCourse(courseInfo);
            setCourseDetails(courseDetails);
            setSubcourses(subCoursesResult['data']);
            //setSimilarCourses(similarCoursesResult['data']);
            setTeachers(teachersResult['data']);
            setFilters(filtersResult.data)
            //setCourseFeedbacks(courseFeedbacksResult['data'])
        }
    }
    // const handlerForModal = () => {
    //     let cardsList = props.subcourses
    //     let cities = filters[0];
    //     let filteredCities = cities?.find(el => {
    //         const isNormal = el.name == cardsList.map(el2 => el2.city_name)
    //         //matched = one.filter( el => two.indexOf( el ) > -1 );
    //         debugger
    //         return isNormal
    //         })
    //     console.log("cardsList", cardsList)
    //     console.log("cities", cities)
    //     console.log("filteredCities", filteredCities)
    // }
    const [filteredCities, setFilteredCities] = useState()
    const [filteredCategories, setFilteredCategories] = useState([])
    const handlerForModal = () => {
        let cardsList = props.subcourses
        let categories = filters[1];
        let cities = filters[0];

        let filteredCities = cardsList?.map(el => {
            return cities?.find(el2 => {
              if (el.city_name === el2.name) {
                return el2.name
              }
            })
        })
        let filteredCitiesWrapper = [...new Set(filteredCities)]

        let filteredCategoriesInitial = cardsList?.map(el => {
            let array1 = categories?.find(el2 => {
                if (el.category_name === el2.name) {
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
        setFilteredCities(filteredCitiesWrapper)
        setFilteredCategories(filteredCategoriesWrapper3)
      }
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
        console.log('ACTION',props.courseDetails?.id,promotion)
        // loadStocks();
        loadData();
    }, imagesBase)

    const sendApplication = (courseId, userInfo) => {

        let data = {
            city_id: props.course?.city_id,
            direction_id: courseDetails.direction_id,
            name: userInfo.fullName,
            phone: userInfo.phone,
            email: userInfo.email,
            promocode: userInfo.promocode,
            age: 0,
            isOnline: props.course?.format !== 'Offline',
            course_id: courseDetails.course_id,
            role_id: 4
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


      useEffect(() => {
        // getCards();
      }, [isTutors]);
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
                <h2>Все курсы - Образовательного центра {props.course.title}</h2>
            </div> */}
            {showSubourses ? <SubcourseOfCourseModal 
                                subcourses={props.subcourses} 
                                handleClose={handleCloseSubourses} 
                                title={props.course.title} 
                                categories={props.categories} 
                                cityName={props.courseDetails.city_name}
                                filteredCategories={filteredCategories}
                                filteredCities={filteredCities}/> 
                                : ''}
                <div className={styles.wrapper_1}>
                    <div className={styles.image} style={props.course.img_src?{ backgroundImage: `url(${props.course.img_src})` }:{backgroundImage: `url('https://realibi.kz/file/510188.jpg')`}}>
                    <div className={styles.image_block}>
                    </div>
                    </div>
                    <div className={styles.infoBlock}>
                        <div className={styles.titleBlock}>
                            <p className={styles.subTitle}>{directionName}</p>
                            <h1 className={styles.courseTitle}>{props.course.title}</h1>
                            <div className={styles.webAndRate}>
                                <p className={styles.subTitle}>Образовательный центр</p>
                                <a href={props.course.website_url ? props.course.website_url : '#!'}>
                                    {props.course.title}
                                </a>
                                {/* Rating */}
                            </div>
                        </div>
                        <div className={styles.infoBlock_wrapper}>
                            <div className={styles.infoBlock_first}>
                            <div className={styles.infoBlock_info}>
                                <h3>Адрес</h3>
                                <p className={styles.subTitle}>г.{props.courseDetails.city_name}</p>
                                <p className={styles.subTitle}>{props.course.addresses}</p>
                            </div>
                            <div className={styles.infoBlock_info}>
                                <h3>Возрастная категория</h3>
                                <p className={styles.subTitle}>{props.courseDetails.ages}</p>
                            </div>
                            <div className={styles.infoBlock_info}>
                                <h3>Вид занятий</h3>
                                <p className={styles.subTitle}>{props.courseDetails.type}</p>
                            </div>
                            <div className={styles.infoBlock_info}>
                                <h3>Формат занятий</h3>
                                <p className={styles.subTitle}>{props.courseDetails.format}</p>
                            </div>
                            <button style={{marginTop: '20px'}} className={styles.button} onClick={async () => {
                                handleShow();
                            }}>Оставить заявку</button>
                            <button className={styles.button} onClick={async () => {
                                handleShowSubourses()
                                window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
                            }}>Все курсы центра</button>
                            </div>
                            <div style={{display: windowSizeFinal?.innerWidth >= 1315 ? "block" : "none"}} className={styles.infoBlock_second}>
                            <button onClick={() => setShowAboutCenter(!showAboutCenter)} className={styles.showAboutCenter_button}>
                                <span>О центре</span><span>{showAboutCenter?<span>&#709;</span>:<span>&#708;</span>}</span>
                            </button>
                            <div style={{display: showAboutCenter ? "block" : "none"}} className={styles.infoBlock_info}>
                                <h3>О центре</h3>
                                <p className={styles.aboutCenter}>{props.course.description}</p>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div style={{display: windowSizeFinal?.innerWidth >= 1315 ? "none" : "block"}} className={styles.infoBlock_second}>
                            <button onClick={() => setShowAboutCenter(!showAboutCenter)} className={styles.showAboutCenter_button}>
                                <span>О центре</span><span>{showAboutCenter?<span>&#709;</span>:<span>&#708;</span>}</span>
                            </button>
                            <div style={{display: showAboutCenter ? "block" : "none"}} className={styles.infoBlock_info}>
                                <h3>О центре</h3>
                                <p className={styles.aboutCenter}>{props.course.description}</p>
                            </div>
                    </div>
                </div>
                <div style={{display: teachers.length > 0 ? "block" : "none"}} className={styles.wrapper_2}>
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
                </div>
                {/* <div className={styles.wrapper_3}> */}
                <div className={styles.feedbackSection}>
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
    

    if(ctx.query.id !== undefined) {
        let courseDetailsResult = await axios.post(`${globals.productionServerDomain}/courseCards/` + ctx.query.id);
        let courseDetails = courseDetailsResult['data'][0];
        console.log('course details result', courseDetails)

        let courseResult = await axios.get(`${globals.productionServerDomain}/courses/` + courseDetails?.course_id);
        let courseInfo = courseResult['data'][0];

        //let similarCoursesResult = await axios.get(`${globals.productionServerDomain}/courseCards/` + courseInfo.course_category_id);
        let subCoursesResult = await axios.post(`${globals.productionServerDomain}/subcourses/` + courseInfo.id);
        console.log('subcourses' , subCoursesResult.data)
        let teachersResult = await axios.post(`${globals.productionServerDomain}/teachers/` + courseInfo.id);
        console.log('teachers' , teachersResult.data)
        let feedbacksLink = `${globals.productionServerDomain}/feedbacks/${ctx.query.id}`;
        console.log(`feedbacks link: ` + feedbacksLink);
        let courseFeedbacksResult = await axios.get(`${globals.productionServerDomain}/feedbacks/${ctx.query.id}`);
        let categories = await axios.get(`${globals.productionServerDomain}/getCourseCategories`)
        let data = {
            course_id: courseInfo.id,
            target_role: 4
        }
        let feedbacksByCourseId = await axios.post(`${globals.productionServerDomain}/feedbacksByCourseId`, data)

        console.log("feedbacks:");
        console.log(courseFeedbacksResult.data);

        // setCourse(courseInfo);
        // setCourseDetails(courseDetails);
        // setSubcourses(subCoursesResult['data']);
        // setSimilarCourses(similarCoursesResult['data']);
        // setTeachers(teachersResult['data']);

        return {
            course: courseInfo,
            courseDetails: courseDetails,
            subcourses: subCoursesResult['data'],
            //similarCourses: similarCoursesResult['data'],
            teachers: teachersResult['data'],
            courseFeedbacks: courseFeedbacksResult['data'],
            categories: categories['data'],
            feedbacksByCourseId: feedbacksByCourseId['data'],
            data: data
        }
    }else{
        return {};
    }
}


export default coursePage;
