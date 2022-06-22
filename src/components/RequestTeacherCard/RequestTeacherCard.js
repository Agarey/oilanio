import styles from "../../../styles/components/RequestTeacherCard.module.css";
import React, { useState, useEffect } from "react";
import classnames from 'classnames';
const axios = require('axios').default;
import globals from "../../globals";


function RequestTeacherCard (props){
    const [showInfo, setShowInfo] = useState(false)
    return (
        <div className={styles.teacherCard} >
            <div style={{backgroundImage: `url(${props.teacher.img_url})`,}}
                 className={styles.imageBlock}
            >
                <div className={styles.hoverBlock}></div>
            </div>
            <div className={styles.tabCourseCardTitleBLock}>
                <span className={styles.fullname} style={{marginBottom: 0}}>{props.teacher.fullname}</span>
                <span className={styles.fullname}
                style={{fontFamily: 'Gilroy Regular', fontSize: '14px', margin: 0}}
                >Образовательный центр: {props.teacher.centerName}</span>
                <span className={classnames(styles.description, showInfo ? styles.show : null  )}>{props.teacher.description}</span>
                <span style={{cursor: 'pointer', color: 'darkblue', marginBottom: '20px', fontFamily: 'Gilroy Regular'}}
                      onClick={() => {
                          setShowInfo(!showInfo)
                      }
                      }
                >{showInfo ? 'Скрыть' : 'Показать больше'}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                <button className={styles.info_button} onClick={async () => {
                    await axios({
                        method: 'post',
                        url: `${globals.productionServerDomain}/approveTeacher`,
                        data: {
                            cardId: props.teacher.id
                        },
                        headers: {
                            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("auth token")).token}`
                        }
                    })
                }}>Принять</button>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                <button className={styles.info_button} onClick={async () => {
                    await axios({
                        method: 'post',
                        url: `${globals.productionServerDomain}/declineTeacher`,
                        data: {
                            cardId: props.teacher.id
                        },
                        headers: {
                            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("auth token")).token}`
                        }
                    })
                }}>Отклонить</button>
            </div>
        </div>
    )
}

export  default RequestTeacherCard;
