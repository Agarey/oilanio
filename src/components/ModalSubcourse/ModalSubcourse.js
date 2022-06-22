import React from 'react'
import styles from '../../../styles/components/ModalSubcourse.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal} from "react-bootstrap";

export default function ModalSubcourse(props){
    return  (
        <Modal className={props.active ? styles.modalBodyActive : styles.modalBody} onClick={()=>props.setActive(false)}>
            <div className={styles.leftBlock} onClick={e => e.stopPropagation()}>

            </div>
            <div className={styles.rightBlock} onClick={e => e.stopPropagation()}>

            </div>
        </Modal>
    )
}