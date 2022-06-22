import styles from './style.module.css'
import ModalWindow from "../Modal/ModalWindow";
import {CardPickForm} from "../Forms/CardPickForm/CardPickForm";
import React, {useState} from "react";
import classnames from 'classnames';
import SubscriptionPaymentForm from "../Forms/SubscriptionPaymentForm/SubscriptionPaymentForm";

export default function Application(props){
    const application = props.application;

    const [showCardPickModal, setCardPickModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const handleCardPickModalClose = () => setCardPickModal(false);
    const handlePaymentModalClose = () => setShowPaymentModal(false);
    return(
        <>
            <ModalWindow show={showPaymentModal} handleClose={handlePaymentModalClose} heading={'Приобретите подписку для возможности откликнуться на заявку!'} body={<SubscriptionPaymentForm handleClose={handlePaymentModalClose}/>}/>
            <ModalWindow
                show={showCardPickModal}
                handleClose={handleCardPickModalClose}
                heading={'Созвонитесь с клиентом!'}
                body={
                    <>
                        <p style={{color: '#000'}}>Номер телефона: {application.phone}</p>
                        <p style={{color: '#000'}}>Сообщение от клиента: {application.message}</p>
                    </>
                }
            />

            <div className={styles.container}>
                <p className={styles.name}>{application.name}</p>
                <p className={styles.direction}>{props.categoryName}</p>
                {application.is_active ? (
                    <button
                        className={styles.button}
                        onClick={() => {
                            if(props.subscriptionInfo.permitted){
                                setCardPickModal(true);
                            }else{
                                setShowPaymentModal(true)
                            }
                        }}
                    >Показать номер телефона</button>
                ) : (
                    <button
                        disabled={true}
                        className={classnames(styles.button, styles.deactivated_card_button)}
                    >Заявка уже неактивна!</button>
                )}

            </div>
        </>
    );
}
