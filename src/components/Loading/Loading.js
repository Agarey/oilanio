import React, {useState} from "react";
import styles from "../../../styles/components/Loading.module.css";




export default function Loading(props) {
    return (
        <div className={styles.modalBody}>

            <div className={styles.loader}>
                <img src="/loader.gif" alt=""></img>
            </div>

        </div>
    );
}