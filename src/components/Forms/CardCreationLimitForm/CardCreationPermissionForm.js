import React, {useEffect, useState} from "react";
import styles from '../../../../styles/components/form.module.css'

export function CardCreationPermissionForm(props) {
    return (
        <div className={styles.form}>
            <div>
                <span className={styles.courseTitle} style={{fontSize: 18}} >
                    По вашей текущей подписке, вы можете иметь <br/>
                    только {props.permittedCardsCount} активных <br/>
                    карточек вашего центра!
                </span>

                <br/><br/>

                <div style={{width: '100%', textAlign: 'center'}}>
                    <button
                        className={styles.codeButton}
                        onClick={props.handleClose}
                    >Понятно</button>
                </div>
            </div>
        </div>

    );
}
