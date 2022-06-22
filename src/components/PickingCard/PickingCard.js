import React, {useEffect, useState} from "react";
import styles from '../../../styles/components/form.module.css'
import axios from "axios";
import globals from "../../globals";

export function PickingCard(props) {
    const [courseDescription, setCourseDecription] = useState(props.card.description.split('|'))
    return (
        <div className={styles.container} style={{textAlign: 'left'}}>
            <div className={styles.header}>
                <span className={styles.pickingCardTitle}><b>Наименование курса:</b> {props.card.title}</span> <br/>
                <span className={styles.pickingCardTitle}><b>Формат:</b> {props.card.format} </span> <br/>
                <span className={styles.pickingCardTitle}><b>Цена:</b> {props.card.price} {props.card.currency}/{props.card.unit_of_time}</span> <br/>
            </div>

            <div className={styles.footer}>
                <button
                    className={styles.pickingCardBtn}
                    onClick={async ()=>{
                        let token = JSON.parse(localStorage.getItem(globals.localStorageKeys.authToken)).token;
                        await axios({
                            method: 'post',
                            url: `${globals.productionServerDomain}/responseToSearchApplication`,
                            data: {
                                application_id: props.application.id,
                                subcourse_id: props.card.id,
                                center_name: props.center.title,
                                center_id: props.center.id
                            },
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        }).then(function(res){
                            props.handleClose();
                        });
                    }}
                >Выбрать</button>
            </div>
        </div>
    );
}
