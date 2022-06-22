import styles from "../../../styles/components/content/course.module.css";
import React, { useState, useEffect } from "react";
import classnames from 'classnames';


function CourseTeacherCard (props){
    const [showInfo, setShowInfo] = useState(false)
    const [desc, setDesc] = useState(props.teacher.description.split('|'))
    return (
        <div className={styles.teacherCard} >
            <div style={{backgroundImage: `url(${props.teacher.img_url})`,}}
            className={styles.imageBlock}
            >
                <div className={styles.hoverBlock}></div>
            </div>
            <div className={styles.tabCourseCardTitleBLock}>
                <span className={styles.fullname}>{props.teacher.fullname}</span>
                <span className={classnames(styles.description, showInfo ? styles.show : null  )}>

                    {
                        desc.map(item => {
                            return(
                                <>
                                    {item}
                                    <br/>
                                </>
                            )
                        })
                    }

                </span>
                {
                    desc.length < 64 && <span style={{cursor: 'pointer', color: 'darkblue', marginBottom: '20px', fontFamily: 'Gilroy Regular'}}
                                               onClick={() => {
                                                   setShowInfo(!showInfo)}}
                    >{showInfo ? 'Скрыть' : 'Показать больше'}</span>
                }

            </div>
        </div>
    )
}

export  default CourseTeacherCard;
