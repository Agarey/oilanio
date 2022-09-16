import styles from './style.module.css'
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {SignupToCourseForm} from "../Forms/SignupToCourseForm/SignupToCourseForm";
import ModalWindow from "../Modal/ModalWindow";
import classnames from 'classnames';
import globals from "../../globals";
import {Image} from "react-bootstrap";

const axios = require('axios').default;

export default function TutorCourseCard(props) {
  const [show, setShow] = useState(false);
  const [applicationSent, setApplicationSent] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showContacts, setShowContacts] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [symbolsToShow, setSymbolsToShow] = useState(200)

  const [wordsToShowLength, setWordsToShowLength] = useState(10)
  const [heartValue, setHeartValue] = useState('\u2661')

  function prettify(num) {
    var n = num.toString();
    return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');
  }

  const coursePrice = prettify(props.course.price)
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
  };

  useEffect(()=>{
    if(window.innerWidth <= 992) {
      setSymbolsToShow(200)
    } else {
      setSymbolsToShow(300)
    }
  }, []);

  return (
    <div 
      className={styles.container} 
      style={{width: props.application !== undefined ? '40%' : null}} 
    >
      <ModalWindow 
        show={show} 
        handleClose={handleClose} 
        heading={'Оставить заявку репетитору'} 
        body={<SignupToCourseForm 
          sendApplicationCallback={props?.sendApplicationCallback} 
          course={props.course} 
          tutor={props.course} 
          handleClose={handleClose}
        />}
      />
      <div 
        className={styles.titleImageBody}
        style={{
          backgroundImage: `url(${props.coverImage})`
        }}
      >
      </div>
      <div className={styles.fullname_container}>
        <p className={styles.fullname}>
          {props.course.fullname}
        </p>
      </div>
      <div className={styles.info_block}>
        <p className={styles.course_title}>Репетитор</p>
        <p className={styles.course_category}>
          {props.course.category_name}
        </p>
        <p className={styles.info_value}>
          {props.course.city_name}
        </p>
        <div>
          {props.course.currency === '$' 
            ? (
              <p className={styles.info_price}>
              {props.course.currency}{coursePrice} за <span style={{textTransform: "lowercase"}}>{props.course.unit_of_time}</span>
              </p>
            )
            : (
              <p className={styles.info_price}>
                {coursePrice} {props.course.currency} за <span style={{textTransform: "lowercase"}}>{props.course.unit_of_time}</span>
              </p>
            )
          }
        </div>
      </div>
      <div className={styles.linkButtonBody}>
        {/* <div style={{display: 'flex', justifyContent: "space-between"}}> */}
        <button className={styles.white_link_button}>
          Подробнее
        </button>
        {applicationSent 
          ? (
            <p className={styles.applicationSentText}>Заявка отправлена!</p>
          ) 
          : (
            <button 
              onClick={async () => {
                setShow(!show);
              }} 
              className={styles.linkButton}
            >
              Оставить заявку
            </button>
          )
        }
          {/* <a
            onClick={() => {
              ym(78186067,'reachGoal','whatsapp_click_tutor');
              axios.post(globals.productionServerDomain + '/logUserClick',
                {
                  course_id: props.course.tutor_id,
                  card_id: props.course.id,
                  event_name: 'whatsapp',
                  is_tutor_card: true
                }
              )
            }}
            href={`https://api.whatsapp.com/send?phone=${props.course.phone_number}&text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D0%BF%D0%B8%D1%88%D1%83%20%D0%92%D0%B0%D0%BC%20%D1%81%20%D0%BF%D0%BB%D0%B0%D1%82%D1%84%D0%BE%D1%80%D0%BC%D1%8B%20Oilan,`}
          >
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
          </a> */}
        {/* </div> */}
      </div>
    </div>
  )
}
