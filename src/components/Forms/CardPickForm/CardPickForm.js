import React, {useEffect, useState} from "react";
import styles from '../../../../styles/components/form.module.css'
import {PickingCard} from "../../PickingCard/PickingCard";

export function CardPickForm(props) {
    return (
        <div className={styles.form}>
            <div>

                <div style={{width: '100%', textAlign: 'center'}}>
                    {props.courseCards.map(item => {
                            if (item.card_category_id === props.chosenApplication.direction_id) {
                                return (
                                    <>
                                        <PickingCard
                                            handleClose={props.handleClose}
                                            center={props.center}
                                            application={props.chosenApplication}
                                            card={item}/>
                                        <br/>
                                    </>
                                )
                            }
                        }
                    )}
                </div>
            </div>
        </div>
    );
}
