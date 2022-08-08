import { useState } from "react";
import styles from './style.module.css';
import {Image} from "react-bootstrap";
import {default as axios} from "axios";
import globals from "../../../src/globals";

const TutorSertificate = (props) => {

  const [serfTitle, setSerfTitle] = useState(props.item.title);
  const [serfEdit, setSerfEdit] = useState(false);

  const deleteSertificate = (id) => {
    axios({
      method: 'post',
      url: `${globals.productionServerDomain}/deleteTutorSertificate`,
      data: {
        id: id
      },
      headers: {
        'Authorization': `Bearer ${globals.localStorageKeys.authToken}`
      }
    }).then(function(res){
      alert('Карточка успешно удалена!');
      location.reload();
    }).catch(() => {
      alert('Что-то пошло не так!');
    });
  };

  const editSertificateTitle = (id) => {
    axios({
      method: 'post',
      url: `${globals.productionServerDomain}/editTutorSertificateTitle`,
      data: {
        id: id,
        title: serfTitle,
      },
      headers: {
        'Authorization': `Bearer ${globals.localStorageKeys.authToken}`
      }
    }).then(function(res){
      alert('Карточка успешно редактирована!');
      location.reload();
    }).catch(() => {
      alert('Что-то пошло не так!');
    });
  };

  const onChangeSerfTitle = (e) => setSerfTitle(e.target.value);

  const serfEditModeHandler = () => setSerfEdit(!serfEdit);

  return <>
    <div className={styles.sertificate}>
      {!serfEdit 
        ? <center>{props.item.title}</center> 
        : <input 
          onChange={onChangeSerfTitle}
          value={serfTitle}
        />
      }           
      <Image className={styles.sertificateImg} src={props.item.img_src}/>
      {serfEdit
        ? (
          <>
            <button
              className={styles.sertificateBtn}
              onClick={() => editSertificateTitle(props.item.id)}
            >
              Сохранить
            </button>
            <button
              className={styles.sertificateBtn}
              onClick={serfEditModeHandler}
            >
              Отменить
            </button>
          </>
        ) 
        : (
          <button
            className={styles.sertificateBtn}
            onClick={serfEditModeHandler}
          >
            Редактировать данные
          </button>
        )
      }
      <button
        onClick={() => deleteSertificate(props.item.id)}
        className={styles.sertificateBtn}
      >
        Удалить
      </button>
    </div>
  </>
};

export default TutorSertificate;