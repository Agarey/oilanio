import React, {useState} from "react";
import styles from "../../../styles/components/content/ContactButton.module.css";
import ModalWindow from "../Modal/ModalWindow";
import Link from "next/link";
import {ContactForm} from "../Forms/ContactForm/ContactForm";
import {SignupToCourseForm} from "../Forms/SignupToCourseForm/SignupToCourseForm";
import {TechSupportForm} from '../Forms/TechSupportForm'



export default function TechSupportButton(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className={styles.contactButtonBody}>
            <ModalWindow show={show} handleClose={handleClose} techSupport={'techSupport'} heading={'Тех. поддержка'} body={<TechSupportForm center={props.center} handleClose={handleClose}/>}/>
            <div className={styles.Button} onClick={handleShow}>
                <img src="/support.png" style={{opacity: 100}} className={styles.phoneImg}/>
            </div>

        </div>
    );
}