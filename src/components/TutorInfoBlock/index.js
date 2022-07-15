import styles from './style.module.css';
import TutorCreateCourseCard from "../TutorCreateCourseCard";
import TutorCourseCardEdit from "../TutorCourseCardEdit/TutorCourseCardEdit";
import classnames from 'classnames';

export default function TutorInfoBlock(props){
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
                {props.editMode ? (
                  <textarea
                    disabled={!props.editMode}
                    className={styles.tutor_description_textarea}
                    value={props.description === null ? '' : props.description}
                    onChange={e => props.setDescription(e.target.value)}
                    placeholder={props.description === null ? 'Напишите информацию о своем опыте, стаже работы, образовании и достижениях' : null}
                  />
                ) : (
                  <p className={styles.tutor_description_text}>
                    {props.description}
                  </p>
                )}  
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
                {!props.editMode ? (
                  <input
                    className={styles.tutor_info_input}
                    disabled={!props.editMode}
                    type='text'
                    value={props.canWorkOnline ? 'Да' : 'Нет'}
                  />
                ) : (
                  <div className={styles.checkDiv}><input
                    className={styles.checkbox}
                    type="checkbox"
                    checked={props.canWorkOnline}
                    onClick={props.setCanWorkOnlineHandler}
                  />
                  </div>
                )}
              </div>
              <div className={styles.tutor_info_row}>
                <p className={styles.info_title}>
                  Работает офлайн
                </p>
                {!props.editMode ? (
                  <input
                    className={styles.tutor_info_input}
                    disabled={!props.editMode}
                    type='text'
                    value={props.canWorkOffline ? 'Да' : 'Нет'}
                  />
                ) : (
                  <div className={styles.checkDiv}><input
                    className={styles.checkbox}
                    type="checkbox"
                    checked={props.canWorkOffline}
                    onClick={props.setCanWorkOfflineHandler}
                  />
                  </div>
                )}
              </div>
              <div className={styles.tutor_info_row}>
                <p className={styles.info_title}>
                  Работает на выезд
                </p>
                {!props.editMode ? (
                  <input
                    className={styles.tutor_info_input}
                    disabled={!props.editMode}
                    type='text'
                    value={props.canWorkOnDeparture ? 'Да' : 'Нет'}
                  />
                ) : (
                  <div className={styles.checkDiv}>
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      checked={props.canWorkOnDeparture}
                      onClick={props.setCanWorkOnDepartureHandler}
                    />
                  </div>
                )}
              </div>
              <div className={styles.tutor_info_row}>
                <p className={styles.info_title}>Город</p>
                <select
                  value={props.cityId}
                  disabled={!props.editMode}
                  onChange={props.setCityIdHandler}
                  className={styles.tutor_info_input}
                >
                  {props.filters[0].map(item => <option value={item.id}>
                    {item.name}
                  </option>)}
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
                {props.editMode ? (
                  <>
                    <button
                      className={styles.edit_profile_button}
                      onClick={props.editProfileDataHandler}
                    >
                      Сохранить
                    </button>
                    <button
                      className={styles.edit_profile_button}
                      onClick={props.setEditModeHandler}
                    >
                      Отменить
                    </button>
                  </>
                ) : (
                  <button
                    className={styles.edit_profile_button}
                    onClick={props.setEditModeHandler}
                  >
                    Редактировать данные
                  </button>
                 )}
            </div>
            </div>
          </div>
        </div>
      </div>
      <hr/>
      <div className={styles.block_title}>
        Ваши курсы:
      </div>
      <div className={styles.coursecards_block}>
      <div>
        <TutorCreateCourseCard directions={props.filters[1]}/>
      </div>
      {props.courseCards.map(item => (
        <div>
          <TutorCourseCardEdit course={item} directions={props.filters[1]}/>
        </div>
      ))}
    </div>
  </div>
)};
