import styles from '../../../styles/components/CourseCard.module.css'
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {SignupToCourseForm} from "../Forms/SignupToCourseForm/SignupToCourseForm";
import ModalWindow from "../Modal/ModalWindow";
import classnames from 'classnames';
import globals from "../../globals";
import Image from "next/image";

const axios = require('axios').default;

export default function CourseCard(props) {
    const [filters, setFilters] = useState([]);
    const [citiesList, setCitiesList] = useState([])

    useEffect( async ()=>{
        await axios.get(`${globals.productionServerDomain}/filters`).then(res => {
            setFilters(res.data);
            console.log(res);
            setCitiesList(filters[0]);
        })
    }, []);

    let cityId = props.course.city_id

    const [cityName, setCityName] = useState([])

    useEffect( async () => {
        let city = await filters[0]?.find(el => el.id == cityId)
        console.log("CITY>>>", city)
        setCityName(city?.name)
    }, [citiesList])

    const [show, setShow] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [showPhoneNumber, setShowPhoneNumber] = useState(false);
    const [showContacts, setShowContacts] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [promotions, setPromotions] = useState([])
    const [stocks, setStocks] = useState([]);
    const [promotionsLoaded, setPromotionsLoaded] = useState(false)
    const loadStocks = async () => {
        let result = await axios.post(`${globals.productionServerDomain}/loadDirectionPromotions`, {direction_id: 0});
        setStocks(result.data);
        for(let i=0;i<result.data.length;i++){
            if(result.data[i].center_id === props.course.course_id){
                promotions.push(result.data[i])
            }
        }
        setPromotions(promotions)
        if(result.data.length > 0){
            setPromotionsLoaded(true)
        } else {
            setPromotionsLoaded(false)
        }

    }
    const [showPromotions, setShowPromotions] = useState(false)
    const [promotionIndex, setPromotionIndex] = useState(0)

    const [wordsToShowLength, setWordsToShowLength] = useState(10)
    const [heartValue, setHeartValue] = useState('\u2661')


    function prettify(num) {
        var n = num.toString();
        return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
    }

    function drawStar(count) {
        switch (count) {
            case 1:
                return (
                    <>
                        <img src="/star.png" alt="" className={styles.svgStar} />
                        <img src="/gray_star.png" alt="" className={styles.svgStar} />
                        <img src="/gray_star.png" alt="" className={styles.svgStar} />
                        <img src="/gray_star.png" alt="" className={styles.svgStar} />
                        <img src="/gray_star.png" alt="" className={styles.svgStar} />
                    </>
                )
                break;
            case 2:
                return (
                    <>
                        <img src="/star.png" alt="" className={styles.svgStar} />
                        <img src="/star.png" alt="" className={styles.svgStar} />
                        <img src="/gray_star.png" alt="" className={styles.svgStar} />
                        <img src="/gray_star.png" alt="" className={styles.svgStar} />
                        <img src="/gray_star.png" alt="" className={styles.svgStar} />
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
                        <img src="/star.png" alt="" className={styles.svgStar} />
                        <img src="/star.png" alt="" className={styles.svgStar} />
                        <img src="/star.png" alt="" className={styles.svgStar} />
                        <img src="/star.png" alt="" className={styles.svgStar} />
                        <img src="/gray_star.png" alt="" className={styles.svgStar} />
                    </>)
                break;
            case 5:
                return (
                    <>
                        <img src="/star.png" alt="" className={styles.svgStar} />
                        <img src="/star.png" alt="" className={styles.svgStar} />
                        <img src="/star.png" alt="" className={styles.svgStar} />
                        <img src="/star.png" alt="" className={styles.svgStar} />
                        <img src="/star.png" alt="" className={styles.svgStar} />
                    </>)
                break;
        }

    }

    const coursePrice = prettify(props.course.price)
    const [courseDescription, setCourseDecription] = useState(props.course.description === undefined ? "" : props.course.description)

    const getCurrentDateTime = () => {
        let currentDate = new Date();

        let dd = currentDate.getDate();
        if(dd < 10) dd = '0' + dd;

        let mm = currentDate.getMonth()+1;
        if(mm < 10) mm = '0' + mm;

        let yy = currentDate.getFullYear();

        let hours = currentDate.getHours();
        let min = currentDate.getMinutes();
        let sec = currentDate.getSeconds();

        return yy + "-" + mm + "-" + dd + " " + hours + ":" + min + ":" + sec;
    }

    const [applicationSent, setApplicationSent] = useState(false);

    const sendApplication = (courseId, userInfo) => {
        let data = {
            city_id: props.course.city_id,
            direction_id: props.course.category_id || props.course.direction_id,
            name: userInfo.fullName,
            phone: userInfo.phone,
            email: userInfo.email,
            promocode: userInfo.promocode,
            age: 0,
            isOnline: props.course.format !== 'Offline',
            course_id: props.course.course_id,
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

    const [mobileVersion, setMobileVersion] = useState(false)

    useEffect(()=>{
        if (window.innerWidth <= 761){
            setMobileVersion(true)
            console.log('mob version ' + true)
        } else {
            setMobileVersion(false)
            console.log('mob version ' + false)
        }
        loadStocks()
    }, [])

    return (
            <div className={styles.container} style={{width: props.application !== undefined ? '40%' : null}} >
                <ModalWindow show={show} handleClose={handleClose} heading={`Оставить центру заявку`} body={<SignupToCourseForm sendApplicationCallback={sendApplication} course={props.course} handleClose={handleClose}/>}/>
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
                        </>
                    )
                }
                <Link
                    href={`/course/center/${encodeURIComponent(props.course.url)}?id=${encodeURIComponent(props.course.id)}`}
                    target="_blank" className={styles.noHover}
                >

                    <a
                        className={styles.noHover}
                        // onClick={async () => {
                        //     axios.post(`${globals.productionServerDomain}/logUserClick/`, {
                        //         datetime: getCurrentDateTime(),
                        //         courseTitle: props.course.course_title,
                        //         courseId: props.course.id,
                        //         subcourseTitle: props.course.title,
                        //         eventName: "О курсе"
                        //     });
                        // }}
                    >
                        <div style={{width: '100%'}}>
                            <div style={{textAlign: 'center'}}>
                                {/*<p className={styles.course_title}>{props.course.course_title}</p>*/}
                            </div>
                            <div className={styles.titleImage__Body}>
                                <div className={styles.titleImageWrapper}>
                                    <div className={styles.titleImageBody}
                                        style={{backgroundImage: `url("${props.coverImage}")`}}
                                    >
                                        {
                                            showPromotions && (
                                                <div className={styles.promotionBlock}>
                                                    <div style={{width: '100%'}}>
                                                        <div className={styles.promotionItem}>
                                                            <span className={styles.promotionTitle}>Акция</span>
                                                            <span className={styles.promotionSubtitle}>{promotions[promotionIndex].text}</span>
                                                            {mobileVersion && (
                                                                <span className={styles.promotionSubtitle}>Промокод: <b>{promotions[promotionIndex].promocode}</b></span>
                                                            )}
                                                        </div> <br/>
                                                        {
                                                            mobileVersion===false &&
                                                            <div className={styles.promotionItem}>
                                                                <span className={styles.promotionTitle}>Что нужно сделать?</span>
                                                                <span className={styles.promotionSubtitle}>Введите промокод <b>“{promotions[promotionIndex].promocode}”</b>, в поле <b>“Промокод”</b>, когда будете оставлять заявку этому центру</span>
                                                            </div>
                                                        }

                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                {
                                    showPromotions===false &&
                                    <div className={styles.titleLinkButtonBody}>

                                    </div>
                                }


                                {
                                    showPromotions===false &&
                                    <div className={styles.image_block} style={props.course.img_src?
                                    {
                                        backgroundImage: `url(${props.course.img_src})`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundColor: 'white',
                                        border: '1px solid white'
                                    }:{
                                        backgroundImage: `url('https://realibi.kz/file/510188.jpg')`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundColor: 'white',
                                        border: '1px solid white'
                                    }}>
                                    </div>
                                }
                                    <div style={props.course.verificated?
                                        {
                                            backgroundSize: '100% 100%',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            height: '40px',
                                            width: '40px',
                                            position: 'absolute',
                                            right: '15px',
                                            backgroundImage: 'url(https://realibi.kz/file/890265.png)',
                                            top: '15px'
                                        }:{
                                            
                                        }}></div>
                            </div>


                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div className={styles.rating_img}>
                                    {/*<img src="/star.png" alt="" height={'16px'}/>*/}
                                    {/*{drawStar(parseInt(props.course.rating))}*/}
                                </div>
                            </div>

                            <div className={styles.info_block}>
                                <div>

                                    <p className={styles.fullname}
                                       onClick={() => {
                                           axios.post(globals.productionServerDomain + '/logUserClick',{
                                               course_id: props.course.course_id,
                                               card_id: props.course.id,
                                           })
                                       }}
                                    >
                                        {props.course.title.length < 124 ? (props.course.title) : (props.course.title.substr(0, 124).concat('...'))}
                                    </p>
                                    <label style={{display: "flex", flexDirection: "row"}}>
                                        <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.4999 14.3153L10.9999 17.2754L5.4999 14.3153V11.1878L3.92847 10.3525V15.1946L10.9999 19.0004L18.0713 15.1946V10.3525L16.4999 11.1878V14.3153Z" fill="#6D5DD0"/>
                                        <path d="M11 0L0 5.45725V6.76034L11 12.6072L20.4286 7.59564V11.7474H22V5.45725L11 0ZM18.8571 6.71096L17.2857 7.54621L11 10.8876L4.71429 7.54621L3.14286 6.71096L2.05371 6.132L11 1.69363L19.9463 6.132L18.8571 6.71096Z" fill="#6D5DD0"/>
                                        </svg>
                                        <p style={{marginLeft: '3px'}} className={styles.subtitle}>
                                            {props.course.course_title.length < 32 ? (props.course.course_title) : (props.course.course_title.substr(0, 32).concat('...'))}
                                        </p>
                                    </label>
                                    <lavel style={{display: "flex", flexDirection: "row"}}> <svg width="19" height="25" viewBox="0 0 19 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M15.8844 13.9687C15.0656 15.6281 13.9563 17.2812 12.8219 18.7656C11.7458 20.165 10.5952 21.5055 9.375 22.7812C8.15482 21.5055 7.00419 20.165 5.92813 18.7656C4.79375 17.2812 3.68438 15.6281 2.86563 13.9687C2.0375 12.2922 1.5625 10.7219 1.5625 9.375C1.5625 7.303 2.3856 5.31586 3.85073 3.85073C5.31586 2.3856 7.303 1.5625 9.375 1.5625C11.447 1.5625 13.4341 2.3856 14.8993 3.85073C16.3644 5.31586 17.1875 7.303 17.1875 9.375C17.1875 10.7219 16.7109 12.2922 15.8844 13.9687ZM9.375 25C9.375 25 18.75 16.1156 18.75 9.375C18.75 6.8886 17.7623 4.50403 16.0041 2.74587C14.246 0.98772 11.8614 0 9.375 0C6.8886 0 4.50403 0.98772 2.74587 2.74587C0.98772 4.50403 3.70503e-08 6.8886 0 9.375C0 16.1156 9.375 25 9.375 25Z" fill="#6D5DD0"/>
                                            <path d="M9.375 12.5C8.5462 12.5 7.75134 12.1708 7.16529 11.5847C6.57924 10.9987 6.25 10.2038 6.25 9.375C6.25 8.5462 6.57924 7.75134 7.16529 7.16529C7.75134 6.57924 8.5462 6.25 9.375 6.25C10.2038 6.25 10.9987 6.57924 11.5847 7.16529C12.1708 7.75134 12.5 8.5462 12.5 9.375C12.5 10.2038 12.1708 10.9987 11.5847 11.5847C10.9987 12.1708 10.2038 12.5 9.375 12.5ZM9.375 14.0625C10.6182 14.0625 11.8105 13.5686 12.6896 12.6896C13.5686 11.8105 14.0625 10.6182 14.0625 9.375C14.0625 8.1318 13.5686 6.93951 12.6896 6.06044C11.8105 5.18136 10.6182 4.6875 9.375 4.6875C8.1318 4.6875 6.93951 5.18136 6.06044 6.06044C5.18136 6.93951 4.6875 8.1318 4.6875 9.375C4.6875 10.6182 5.18136 11.8105 6.06044 12.6896C6.93951 13.5686 8.1318 14.0625 9.375 14.0625Z" fill="#6D5DD0"/>
                                            </svg>
                                        <p style={{marginLeft: '3px'}} onClick={console.log("CITIES>>>", citiesList)} className={styles.info_title}>{cityName} {props.course.addresses}</p>
                                    </lavel>
                                    {/*<div className={styles.stats}>*/}
                                    {/*    <div className={styles.stat}>*/}
                                    {/*        <Image src={'/like.png'} className={styles.statImage}/>*/}
                                    {/*        <span>0</span>*/}
                                    {/*    </div>*/}
                                    {/*    <div className={styles.stat}>*/}
                                    {/*        <Image src={'/view.png'} className={styles.statImage}/>*/}
                                    {/*        <span>0</span>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    {/*<span className={styles.info_title}>*/}
                                    {/*    Описание:*/}
                                    {/*    {courseDescription.length > 10 ?*/}
                                    {/*        (props.course.description.substr(0, wordsToShowLength))*/}
                                    {/*        : (props.course.description)*/}
                                    {/*    }*/}
                                    {/*    {*/}
                                    {/*        courseDescription.length > 10 ?*/}
                                    {/*            <span style={{cursor: 'pointer', color: '#5571d3'}} onClick={()=>{*/}
                                    {/*                if(wordsToShowLength === 10){*/}
                                    {/*                    setWordsToShowLength(props.course.description.length)*/}
                                    {/*                } else {*/}
                                    {/*                    setWordsToShowLength(10)*/}
                                    {/*                }*/}
                                    {/*            }}>{wordsToShowLength === 10 ? '... далее' : ' свернуть'}</span>*/}
                                    {/*            : null*/}
                                    {/*    }*/}
                                    {/*</span>*/}
                                </div>
                                {/*<div style={{}}>*/}
                                {/*    <div style={{}}>*/}
                                {/*        <div>*/}
                                {/*            <span className={styles.info_title}>Контакты: </span>*/}
                                {/*            <span onClick={async () => {*/}
                                {/*                await axios.post(`${globals.productionServerDomain}/logUserClick/`, {*/}
                                {/*                    datetime: getCurrentDateTime(),*/}
                                {/*                    courseTitle: props.course.course_title,*/}
                                {/*                    courseId: props.course.id,*/}
                                {/*                    subcourseTitle: props.course.title,*/}
                                {/*                    eventName: "Номер телефона"*/}
                                {/*                });*/}
                                {/*                setShowPhoneNumber(!showPhoneNumber)*/}
                                {/*            }} className={classnames(styles.info_small, styles.phone)}>*/}
                                {/*                { props.course.phones ?*/}
                                {/*                    (showPhoneNumber ? `${props.course.phones} ←` : props.course.phones.substr(0, 8).concat("-...→")) :*/}
                                {/*                    null }*/}
                                {/*            </span>*/}
                                {/*        </div>*/}
                                {/*        <div className={classnames(showInfo ? styles.show : styles.hide)}>*/}
                                {/*            <p className={styles.info_title}>Ожидаемый результат:</p>*/}
                                {/*            <p className={styles.info_small}>*/}
                                {/*                {*/}
                                {/*                    expectedResult.map(item => {*/}
                                {/*                        return(*/}
                                {/*                            <>*/}
                                {/*                                {item}*/}
                                {/*                                <br/>*/}
                                {/*                            </>*/}
                                {/*                        )*/}
                                {/*                    })*/}
                                {/*                }*/}
                                {/*            </p>*/}

                                {/*            <p className={styles.info_title}>Необходимые начальные знания:</p>*/}
                                {/*            <p className={styles.info_small}>{props.course.start_requirements}</p>*/}

                                {/*            <p className={styles.info_title}>Продолжительность курса: </p>*/}
                                {/*            <p className={styles.info_small}>{props.course.duration}</p>*/}

                                {/*            <p className={styles.info_title}>Возрастная категория: </p>*/}
                                {/*            <p className={styles.info_small}>{props.course.ages}</p>*/}

                                {/*            <p className={styles.info_title}>Вид занятий: </p>*/}
                                {/*            <p className={styles.info_small}>{props.course.type}</p>*/}

                                {/*            <p className={styles.info_title}>Формат занятий: </p>*/}
                                {/*            <p className={styles.info_small}>{props.course.format}</p>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: -15, marginTop: 10}}>
                                    {/*<div className={styles.socnetBlock} style={{marginBottom: 5}}>*/}
                                    {/*    {props.course.instagram ? (*/}
                                    {/*        <>*/}
                                    {/*            <a onClick={async () => {*/}
                                    {/*                await axios.post(`${globals.productionServerDomain}/logUserClick/`, {*/}
                                    {/*                    datetime: getCurrentDateTime(),*/}
                                    {/*                    courseTitle: props.course.course_title,*/}
                                    {/*                    courseId: props.course.id,*/}
                                    {/*                    subcourseTitle: props.course.title,*/}
                                    {/*                    eventName: "Instagram"*/}
                                    {/*                });*/}
                                    {/*            }} target='_blank' href={`https://www.instagram.com/${props.course.instagram}/`}>*/}
                                    {/*                <img src="/instagram.png" className={styles.icons} alt=""/>*/}
                                    {/*            </a>*/}
                                    {/*        </>*/}
                                    {/*    ) : null }*/}
                                    {/*    {props.course.website_url !== null ? (*/}
                                    {/*        <>*/}
                                    {/*            <a*/}
                                    {/*                onClick={async () => {*/}
                                    {/*                    await axios.post(`${globals.productionServerDomain}/logUserClick/`, {*/}
                                    {/*                        datetime: getCurrentDateTime(),*/}
                                    {/*                        courseTitle: props.course.course_title,*/}
                                    {/*                        courseId: props.course.id,*/}
                                    {/*                        subcourseTitle: props.course.title,*/}
                                    {/*                        eventName: "Website"*/}
                                    {/*                    });*/}
                                    {/*                }}*/}
                                    {/*                target='_blank' href={`${props.course.website_url}`}>*/}
                                    {/*                <img src="/network.png" className={styles.icons} alt=""/>*/}
                                    {/*            </a>*/}
                                    {/*        </>*/}
                                    {/*    ) : null }*/}
                                    {/*</div>*/}
                                </div>

                                <div className={styles.linkButtonBody}>
                                    {/*<div style={{alignItems: 'center', width: '100%', textAlign: 'center', marginBottom: '15px'}}>*/}
                                    {/*    <a className={styles.showHideBtn} onClick={() => {*/}
                                    {/*        setShowInfo(!showInfo);*/}
                                    {/*    }}>{showInfo ? 'Скрыть' : 'Показать больше'}</a>*/}

                                    {/*    <img src="/arrow-bottom.png" alt="" onClick={() => {*/}
                                    {/*        setShowInfo(!showInfo);*/}
                                    {/*    }}*/}
                                    {/*         className={ showInfo ? styles.hideArrow : styles.showArrow}*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                    {/*<div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>*/}
                                    {/*    <button onClick={async () => {*/}
                                    {/*        if(!showInfo){*/}
                                    {/*            setShowInfo(true);*/}
                                    {/*            await axios.post(`${globals.productionServerDomain}/logUserClick/`, {*/}
                                    {/*                datetime: getCurrentDateTime(),*/}
                                    {/*                courseTitle: props.course.course_title,*/}
                                    {/*                courseId: props.course.id,*/}
                                    {/*                subcourseTitle: props.course.title,*/}
                                    {/*                eventName: "Показать больше"*/}
                                    {/*            });*/}
                                    {/*        }else{*/}
                                    {/*            setShowInfo(false);*/}
                                    {/*        }*/}
                                    {/*    }}*/}
                                    {/*        className={styles.info_button}>{showInfo ? 'Скрыть' : 'Показать больше'}</button>*/}
                                    {/*</div>*/}
                                    {/*<div style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}} onClick={() => props.setLoadingModal(true)}>*/}
                                    {/*<span className={styles.heart} onMouseEnter={()=>{*/}

                                    {/*}}> {heartValue} </span>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                    </a>
                </Link>

                <Link
                    href={`/course/center/${encodeURIComponent(props.course.url)}?id=${encodeURIComponent(props.course.id)}`}
                    target="_blank" className={styles.noHover}
                    style={{height: '100%'}}
                >
                    <a
                        className={styles.noHover}
                        // onClick={async () => {
                        //     axios.post(`${globals.productionServerDomain}/logUserClick/`, {
                        //         datetime: getCurrentDateTime(),
                        //         courseTitle: props.course.course_title,
                        //         courseId: props.course.id,
                        //         subcourseTitle: props.course.title,
                        //         eventName: "О курсе"
                        //     });
                        // }}
                        style={{height: '100%'}}
                    >
                    </a>
                </Link>

                <div>
                    <div>
                        {props.course.currency === '$' ?
                            (<label style={{display: "flex", flexDirection: "row", alignItems: 'baseline'}}>    
                                <svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 3.75033C1 3.19779 1.21949 2.66789 1.61019 2.27719C2.00089 1.88649 2.5308 1.66699 3.08333 1.66699H19.75C20.3025 1.66699 20.8324 1.88649 21.2231 2.27719C21.6138 2.66789 21.8333 3.19779 21.8333 3.75033V14.167C21.8333 14.7195 21.6138 15.2494 21.2231 15.6401C20.8324 16.0308 20.3025 16.2503 19.75 16.2503H3.08333C2.5308 16.2503 2.00089 16.0308 1.61019 15.6401C1.21949 15.2494 1 14.7195 1 14.167V3.75033Z" stroke="#6D5DD0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11.4165 12.084C13.1424 12.084 14.5415 10.6849 14.5415 8.95898C14.5415 7.23309 13.1424 5.83398 11.4165 5.83398C9.69061 5.83398 8.2915 7.23309 8.2915 8.95898C8.2915 10.6849 9.69061 12.084 11.4165 12.084Z" stroke="#6D5DD0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M17.6667 16.2503C17.6667 15.1453 18.1057 14.0854 18.8871 13.304C19.6685 12.5226 20.7283 12.0837 21.8333 12.0837M1 5.83366C2.10507 5.83366 3.16488 5.39467 3.94628 4.61327C4.72768 3.83187 5.16667 2.77206 5.16667 1.66699L1 5.83366Z" stroke="#6D5DD0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                   
                                <p style={{marginLeft: '3px'}} className={styles.info_price}>Цена: {props.course.currency}{coursePrice}/{props.course.unit_of_time}</p>
                             </label>
                             )
                            : ( <label style={{display: "flex", flexDirection: "row", alignItems: 'baseline'}}> 
                                <svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 3.75033C1 3.19779 1.21949 2.66789 1.61019 2.27719C2.00089 1.88649 2.5308 1.66699 3.08333 1.66699H19.75C20.3025 1.66699 20.8324 1.88649 21.2231 2.27719C21.6138 2.66789 21.8333 3.19779 21.8333 3.75033V14.167C21.8333 14.7195 21.6138 15.2494 21.2231 15.6401C20.8324 16.0308 20.3025 16.2503 19.75 16.2503H3.08333C2.5308 16.2503 2.00089 16.0308 1.61019 15.6401C1.21949 15.2494 1 14.7195 1 14.167V3.75033Z" stroke="#6D5DD0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11.4165 12.084C13.1424 12.084 14.5415 10.6849 14.5415 8.95898C14.5415 7.23309 13.1424 5.83398 11.4165 5.83398C9.69061 5.83398 8.2915 7.23309 8.2915 8.95898C8.2915 10.6849 9.69061 12.084 11.4165 12.084Z" stroke="#6D5DD0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M17.6667 16.2503C17.6667 15.1453 18.1057 14.0854 18.8871 13.304C19.6685 12.5226 20.7283 12.0837 21.8333 12.0837M1 5.83366C2.10507 5.83366 3.16488 5.39467 3.94628 4.61327C4.72768 3.83187 5.16667 2.77206 5.16667 1.66699L1 5.83366Z" stroke="#6D5DD0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                
                                <p style={{marginLeft: '3px'}} className={styles.info_price}>Цена: {coursePrice} {props.course.currency}/{props.course.unit_of_time}</p>
                                </label>
                            )
                        }
                    </div>

                    <div
                        style={{
                            display: 'flex'
                        }}
                    >
                        {
                            applicationSent ? (
                                <p className={styles.applicationSentText}>Заявка отправлена!</p>
                            ) : (
                                <button onClick={async () => {
                                    setShow(!show)
                                    axios.post(globals.productionServerDomain + '/logUserClick',{
                                        course_id: props.course.course_id,
                                        card_id: props.course.id
                                    })
                                }} className={styles.linkButton}>Оставить заявку</button>
                            )
                        }

                        <a
                            onClick={() => {
                                ym(78186067,'reachGoal','whatsapp_click_center');
                                axios.post(globals.productionServerDomain + '/logUserClick',{
                                    course_id: props.course.course_id,
                                    card_id: props.course.id,
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
    )
}
