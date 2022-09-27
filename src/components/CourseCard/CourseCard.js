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
  const [citiesList, setCitiesList] = useState([]);
  const [show, setShow] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [cityName, setCityName] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [promotionsLoaded, setPromotionsLoaded] = useState(false);
  const [showPromotions, setShowPromotions] = useState(false);
  const [promotionIndex, setPromotionIndex] = useState(0);
  const [wordsToShowLength, setWordsToShowLength] = useState(10);
  const [heartValue, setHeartValue] = useState('\u2661');
  const [courseDescription, setCourseDecription] = useState(props.course.description === undefined ? "" : props.course.description);
  const [applicationSent, setApplicationSent] = useState(false);
  const [mobileVersion, setMobileVersion] = useState(false);
  
  useEffect( async () => {
    await axios.get(`${globals.productionServerDomain}/filters`)
      .then(res => {
        setFilters(res.data);
        setCitiesList(filters[0]);
      });
  }, []);

  let cityId = props.course.city_id;

  useEffect( async () => {
    let city = await filters[0]?.find(el => el.id == cityId);
    setCityName(city?.name);
  }, [props.course]);

    
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loadStocks = async () => {
    let result = await axios.post(`${globals.productionServerDomain}/loadDirectionPromotions`, {direction_id: 0});
    setStocks(result.data);
    for(let i=0;i<result.data.length;i++) {
      if (result.data[i].center_id === props.course.course_id) {
        promotions.push(result.data[i]);
      };
    };
    setPromotions(promotions);
    if (result.data.length > 0) {
      setPromotionsLoaded(true);
    } else {
      setPromotionsLoaded(false);
    };
  };

  function prettify(num) {
    var n = num.toString();
    return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
  };

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
        );
      case 2:
        return (
          <>
            <img src="/star.png" alt="" className={styles.svgStar} />
            <img src="/star.png" alt="" className={styles.svgStar} />
            <img src="/gray_star.png" alt="" className={styles.svgStar} />
            <img src="/gray_star.png" alt="" className={styles.svgStar} />
            <img src="/gray_star.png" alt="" className={styles.svgStar} />
          </>
        )
      case 3:
        return (
          <>
            <img src="/star.png" alt="" className={styles.starIcon} />
            <img src="/star.png" alt="" className={styles.starIcon} />
            <img src="/star.png" alt="" className={styles.starIcon} />
            <img src="/gray_star.png" alt="" className={styles.starIcon} />
            <img src="/gray_star.png" alt="" className={styles.starIcon} />
          </>
        )
      case 4:
        return (
          <>
            <img src="/star.png" alt="" className={styles.svgStar} />
            <img src="/star.png" alt="" className={styles.svgStar} />
            <img src="/star.png" alt="" className={styles.svgStar} />
            <img src="/star.png" alt="" className={styles.svgStar} />
            <img src="/gray_star.png" alt="" className={styles.svgStar} />
          </>
        )
      case 5:
        return (
          <>
            <img src="/star.png" alt="" className={styles.svgStar} />
            <img src="/star.png" alt="" className={styles.svgStar} />
            <img src="/star.png" alt="" className={styles.svgStar} />
            <img src="/star.png" alt="" className={styles.svgStar} />
            <img src="/star.png" alt="" className={styles.svgStar} />
          </>
        )
    }
  }

  const coursePrice = prettify(props.course.price);
  
  const getCurrentDateTime = () => {
    let currentDate = new Date();

    let dd = currentDate.getDate();
    if (dd < 10) dd = '0' + dd;
    
    let mm = currentDate.getMonth()+1;
    if (mm < 10) mm = '0' + mm;
    
    let yy = currentDate.getFullYear();
    let hours = currentDate.getHours();
    let min = currentDate.getMinutes();
    let sec = currentDate.getSeconds();

    return yy + "-" + mm + "-" + dd + " " + hours + ":" + min + ":" + sec;
  };

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
    })
      .then(function(res){})
      .catch(() => alert('Что-то пошло нетак!'));
  };

  useEffect(()=>{
    if (window.innerWidth <= 761) {
      setMobileVersion(true);
    } else {
      setMobileVersion(false);
    }
    loadStocks();
  }, []);

  // console.log(props.course);

  return (
    <div 
      className={styles.container} 
      style={{width: props.application !== undefined ? '40%' : null}}
    >
      <ModalWindow 
        show={show} 
        handleClose={handleClose} 
        heading={`Оставить центру заявку`} 
        body={<SignupToCourseForm sendApplicationCallback={sendApplication} course={props.course} 
        handleClose={handleClose}/>}
      />
      <Link
        href={`/course/center/${encodeURIComponent(props.course.url)}?id=${encodeURIComponent(props.course.id)}`}
        target="_blank" className={styles.noHover}
      >
        <div className={styles.titleImage__Body}>
          <div className={styles.titleImageWrapper}>
            <div 
              className={styles.titleImageBody}
              style={props.course.img_src
                ? {
                  backgroundImage: `url(${props.course.img_src})`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundColor: 'white',
                  border: '1px solid white'
                }
                : {
                  backgroundImage: `url('https://realibi.kz/file/510188.jpg')`,
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundColor: 'white',
                  border: '1px solid white'
                }
              }
            >
              {
                showPromotions && (
                  <div className={styles.promotionBlock}>
                    <div className={styles.promotionItem}>
                      <span className={styles.promotionTitle}>Акция</span>
                      <span className={styles.promotionSubtitle}>
                        {promotions[promotionIndex].text}
                      </span>
                      {mobileVersion && (
                        <span className={styles.promotionSubtitle}>
                          Промокод: 
                          <b>{promotions[promotionIndex].promocode}</b>
                        </span>
                      )}
                    </div> 
                    <br/>
                    {
                      mobileVersion===false &&
                      <div className={styles.promotionItem}>
                        <span className={styles.promotionTitle}>
                          Что нужно сделать?
                        </span>
                        <span className={styles.promotionSubtitle}>
                          Введите промокод 
                          <b>“{promotions[promotionIndex].promocode}”</b>, в поле <b>“Промокод”</b>, когда будете оставлять заявку этому центру
                        </span>
                      </div>
                    }
                  </div>
                )
              }
            </div>
          </div>
          {
            showPromotions===false &&
            <div className={styles.titleLinkButtonBody}></div>
          }
          <div 
            // style={props.course.verificated
            //   ? {
            //     backgroundSize: '100% 100%',
            //     backgroundPosition: 'center',
            //     backgroundRepeat: 'no-repeat',
            //     height: '40px',
            //     width: '40px',
            //     position: 'absolute',
            //     backgroundImage: 'url(https://realibi.kz/file/890265.png)',
            //     top: '10px',
            //     left: '10px',
            //   } 
            //   : {}
            // }
            className={props.course.verificated ? styles.verificated_icon : null}
          >
          </div>
        </div>
      </Link>
      <div>
        <p className={styles.fullname}>
          {props.course.course_title?.length < 30 
            ? (props.course.course_title) 
            : (props.course.course_title?.substr(0, 30).concat('...'))
          }
        </p>
      </div>
      <div className={styles.info_block}>
        <p className={styles.course_title}>Образовательный центр</p>
        <p 
          className={styles.course_category}
          onClick={() => {
            axios.post(globals.productionServerDomain + '/logUserClick', {
              course_id: props.course.course_id,
              card_id: props.course.id,
            })
          }}
        >
          {props.course.title?.length < 25
            ? (props.course.title) 
            : (props.course.title?.substr(0, 25).concat('...'))
          }
        </p>
        <p className={styles.info_value}>
          {props.course.city_name ? props.course.city_name : props.course.city ? props.course.city : props.courseDetails.city_name}
        </p>
        <div>
          { props.course.currency === '$' 
            ? (
              <div 
                style={{
                  display: "flex", 
                  flexDirection: "row", 
                  alignItems: 'baseline'
                }}
              >               
                <p 
                  style={{marginLeft: '3px'}} 
                  className={styles.info_price}
                >
                  Цена: {props.course.currency}{coursePrice}/{props.course.unit_of_time}
                </p>
              </div>
            )
            : ( 
              <div 
                style={{
                  display: "flex", 
                  flexDirection: "row", 
                  alignItems: 'baseline'
                }}
              >     
                <p 
                  style={{marginLeft: '3px'}} 
                  className={styles.info_price}
                >
                  {coursePrice} {props.course.currency === 'KZT' ? "₸" : props.course.currency} / {props.course.unit_of_time}
                </p>
              </div>
            )
          }
        </div>
      </div>
      <div className={styles.button_container}>
        {/* <div style={{display: 'flex', justifyContent: "space-between"}}> */}
          <Link
            href={`/course/center/${encodeURIComponent(props.course.url)}?id=${encodeURIComponent(props.course.id)}`}
            target="_blank" className={styles.noHover}
          >
            <button className={styles.white_link_button}>
                Подробнее
              </button>
          </Link>
          
          { applicationSent 
            ? (
              <p className={styles.applicationSentText}>Заявка отправлена!</p>
            ) 
            : (
              <button 
                onClick={async () => {
                  setShow(!show)
                  axios.post(globals.productionServerDomain + '/logUserClick', {
                    course_id: props.course.course_id,
                    card_id: props.course.id
                  })
                }} 
                className={styles.linkButton}
              >
                Оставить заявку
              </button>
            )
          }
        {/* <a
          onClick={() => {
            ym(78186067,'reachGoal','whatsapp_click_center');
            axios.post(globals.productionServerDomain + '/logUserClick', {
              course_id: props.course.course_id,
              card_id: props.course.id,
              event_name: 'whatsapp'
            })
          }}
          href={`https://api.whatsapp.com/send?phone=${props.course.phones}&text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D0%BF%D0%B8%D1%88%D1%83%20%D0%92%D0%B0%D0%BC%20%D1%81%20%D0%BF%D0%BB%D0%B0%D1%82%D1%84%D0%BE%D1%80%D0%BC%D1%8B%20Oilan, `}
        >
          <span className={styles.wapp_logo}>
          </span>
        </a> */}
      </div>
    </div>
  )
}
