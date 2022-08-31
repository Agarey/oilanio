import styles from './style.module.css';
import TutorCreateCourseCard from "../TutorCreateCourseCard";
import TutorCourseCardEdit from "../TutorCourseCardEdit/TutorCourseCardEdit";
import classnames from 'classnames';
import CreateCourseCard from '../CreateCourseCard/CreateCourseCard';
import React, {useState, useEffect} from "react";
import {default as axios} from "axios";
import globals from "../../../src/globals";
import {Image} from "react-bootstrap";
import { registry } from 'chart.js';
import TutorSertificate from '../TutorSertificate/TutorSertificate';
import TutorCreateSertificate from '../TutorCreateSertificate/TutorCreateSertificate';

export default function TutorInfoBlock(props){
  const [tutorSerfs, setTutorSerfs] = useState([]);
  const [showSModal, setShowSModal] = useState(false);

  let maxSerfId = 0;

  useEffect(()=>{
    axios.get(`${globals.productionServerDomain}/getSertificates`).then(res => {
      setTutorSerfs(res.data);
    });
  }, []);

  tutorSerfs.forEach(sertificate => {
    if (sertificate.id > maxSerfId) {
      maxSerfId = sertificate.id
    }
  });

  console.log('tutorSerfs', tutorSerfs)
  console.log('maxSerfId', maxSerfId)
  
  let lastSerf = tutorSerfs.slice(-1)

  const cityInfo = props.filters[0].filter(info => {
    if (info.id === props.cityId) {
      return info;
    }
  });

  return (
    <div>
      <div className={styles.center_info_block}>
        <div className={styles.col_1_4}>
          <div className={styles.center_logo} style={{backgroundImage: `url(${props.courseInfo.img_src})`}}></div>
        </div>
        <div className={styles.container}>
          <div className={styles.tutor_info_block}>
            <div className={styles.tutor_info}>
              <div className={styles.tutor_info_row}>
                <div 
                  className={styles.FIOdiv}
                  style={!props.editMode?{display: 'flex'}:{display: 'none'}}
                >
                  {props.fullname}
                </div>
                <input
                  className={classnames(styles.tutor_info_input, styles.FIO)}
                  disabled={!props.editMode}
                  type="text"
                  style={props.editMode? {display: 'flex'}:{display: 'none'}}
                  value={props.fullname}
                  onChange={props.setFullnameHandler}
                />
              </div>
              <div className={styles.tutor_description}>
                {props.editMode 
                  ? (
                    <textarea
                      disabled={!props.editMode}
                      className={styles.tutor_description_textarea}
                      value={props.description === null ? '' : props.description}
                      onChange={props.setDescriptionHandler}
                      placeholder={props.description === null ? 'Напишите информацию о своем опыте, стаже работы, образовании и достижениях' : null}
                    />
                  ) 
                  : (
                    <p className={styles.tutor_description_text}>
                      {props.description}
                    </p>
                  )
                }  
              </div>
              <div className={styles.tutor_info_row}>
                <p className={styles.info_title}>
                  Номер телефона
                </p>
                <input
                  className={styles.tutor_info_input}
                  disabled={!props.editMode}
                  type="text"
                  value={props.phoneNumber}
                  onChange={props.setPhoneNumberHandler}
                />
              </div>
              <div className={styles.tutor_info_row}>
                <p className={styles.info_title}>
                  Работает онлайн
                </p>
                {!props.editMode 
                  ? (
                    <input
                      className={styles.tutor_info_input}
                      disabled={!props.editMode}
                      type='text'
                      value={props.canWorkOnline ? 'Да' : 'Нет'}
                    />
                  ) 
                  : (
                    <div className={styles.checkDiv}>
                      <input
                        className={styles.checkbox}
                        type="checkbox"
                        checked={props.canWorkOnline}
                        onClick={props.setCanWorkOnlineHandler}
                      />
                    </div>
                  )
                }
              </div>
              <div className={styles.tutor_info_row}>
                <p className={styles.info_title}>
                  Работает офлайн
                </p>
                {!props.editMode 
                  ? (
                    <input
                      className={styles.tutor_info_input}
                      disabled={!props.editMode}
                      type='text'
                      value={props.canWorkOffline ? 'Да' : 'Нет'}
                    />
                  ) 
                  : (
                    <div className={styles.checkDiv}>
                      <input
                        className={styles.checkbox}
                        type="checkbox"
                        checked={props.canWorkOffline}
                        onClick={props.setCanWorkOfflineHandler}
                      />
                    </div>
                  )
                }
              </div>
              <div className={styles.tutor_info_row}>
                <p className={styles.info_title}>
                  Работает на выезд
                </p>
                {!props.editMode 
                  ? (
                    <input
                      className={styles.tutor_info_input}
                      disabled={!props.editMode}
                      type='text'
                      value={props.canWorkOnDeparture ? 'Да' : 'Нет'}
                    />
                  ) 
                  : (
                    <div className={styles.checkDiv}>
                      <input
                        className={styles.checkbox}
                        type="checkbox"
                        checked={props.canWorkOnDeparture}
                        onClick={props.setCanWorkOnDepartureHandler}
                      />
                    </div>
                  )
                }
              </div>
              <div className={styles.tutor_info_row}>
                <p className={styles.info_title}>Город</p>
                <select
                  value={props.cityId}
                  disabled={!props.editMode}
                  onChange={props.setCityIdHandler}
                  className={styles.tutor_info_input}
                >
                  {props.editMode 
                    ? props.filters[0].map(item => <option value={item.id}>
                      {item.name}</option>)
                    : <option value={cityInfo[0].id}>{cityInfo[0].name}</option>
                  }
                </select>
              </div>
              <div className={styles.tutor_info_row}>
                <p className={styles.info_title}>Адрес</p>
                <input
                  className={styles.tutor_info_input}
                  disabled={!props.editMode}
                  type="text"
                  value={props.address}
                  onChange={props.setAddressHandler}
                />
              </div>
              <div className={styles.tutor_info_row}>
                <p className={styles.info_title}>
                  Язык препод.
                </p>
                <input
                  className={styles.tutor_info_input}
                  disabled={!props.editMode}
                  type="text"
                  value={props.teachingLanguage}
                  onChange={props.setTeachingLanguageHandler}
                />
            </div>
            <br/>
            <div 
                className={styles.tutor_info_row} 
                style={{marginTop: 10}}
              >
                {props.editMode 
                  ? (
                    <>
                      <button
                        className={styles.edit_profile_button}
                        onClick={props.editProfileDataHandler}
                      >
                        Сохранить
                      </button>
                      <button
                        className={styles.edit_profile_button}
                        onClick={() => {
                          props.setEditModeHandler()
                          location.reload();
                        }}
                      >
                        Отменить
                      </button>
                    </>
                  ) 
                  : (
                    <button
                      className={styles.edit_profile_button}
                      onClick={props.setEditModeHandler}
                    >
                      Редактировать данные
                    </button>
                  )
                }
            </div>
            </div>
          </div>
        </div>
      </div>
      <hr/>
      <div className={styles.block_title}>
        Ваши сертификаты:
      </div>
      <div className={styles.sertificatesBlock}>
        <TutorCreateSertificate 
          show={showSModal}
          close={() => {
            setShowSModal(false);
          }}
          tutorId={props.tutor.id}
        />
        {tutorSerfs.map(item => (props.tutor.id == item.tutor_id)
          ?(
            <TutorSertificate item={item} />
          )
          : (
            <></>
          ))
        }
        <div className={styles.sertificateAdd}>
          <p className={styles.sertificateAddTitle}>Нажмите на панель, чтобы выбрать и загрузить ваши файлы.</p>
          <button 
            onClick={() => {
              setShowSModal(true);
            }} 
            className={styles.createButton}
          ></button>
        </div>
        
      </div>
      <hr/>
      <div className={styles.block_title}>
        Ваши курсы:
      </div>
      <div className={styles.coursecards_block}>
      <div>
        <TutorCreateCourseCard 
          directions={props.filters[1]} 
          course={props.courseInfo}
        />
      </div>
      {props.courseCards.map(item => (
        <div>
          <TutorCourseCardEdit 
            course={item} 
            directions={props.filters[1]}
            courseInfo={props.courseInfo}
          />
        </div>
      ))}
    </div>
  </div>
)};
