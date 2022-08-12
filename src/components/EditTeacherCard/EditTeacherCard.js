import styles from '../../../styles/components/CreateTeacherCard.module.css'
import Link from "next/link";
import React, {useState} from "react";
import classnames from 'classnames';
import globals from "../../globals";

const axios = require('axios').default;

export default function EditTeacherCard(props) {
  const [showInfo, setShowInfo] = useState(false);
  const [edit, setEdit] = useState(false);
  const [fullname, setFullname] = useState(props.teacher.fullname);
  const [description, setDescription] = useState(props.teacher.description);

  const editModeHandler = () => setEdit(!edit);

  const editTeacherInfo = (id) => {
    const data = {
      id: id,
      fullname: fullname,
      description: description.replace(/\r?\n/g, "")
    };
    
    axios({
      method: 'post',
      url: `${globals.productionServerDomain}/editTeacherInfo`,
      data: data,
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

  return (
      <div 
        className={classnames(styles.teacherCard, props.teacher.approved ? null : styles.moderate)}
      >
        <div 
          style={{backgroundImage: `url(${props.teacher.img_url})`,}}
          className={styles.imageBlock}
        >
          {/* <div className={styles.hoverBlock}>
            {edit 
              ? <input type="file" className={styles.inputFile}/>
              : null
            }
          </div> */}
        </div>
        <div className={styles.info_block}>
          <div className={styles.tabCourseCardTitleBLock}>
            <div className={styles.info_smallBody}>
              <input 
                className={styles.title} 
                disabled={edit ? false : true} 
                value={fullname}
                onChange={e => {
                  setFullname(e.target.value);
                }}
              />
              
            </div>
            <span 
              style={{color: '#FF8300', fontWeight: 'bold' }}
            >
              {props.teacher.approved ? null : 'Карта находится в модерации'}
            </span>
            <div className={styles.info_smallBody}>
              <textarea 
                className={styles.textArea} 
                disabled={edit ? false : true}
                onChange={(e) => setDescription(e.target.value)}
              >
                {description}
              </textarea>
            </div>
          </div>
          <div className={styles.linkButtonBody}>
          <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            {edit
              ? (
                <>
                  <button
                    className={classnames(styles.cancel_button)}
                    onClick={() => editTeacherInfo(props.teacher.id)}
                  >
                    Сохранить 
                  </button>
                  <button
                    className={classnames(styles.cancel_button)}
                    onClick={editModeHandler}
                  >
                    Отменить
                  </button>
                </>

              ) 
              : (
                <button
                  className={classnames(styles.cancel_button)}
                  onClick={editModeHandler}
                >
                  Редактировать данные
                </button>
              )
            }
          </div>
          <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            <button className={styles.cancel_button}
              onClick={async () => {
                await axios({
                  method: 'post',
                  data: {teacherId: props.teacher.id},
                  url: `${globals.productionServerDomain}/deleteCourseTeacher`,
                  headers: {
                    'Authorization': `Bearer ${localStorage.getItem("auth token")}`
                  }
                }).then(function(res){
                  setEdit(!edit);
                  location.reload();
                });
              }}
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}




