import CourseCard from "../CourseCard/CourseCard";
import styles from './style.module.css'
import EditCourseCard from "../EditCourseCard/EditCourseCard";
import CreateCourseCard from "../CreateCourseCard/CreateCourseCard";
import {Image} from "react-bootstrap";
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
          <p className={styles.center_title}>
            {props.courseInfo.title}
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
