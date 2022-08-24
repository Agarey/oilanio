import { useState } from "react";
import styles from './style.module.css';
import {Image} from "react-bootstrap";
import {default as axios} from "axios";
import globals from "../../../src/globals";
import classnames from 'classnames';

const TutorSertificate = (props) => {

  const [serfTitle, setSerfTitle] = useState(props.item.title);
  const [serfEdit, setSerfEdit] = useState(false);
  const [actionsShow, setActionsShow] = useState(false);

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
      <div 
        className={styles.sertificateActions}
        onClick={() => setActionsShow(!actionsShow)}
      >
        Действия
        <span className={actionsShow ?classnames(styles.dropdown, styles.dropdownShow) : styles.dropdown}></span>
        <div className={styles.actionsItems} style={actionsShow ? {display: "block"} : {display: "none"}}>
          <div onClick={serfEditModeHandler} className={styles.actionsEdit}>{!serfEdit ? "Редактировать" : "Отмена"}</div>
          <div onClick={() => editSertificateTitle(props.item.id)} className={styles.actionsSave}>Сохранить</div>
          <div onClick={() => deleteSertificate(props.item.id)} className={styles.actionsDelete}>Удалить</div>
        </div>
      </div>
      
      <Image src={props.item.img_src} className={styles.sertificateImg} />
      {!serfEdit 
        ? <p className={styles.titleCerf}>{props.item.title}</p> 
        : <input 
          onChange={onChangeSerfTitle}
          value={serfTitle}
          className={styles.editInput}
        />
      } 
      {/* {serfEdit
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
      } */}
      {/* <button
        onClick={() => deleteSertificate(props.item.id)}
        className={styles.sertificateBtn}
      >
        Удалить
      </button> */}
    </div>
  </>
};

export default TutorSertificate;