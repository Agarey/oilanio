import Head from 'next/head'
import styles from '../../../styles/components/content/course.module.css'
import newStyles from '../tutor/style.module.css'
import feedbackStyles from '../../../styles/components/Feedback.module.css'
import Header from '../../../src/components/Header/Header'
import Footer from "../../../src/components/Footer/Footer";
import HorizontalLine from "../../../src/components/HorizontalLine/HorizaontalLine";
import CourseCard from "../../../src/components/CourseCard/CourseCard";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SimpleSlider from "../../../src/components/SimpleSlider/SimpleSlider";
import CourseTeacherCard from "../../../src/components/CourseTeacherCard/CourseTeacherCard";
import Link from "next/link";
import ContactButton from "../../../src/components/ContactButton/ContactButton";
import { SignupToCourseForm } from "../../../src/components/Forms/SignupToCourseForm/SignupToCourseForm";
import ModalWindow from "../../../src/components/Modal/ModalWindow";
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import globals from "../../../src/globals";
import Loading from "../../../src/components/Loading/Loading";
import Feedback from "react-bootstrap/Feedback";
import NewFeedback from "../../../src/components/NewFeedback";
import FeedbackForm from "../../../src/components/FeedbackForm";
import {useRouter} from "next/router";
import classnames from 'classnames'
import {Image} from "react-bootstrap";
import ContactBlock from "../../../src/components/ContactBlock";

const axios = require('axios').default;

