import styles from "../../../styles/components/content/course.module.css";
import React, {useState} from "react";
import {SignupToCourseForm} from "../Forms/SignupToCourseForm/SignupToCourseForm";
import ModalWindow from "../Modal/ModalWindow";

function SubCourseCard (props){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className={styles.tabCourseCard} >
            <ModalWindow show={show} handleClose={handleClose} heading={'Запись на курс'} body={<SignupToCourseForm course={props.course} handleClose={handleClose}/>}/>
            <div className={styles.tabCourseCardTitleBLock}>
                <span className={styles.tabCourseCardSpan}>
                    {props.course.title}
                </span>
                <span className={styles.tabCourseCardPrice}>
                    <span style={{
                        fontSize: 22,
                        fontFamily: "NeoSansPro Bold",
                        color: "#fff"
                    }}>Цена: </span> {props.course.price}KZT
                </span>
            </div>
            <button className={styles.button} onClick={handleShow}>Записаться на курс</button>
        </div>
    )
}

export default SubCourseCard;
