import CourseCard from "../CourseCard/CourseCard";
import styles from './style.module.css'
import EditCourseCard from "../EditCourseCard/EditCourseCard";
import CreateCourseCard from "../CreateCourseCard/CreateCourseCard";
import {Image} from "react-bootstrap";
import classnames from 'classnames';
import EditTeacherCard from "../EditTeacherCard/EditTeacherCard";
import CreateTeacherCard from "../CreateTeacherCard/CreateTeacherCard";

export default function MyInfoBlock(props){
  console.log(props.courseInfo);
  return(
    <div>
      <div className={styles.center_info_block}>
        <div className={styles.col_1_4}>
          <div className={styles.center_logo} style={{backgroundImage: `url(${props.courseInfo.img_src})`}}>
          </div>
        </div>
        <div className={styles.col_3_4}>
          <div className={styles.tutor_info_row}>
            <p 
              className={styles.center_title}
              style={!props.editMode?{display: 'flex'}:{display: 'none'}}
            >
              {props.title}
            </p>
            <input
              className={classnames(styles.center_info_input, styles.FIO)}
              disabled={!props.editMode}
              type="text"
              style={props.editMode? {display: 'flex'}:{display: 'none'}}
              value={props.title}
              onChange={props.setTitleHandler}
            />
          </div>
          <p 
            className={styles.center_subtitle}
            style={!props.editMode?{display: 'flex'}:{display: 'none'}}
          >
            {props.subtitle}
          </p>
          <textarea
            className={classnames(styles.center_info_input, styles.FIO)}
            disabled={!props.editMode}
            type="text"
            style={props.editMode? {display: 'flex'}:{display: 'none'}}
            value={props.subtitle}
            onChange={props.setSubtitleHandler}
          />
          <p className={styles.info_title}>
            О центре:
          </p> 
          <p 
            className={styles.info_text}
            style={!props.editMode?{display: 'flex'}:{display: 'none'}}
          >
            {props.description}
          </p>
          <textarea
            className={classnames(styles.center_info_input, styles.FIO)}
            disabled={!props.editMode}
            type="text"
            style={props.editMode? {display: 'flex'}:{display: 'none'}}
            value={props.description}
            onChange={props.setDescriptionHandler}
          />
          <p className={styles.info_title}>
            Номер телефона:
          </p>
          <p 
            className={styles.info_text}
            style={!props.editMode?{display: 'flex'}:{display: 'none'}}
          >
            {props.phones}
          </p>
          <input
            className={classnames(styles.center_info_input, styles.FIO)}
            disabled={!props.editMode}
            type="text"
            style={props.editMode? {display: 'flex'}:{display: 'none'}}
            value={props.phones}
            onChange={props.setPhonesHandler}
          />
          <p className={styles.info_title}>
            E-mail:
          </p>
          <p 
            className={styles.info_text}
            style={!props.editMode?{display: 'flex'}:{display: 'none'}}
          >
            {props.email}
          </p>
          <input
            className={classnames(styles.center_info_input, styles.FIO)}
            disabled={!props.editMode}
            type="text"
            style={props.editMode? {display: 'flex'}:{display: 'none'}}
            value={props.email}
            onChange={props.setEmailHandler}
          />
          <p className={styles.info_title}>
            Сайт:
          </p>
          <p 
            className={styles.info_text}
            style={!props.editMode?{display: 'flex'}:{display: 'none'}}
          >
            {props.website_url}
          </p>
          <input
            className={classnames(styles.center_info_input, styles.FIO)}
            disabled={!props.editMode}
            type="text"
            style={props.editMode? {display: 'flex'}:{display: 'none'}}
            value={props.website_url}
            onChange={props.setWebsiteUrlHandler}
          />
          <p className={styles.info_title}>
            Инстаграм:
          </p>
          <p 
            className={styles.info_text}
            style={!props.editMode?{display: 'flex'}:{display: 'none'}}
          >
            @{props.instagram}
          </p>
          <input
            className={classnames(styles.center_info_input, styles.FIO)}
            disabled={!props.editMode}
            type="text"
            style={props.editMode? {display: 'flex'}:{display: 'none'}}
            value={props.instagram}
            onChange={props.setInstagramHandler}
          />
          <p className={styles.info_title}>
            Местоположение:
          </p>
          <p 
            className={styles.info_text}
            style={!props.editMode?{display: 'flex'}:{display: 'none'}}
          >
            {props.addresses}
          </p>
          <input
            className={classnames(styles.center_info_input, styles.FIO)}
            disabled={!props.editMode}
            type="text"
            style={props.editMode? {display: 'flex'}:{display: 'none'}}
            value={props.addresses}
            onChange={props.setAddressesHandler}
          />
          <div 
            className={styles.course_info_row} 
            style={{marginTop: 10, display: "flex"}}
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
                    onClick={props.setEditModeHandler}
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
      <hr/>
      <p className={styles.info_title}>Мои товары:</p>
      <br/><br/>
      <div className={styles.cards_block}>
        <div className={styles.card}>
          <CreateCourseCard course={props.courseInfo}/>
        </div>
        {
          props.courseCards.map(item => (
            <div className={styles.card}>
              <EditCourseCard courseCategories={props.courseCategories} course={item}/>
            </div>
          ))
        }
      </div>
      <hr/>
      <p className={styles.info_title}>
        Мои преподаватели:
      </p>
      <br/><br/>
      <div className={styles.cards_block}>
        <div style={{width: '30%'}}>
          <CreateTeacherCard course={props.courseInfo}/>
        </div>
        {
          props.teachers.map(item => (
            <div style={{width: '30%'}}>
              <EditTeacherCard teacher={item}/>
            </div>
          ))
        }
      </div>
    </div>
  )
}