function coursePage(props) {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loadingModal, setLoadingModal] = useState(true);

    const [course, setCourse] = useState(null);
    const [showCourseDesc, setShowCourseDesc] = useState(true)

    const [courseDetails, setCourseDetails] = useState({});
    const [subcourses, setSubcourses] = useState(props.subcourses);
    const [similarCourses, setSimilarCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [coursesFeedback, setCoursesFeedback] = useState([]);

    const [imagesBase, setImagesBase] = useState([]);

    const [feedbackStars, setFeedbackStars] = useState(1);
    const [fullname, setFullname] = useState('')
    const [feedbackMessage, setFeedbackMessage] = useState('')
    const [feedbackStarsOldState, setFeedbackStarsOldState] = useState(1);
    const [feedbackStarsComment, setFeedbackStarsComment] = useState('Ужасный курс')

    let [phones, setPhones] = useState(props.course.phones.split('  '));
    const [courseDescription, setCourseDecription] = useState(props.course.description!=null ? props.course.description.split('|') : [])
    const [subcourseDescription, setSubcourseDecription] = useState(props.courseDetails.description!=null ? props.courseDetails.description.split('|') : []);
 
    const [hideMap, setHideMap] = useState( true)

    const [subcourseCardsToShow, setSubcourseCardsToShow] = useState(4)

    const [promotions, setPromotions] = useState([])
    const [stocks, setStocks] = useState([]);
    const [promotionsLoaded, setPromotionsLoaded] = useState(false)
    const loadStocks = async () => {
        let result = await axios.post(`${globals.productionServerDomain}/loadDirectionPromotions`, {direction_id: 0});
        setStocks(result.data);
        for(let i=0;i<result.data.length;i++){
            if(result.data[i].center_id === courseDetails.course_id){
                promotions.push(result.data[i])
            }
        }
        setPromotions(promotions)
        console.log('promotions', promotions)
        if(result.data.length > 0){
            setPromotionsLoaded(true)
        } else {
            setPromotionsLoaded(false)
        }

    }
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

            console.log("feedbacks:");
            console.log(courseFeedbacksResult.data);

            setCourse(courseInfo);
            setCourseDetails(courseDetails);
            setSubcourses(subCoursesResult['data']);
            //setSimilarCourses(similarCoursesResult['data']);
            setTeachers(teachersResult['data']);
            //setCourseFeedbacks(courseFeedbacksResult['data'])
        }
    }

    useEffect(async ()=> {
        // let imagesBaseResponse = await axios.get(`${globals.productionServerDomain}/imagesBase`);
        // setImagesBase(imagesBaseResponse.data);

        loadStocks();
        loadData();
    }, imagesBase)

    const sendApplication = (courseId, userInfo) => {

        let data = {
            city_id: props.course.city_id,
            direction_id: courseDetails.direction_id,
            name: userInfo.fullName,
            phone: userInfo.phone,
            email: userInfo.email,
            promocode: userInfo.promocode,
            age: 0,
            isOnline: props.course.format !== 'Offline',
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

    return (
        <div style={{ background: 'white' }}>
            <ModalWindow show={show} handleClose={handleClose} heading={'Оставить центру заявку'} body={<SignupToCourseForm sendApplicationCallback={sendApplication} course={courseDetails} handleClose={handleClose} />} />

            <Head>
                <title>Oilan - {props.course.title}</title>
                <link rel="icon" href="/atom-icon.png" />
                <div dangerouslySetInnerHTML={{__html: googleAdds()}}/>
            </Head>

            <Header white={true}/>
            {/*<ContactButton />*/}

            {/*<div className={styles.headerImage}*/}
            {/*     style={{*/}
            {/*         backgroundImage: `url(${props.course.background_image_url})`*/}
            {/*     }}*/}
            {/*>*/}

            {/*</div>*/}




            <div className={newStyles.container} >

                <div className={styles.headerBlock}>
                    <div className={newStyles.image} style={props.course.img_src?{ backgroundImage: `url(${props.course.img_src})` }:{backgroundImage: `url('https://realibi.kz/file/510188.jpg')`}}>
                        {
                            promotionsLoaded && promotions.length>0 && (
                                <>
                                    <div className={classnames(styles.promotionStar, showPromotions ? styles.whiteStar : styles.violetStar)}
                                        onClick={()=>setShowPromotions(!showPromotions)}
                                    >
                                        {
                                            showPromotions ? (
                                                <span className={styles.starTitle} style={{color: 'black', fontSize: 24}}>X</span>
                                            ) : (
                                                <>
                                                    <span className={styles.starTitle}>АКЦИЯ</span>
                                                    <span className={styles.starSubtitle}>(нажми)</span>
                                                </>
                                            )
                                        }

                                    </div>
                                    {
                                        showPromotions && (
                                            <div className={styles.promotionBlock}>
                                                <div style={{width: '100%'}}>
                                                    <div className={styles.promotionItem}>
                                                        <span className={styles.promotionTitle}>Акция</span>
                                                        <span className={styles.promotionSubtitle}>{promotions[promotionIndex].text}</span>
                                                    </div> <br/>
                                                    <div className={styles.promotionItem}>
                                                        <span className={styles.promotionTitle}>Что нужно сделать?</span>
                                                        <span className={styles.promotionSubtitle}>Введите промокод <b>“{promotions[promotionIndex].promocode}”</b>, в поле <b>“Промокод”</b>, когда будете оставлять заявку этому центру</span>
                                                    </div>
                                                </div>

                                                {
                                                    promotions.length>1 && (
                                                        <div className={styles.nextPromotionBtnBody}>
                                                            <span className={styles.nextPromotionBtn}
                                                                onClick={()=>{
                                                                    if(promotionIndex===promotions.length-1){
                                                                        setPromotionIndex(0)
                                                                    } else {
                                                                        setPromotionIndex(promotionIndex+1)
                                                                    }
                                                                }}
                                                            >Следующая акция</span>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                </>
                            )
                        }
                    </div>
                    <div className={classnames(newStyles.headerItemThird)}>
                        <div className={newStyles.infoList}>
                            <span className={newStyles.fullname}>{courseDetails.title ==='test' ? '' : courseDetails.title}</span> <br/> <br/>
                            <div className={newStyles.infoItem}>
                                <span className={newStyles.leftSubTitle}>Центр</span>
                                <span className={newStyles.leftValue}>{props.course.title}</span>
                            </div>
                            <div className={newStyles.infoItem}>
                                <span className={newStyles.leftSubTitle}>Адрес</span>
                                <span className={newStyles.leftValue}>{props.course.addresses}</span>
                            </div>
                            <div className={newStyles.infoItem}>
                                <span className={newStyles.leftSubTitle}>Возрастная категория</span>
                                <span className={newStyles.leftValue}>{courseDetails.ages}</span>
                            </div>
                            <div className={newStyles.infoItem}>
                                <span className={newStyles.leftSubTitle}>Расписание</span>
                                <span className={newStyles.leftValue}>{courseDetails.schedule}</span>
                            </div>
                            <div className={newStyles.infoItem}>
                                <span className={newStyles.leftSubTitle}>Формат занятий:</span>
                                <span className={newStyles.leftValue}>{courseDetails.format}</span>
                            </div>
                            <div className={newStyles.infoItem}>
                                <span className={newStyles.leftSubTitle}>Тип занятий:</span>
                                <span className={newStyles.leftValue}>{courseDetails.type}</span>
                            </div>
                            <br/>
                            <div className={newStyles.infoItem}>
                                <span
                                    className={newStyles.leftSubTitle}
                                    style={{
                                        fontSize: 20
                                    }}
                                >Цена</span>
                                <span
                                    className={newStyles.leftValue}
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 1000
                                    }}
                                >{prettify(+courseDetails.price)} {courseDetails.currency}/{courseDetails.unit_of_time}</span>
                            </div>

                            <div style={{
                                display: 'flex',
                                width: '100%',
                                marginTop: 10
                            }}>
                                <div className={styles.enableOnMobile}>
                                    <button className={styles.button} onClick={async () => {
                                        handleShow();
                                    }}>Оставить заявку</button>
                                </div>
                                <div className={styles.disableOnMobile}>
                                    <button className={styles.button} onClick={async () => {
                                        handleShow();
                                    }}>Оставить заявку</button>
                                </div>
                                <a
                                    onClick={() => {
                                        ym(78186067,'reachGoal','whatsapp_click_center');
                                        axios.post(globals.productionServerDomain + '/logUserClick',{
                                            course_id: courseDetails.course_id,
                                            card_id: courseDetails.id,
                                            event_name: 'whatsapp'
                                        })
                                    }}
                                    href={`https://api.whatsapp.com/send?phone=${props.course.phones}&text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D0%BF%D0%B8%D1%88%D1%83%20%D0%92%D0%B0%D0%BC%20%D1%81%20%D0%BF%D0%BB%D0%B0%D1%82%D1%84%D0%BE%D1%80%D0%BC%D1%8B%20Oilan, `}>
                                    <div
                                        style={{
                                            height: '100%',
                                            width: 45,
                                            marginLeft: 10,
                                            borderRadius: 8,
                                            backgroundImage: `url('/whatsapp_logo.png')`,
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'contain',
                                            boxShadow: '0 0 1px grey',
                                            backgroundColor: '#23d366'
                                        }}
                                    >
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className={newStyles.headerItemSecond}>
                        <button className={styles.showBtn} onClick={()=>setShowCourseDesc(!showCourseDesc)}>
                            {showCourseDesc ? 'Скрыть подробную информацию' : 'Показать подробную информацию'}
                            <Image src={'/Vector-4.png'} style={{height: 6, marginLeft: 5}} className={showCourseDesc ? styles.rotateBtn : null}/>
                        </button>

                        <div style={{width: '100%'}} className={classnames(styles.opacityZero, showCourseDesc && styles.opacityFull)}>
                            <span className={newStyles.subTitle} style={{fontSize: 18}}>О курсе:</span>
                            <div className={newStyles.infoList}>
                                <span className={newStyles.value}>
                                    {
                                        subcourseDescription.map(item => {
                                            return(
                                                <>
                                                    {item}
                                                    <br/>
                                                </>
                                            )
                                        })
                                    }
                                </span>
                            </div> <br/>
                            <span className={newStyles.subTitle} style={{fontSize: 18}}>О центре:</span>
                            <div className={newStyles.infoList}>
                                <span className={newStyles.value}>
                                    {
                                        courseDescription.map(item => {
                                            return(
                                                <>
                                                    {item}
                                                    <br/>
                                                </>
                                            )
                                        })
                                }</span>
                            </div>
                        </div>
                        <br/>
                    </div>
                </div>
            </div>

            <div style={{ width: '100%', marginTop: '20px' }}>
                {
                    props.teachers.length!=0 ?
                        (
                            <>
                                <div className={styles.titleBlock} style={{margin: '20px 0'}}>
                                    <Image src={'/teachers_title.png'} className={styles.titleImg}/>
                                    <span className={styles.titleTitle}>Преподаватели центра</span>
                                </div>

                                <div style={{width: '100%', display: 'flex', justifyContent: 'center', padding: '0 5%', boxSzing: 'border-box'}}>
                                    <div className={styles.allCoursesTab} >
                                        {props.teachers.map(item => <CourseTeacherCard teacher={item} />)}
                                    </div>
                                </div>
                            </>
                        ) :
                        null
                }
            </div>

            {courseDetails.isonline ? null : (
                courseDetails.longitude!=0 && (
                    <>
                        <div className={styles.titleBlock} style={{margin: '20px 0'}}>
                            <Image src={'/Location.png'} className={styles.titleImg}/>
                            <span className={styles.titleTitle}>Местоположение</span>
                        </div>

                        <div className={newStyles.container} style={{height: hideMap ? '100px' : '65vh'}}>
                            <YMaps className={styles.ymaps}>
                                <Map width={'100%'} height={hideMap ? '100px' : '65vh'} defaultState={{ center: [props.courseDetails.latitude, props.courseDetails.longitude], zoom: 16 }} >
                                    <Placemark geometry={[props.courseDetails.latitude, props.courseDetails.longitude]} />
                                </Map>
                            </YMaps>
                        </div>

                        <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: 10}}>
                        <span className={styles.spanButton} onClick={()=>{
                            setHideMap(!hideMap)
                        }}>{hideMap ? 'Раскрыть карту' : 'Скрыть карту'}</span>
                        </div>
                    </>
                )
            )}

            {
                imagesBase.length!=0 && (
                    subcourses.length!=0 && (
                        <>
                            <div className={styles.titleBlock} style={{margin: '10px 0'}}>
                                <Image src={'/Fist-Bump-Gesture.png'} className={styles.titleImg}/>
                                <span className={styles.titleTitle}>Так же {props.course.title} предлагает:</span>
                            </div>

                            <div className={styles.container} style={{marginTop: 30}}>
                                <div style={{width: '100%'}}>
                                    <div className={styles.courses_block}>
                                        {
                                            props.subcourses.slice(0, subcourseCardsToShow).map(course => (
                                                <div className={styles.card_item}>
                                                    <CourseCard coverImage={imagesBase[Math.floor(Math.random() * imagesBase.length)].src} setLoadingModal={setLoadingModal} course={course} showApplicationModal={true}/>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                {
                                    subcourseCardsToShow >= props.subcourses.length ? null : (
                                        <div className={styles.backToCoursesPageButtonBody}>
                                            <a className={styles.backToCoursesPageButton} onClick={()=>{setSubcourseCardsToShow(subcourseCardsToShow+4)}}>Ещё</a>
                                        </div>
                                    )
                                }
                            </div>
                        </>
                    )
                )
            }

            <div className={styles.titleBlock} style={{margin: '20px 0'}}>
                <Image src={'/feedback_star.png'} className={styles.titleImg}/>
                <span className={styles.titleTitle}>Отзывы</span>
            </div>
            <div className={newStyles.container}>
                <FeedbackForm subcourseID={props.courseDetails.id}/>
                <br/>
                <div className={styles.feedbacksWrapper}>
                    {
                        props.courseFeedbacks !== null && props.courseFeedbacks.length > 0 ?
                            props.courseFeedbacks.map( item => <NewFeedback feedback={item}/>) : null
                    }
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

        let courseResult = await axios.get(`${globals.productionServerDomain}/courses/` + courseDetails.course_id);
        let courseInfo = courseResult['data'][0];

        //let similarCoursesResult = await axios.get(`${globals.productionServerDomain}/courseCards/` + courseInfo.course_category_id);
        let subCoursesResult = await axios.post(`${globals.productionServerDomain}/subcourses/` + courseInfo.id);
        console.log('subcourses' , subCoursesResult.data)
        let teachersResult = await axios.post(`${globals.productionServerDomain}/teachers/` + courseInfo.id);
        console.log('teachers' , teachersResult.data)
        let feedbacksLink = `${globals.productionServerDomain}/feedbacks/${ctx.query.id}`;
        console.log(`feedbacks link: ` + feedbacksLink);
        let courseFeedbacksResult = await axios.get(`${globals.productionServerDomain}/feedbacks/${ctx.query.id}`);

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
            courseFeedbacks: courseFeedbacksResult['data']
        }
    }else{
        return {};
    }
}

export default coursePage;
