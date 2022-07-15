import CourseCard from "../CourseCard/CourseCard";
import styles from './style.module.css'
import EditCourseCard from "../EditCourseCard/EditCourseCard";
import CreateCourseCard from "../CreateCourseCard/CreateCourseCard";
import {Image} from "react-bootstrap";
import classnames from 'classnames';
import EditTeacherCard from "../EditTeacherCard/EditTeacherCard";
import CreateTeacherCard from "../CreateTeacherCard/CreateTeacherCard";

export default function MyInfoBlock(props){
  return(
    <div>
      <div className={styles.center_info_block}>
        <div className={styles.col_1_4}>
          <div className={styles.center_logo} style={{backgroundImage: `url(${props.courseInfo.img_src})`}}>
          </div>
        </div>
        <div className={styles.col_3_4}>
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
          <p className={styles.center_title}>
            {props.courseInfo.title}
          </p>
          <p className={styles.center_subtitle}>
            {props.courseInfo.subtitle}
          </p>
          <p className={styles.info_title}>
            О центре:
          </p>
          <p className={styles.info_text}>
            {props.courseInfo.description}
          </p>
          <p className={styles.info_title}>
            Местоположение:
          </p>
          <p className={styles.info_text}>
            {props.courseInfo.addresses}
          </p>
          <div 
            className={styles.course_info_row} 
            style={{marginTop: 10, display: "flex"}}
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
