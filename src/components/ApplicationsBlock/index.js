import {useEffect, useState} from "react";
import {default as axios} from "axios";
import globals from "../../globals";
import Application from "../Application";
import styles from './style.module.css'

export default function ApplicationsBlock(props){
    console.log(props.applications)
    return(
        <div>
            <h1>Заявки</h1>
            <br/>

            <div className={styles.container}>
                {props.applications.map(item => {
                    let categoryName = props.categories.filter(category => category.id === item.direction_id)[0].name;

                    return(
                        <div className={styles.application}>
                            <Application center={props.courseInfo} courseCards={props.courseCards} subscriptionInfo={props.subscriptionInfo} application={item} categoryName={categoryName}/>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}