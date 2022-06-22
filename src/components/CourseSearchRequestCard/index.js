import React, {useState} from "react";
import styles from '../../../styles/components/CabinetMessagesWrapper.module.css'
import axios from "axios";
import globals from "../../globals";
import {CourseSearchForm} from "../Forms/CourseSearchForm/CourseSearchForm";
import ModalWindow from "../Modal/ModalWindow";
import {CardPickForm} from "../Forms/CardPickForm/CardPickForm";

export default function CourseSearchRequestCard(props){
    const [name, setName] = useState(props.application.name);
    const [phone, setPhone] = useState(props.application.phone);
    const [direction, setDirection] = useState(props.application.direction_id);
    const [message, setMessage] = useState(props.application.message);
    const [date, setDate] = useState(props.application.datetime.split('T')[0]);
    const [isActive, setIsActive] = useState(props.application.is_active);
    const [isOnLine, setIsOnline] = useState(props.application.is_online);
    const [email, setEmail] = useState(props.application.email);
    const [uuid, setUuid] = useState(props.application.uuid_string);
    const [applicationId, setApplicationId] = useState(props.application.id);

    const [chosenApplication, setChosenApplication] = useState({});

    const [showCardPickModal, setCardPickModal] = useState(false);
    const [showErrorModal, setShowErrorModal]=  useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const handleCardPickModalClose = () => setCardPickModal(false);
    const handleErrorModalClose = () => setShowErrorModal(false);
    const handlePaymentModalClose = () => setShowPaymentModal(false);

    const [errorMessage, setErrorMessage] = useState('');

    return(
        <div className={isActive ? styles.active_application : styles.inactive_application}>
            {/*<ModalWindow show={showPaymentModal} handleClose={handlePaymentModalClose} heading={'Приобретите подписку для возможности откликнуться на заявку!'} body={<SubscriptionPaymentForm handleClose={handlePaymentModalClose}/>}/>*/}
            <ModalWindow
                show={showCardPickModal}
                handleClose={handleCardPickModalClose}
                heading={'Какой карточкой вы хотите oтклинуться на эту заявку?'}
                body={<CardPickForm center={props.center}
                chosenApplication={chosenApplication}
                courseCards={props.courseCards}
                handleClose={handleCardPickModalClose}/>}
            />
            <ModalWindow
                show={showErrorModal}
                handleClose={handleErrorModalClose}
                heading={'Проблемка!'}
                body={<p>{errorMessage}</p>}
            />
            <div className={styles.header}>
                <span className={styles.title} style={{marginRight: 5}}>Дата: </span> {date}
            </div>
            <span className={styles.title}>Имя студента: </span> {name} <br/>
            <div className={styles.info}>
                {isActive ? props.subscriptionInfo.permitted ? (
                    <>
                        <span className={styles.title}>Телефон: </span> {phone} <br/>
                        <span className={styles.title}>Email: </span> {email} <br/>
                    </>
                ) : (<span className={styles.notPermitted}>Приобретите подписку, чтобы видеть контакты студента!</span>) : null}
                <span className={styles.title}>Направление: </span> {props.directionsArray.filter(item => item.id == direction)[0].name} <br/>
                <span className={styles.title}>Сообщение: </span> {message} <br/>
            </div>
            <div className={styles.footer}>
                {isActive ? (
                    <button
                        onClick={async () => {
                            if(props.subscriptionInfo.permitted){
                                setChosenApplication(props.application);
                                setCardPickModal(true);
                            }else{
                                let date = new Date(Date.parse(props.subscriptionInfo.nextPaymentDate));
                                let dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                                let showDate = date.toLocaleDateString('ru-ru', dateOptions)
                                setErrorMessage(`Чтобы откликнуться на заявку, вам нужно приобрести подписку! Ваша последняя подписка действовала до ${showDate}.`);
                                setShowPaymentModal(!showPaymentModal)
                            }
                        }}
                        className={styles.button}
                    >
                        Откликнуться на заявку
                    </button>
                ) : (<span className={styles.inactiveMessage}>Заявка больше не активна!</span>)}
            </div>
        </div>
    )
}