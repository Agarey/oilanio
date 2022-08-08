import styles from './style.module.css'
import ModalWindow from "../Modal/ModalWindow";
import {CardPickForm} from "../Forms/CardPickForm/CardPickForm";
import React, {useState} from "react";
import classnames from 'classnames';
import SubscriptionPaymentForm from "../Forms/SubscriptionPaymentForm/SubscriptionPaymentForm";
import SubscriptionTutorPaymentForm from '../Forms/SubscriptionTutorPaymentForm/SubscriptionTutorPaymentForm';

export default function AllApplications(props){
  const application = props.application;
  const [showCardPickModal, setCardPickModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleCardPickModalClose = () => setCardPickModal(false);
  const handlePaymentModalClose = () => setShowPaymentModal(false);
  const CountDown = ({ hours = 0, minutes = 0, seconds = 0 }) => {
    const [over, setOver] = React.useState(false);
    const [[h, m, s], setTime] = React.useState([hours, minutes, seconds]);
    const tick = () => {
      if (over) return;
      if (h === 0 && m === 0 && s === 0) {
        setOver(true);
      } else if (m === 0 && s === 0) {
        setTime([h - 1, 59, 59]);
      } else if (s == 0) {
        setTime([h, m - 1, 59]);
      } else {
        setTime([h, m, s - 1]);
      }
    };

    React.useEffect(() => {
      const timerID = setInterval(() => tick(), 1000);
      return () => clearInterval(timerID);
    });

    return (
      <span>
        {`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`}
      </span>
    );
  };
  
  return (
    <>
      <ModalWindow 
        show={showPaymentModal} 
        handleClose={handlePaymentModalClose} 
        heading={'Приобретите подписку для возможности откликнуться на заявку!'} 
        body={!props.isTutors ? <SubscriptionPaymentForm handleClose={handlePaymentModalClose}/> : <SubscriptionTutorPaymentForm handleClose={handlePaymentModalClose}/>}
      />
      <ModalWindow
        show={showCardPickModal}
        handleClose={handleCardPickModalClose}
        heading={'Созвонитесь с клиентом!'}
        body={<p style={{color: '#000'}}>{application.phone}</p>}
      />  

      <div className={styles.container}>
        <p className={styles.name}>{application.name}</p>
        {(new Date(application.datetime).getTime() + 86400000) > (new Date().getTime()) ? ( <>
        <p>
          <b>Активна с: </b>
          {application.datetime.toLocaleString().replace(/^([^T]+)T(.+)$/,'$1').replace(/^(\d+)-(\d+)-(\d+)$/,'$3.$2.$1')}
        </p>
        <p className={styles.application_item_text}>
          <b>Осталось: </b>
          <CountDown 
            hours={Math.floor((((new Date(application.datetime).getTime()) + 86400000)-(new Date().getTime()))/1000/60/60)} 
            minutes={Math.floor((((new Date(application.datetime).getTime()) + 86400000)-(new Date().getTime()))/1000/60)%60}
            seconds={Math.floor((((new Date(application.datetime).getTime()) + 86400000)-(new Date().getTime()))/1000)%60} 
          />
        </p></>) : <>
          <p>
            <b>Была активна: </b>
            {application.datetime.toLocaleString().replace(/^([^T]+)T(.+)$/,'$1').replace(/^(\d+)-(\d+)-(\d+)$/,'$3.$2.$1')}
          </p>
        </>}
        {(new Date(application.datetime).getTime() + 86400000) > (new Date().getTime()) ? (
          <button
            className={styles.button}
            onClick={() => {
              console.log(application.deactivated_date);
              if ((new Date(props.center.next_payment_date).getTime()) > (new Date().getTime())) {
                setCardPickModal(true);
              } else{
                setShowPaymentModal(true);
              }
            }}
          >
            Показать номер телефона
          </button>
        ) : (
          <button
            disabled={true}
            className={classnames(styles.button, styles.deactivated_card_button)}
          >
            Заявка уже неактивна!
          </button>
        )}
      </div>
    </>
  );
}