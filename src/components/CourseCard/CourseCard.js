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
                                               card_id: props.course.id
                                           })
                                       }}
                                    >
                                        {props.course.title.length < 124 ? (props.course.title) : (props.course.title.substr(0, 124).concat('...'))}
                                    </p>
                                    <p className={styles.subtitle}>
                                        {props.course.course_title.length < 32 ? (props.course.course_title) : (props.course.course_title.substr(0, 32).concat('...'))}
                                    </p>
                                    <p className={styles.info_title}>{props.course.addresses}</p>
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
                            (
                                <p className={styles.info_price}>Цена: {props.course.currency}{coursePrice}/{props.course.unit_of_time}</p>
                            )
                            : (
                                <p className={styles.info_price}>Цена: {coursePrice} {props.course.currency}/{props.course.unit_of_time}</p>
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
