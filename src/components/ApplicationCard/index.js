import styles from './style.module.css'
import {useState} from "react";
import {default as axios} from "axios";
import globals from "../../globals";

const ApplicationCard = ({application, ...props}) => {

    const [deactivatingDate, setDeactivatingDate] = useState(application.deactivated_date && application.deactivated_date.split('T')[0])
    const [datetime, setDatetime] = useState(application.datetime && application.datetime.split('T')[0])
    const [isActive, setIsActive] = useState(application.is_active);

    return (
        <div className={styles.container}>
            <div className={styles.titleImageBody} style={{
                backgroundImage: `url(${props.coverImage})`
            }}>

            </div>
            <div className={styles.top}>
                <span className={styles.title}>{application.role_id === 4 ? application.center_title : application.tutor_fullname}</span>
                <span className={styles.subtitle}>{application.category_name} ({application.role_id === 4 ? 'Центр' : 'Репетитор'})</span> <br/> <br/>

                <div className={styles.info}>
                    <span className={styles.subtitle}>Статус заявки: <span style={{color: isActive ? 'green' : 'orangered', fontFamily: 'Rubik Medium'}}>
                        {isActive ? 'Активна' : 'Деактивирована'}
                        {isActive===false && <span className={styles.deactivatingDate}>{deactivatingDate}</span>}
                    </span></span> <br/>
                    <span className={styles.subtitle}>Заявка отправлена: <span style={{fontFamily: 'Rubik Medium'}}>{datetime}</span></span> <br/>
                    <span className={styles.subtitle}>Формат занятий: <span style={{fontFamily: 'Rubik Medium'}}>{application.is_online ? 'Онлайн' : 'Офлайн'}</span></span> <br/>
                    <span className={styles.subtitle}>Эл. почта: <span style={{fontFamily: 'Rubik Medium'}}>{application.student_email}</span></span>
                </div>
            </div>

            <div className={styles.foot}>
                <button onClick={async ()=>{
                    await axios({
                        method: 'post',
                        url: `${globals.productionServerDomain}/deactivateSearchApplication`,
                        data: {
                            application_id: application.id
                        }
                    }).then(res => {
                        setIsActive(false);
                    });
                }} className={styles.linkButton}>Деактивировать</button>
            </div>
        </div>
    )
}

export default ApplicationCard;