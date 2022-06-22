import styles from '../../../styles/components/CreateTeacherCard.module.css'
import Link from "next/link";
import React, {useState} from "react";
import classnames from 'classnames';
import globals from "../../globals";

const axios = require('axios').default;

export default function EditTeacherCard(props) {
    const [showInfo, setShowInfo] = useState(false)
    const [edit, setEdit] = useState(false)
    const [fullname, setFullname] = useState('Тамара Серпутько')
    const [desc, setDesc] = useState('АГК (преподавание английского языка), МФПУ (иностранная филология), сертификат CELTA by Cambridge English Language Assessment')

    return (
        <div className={classnames(styles.teacherCard, props.teacher.approved ? null : styles.moderate)}>
            <div style={{backgroundImage: `url(${props.teacher.img_url})`,}}
                 className={styles.imageBlock}
            >
                <div className={styles.hoverBlock}>
                    {edit ? (<input type="file" className={styles.inputFile}/>) : null}
                </div>

            </div>
                <div className={styles.info_block}>
                    <div className={styles.tabCourseCardTitleBLock}>
                        <div className={styles.info_smallBody}>
                            <input className={styles.title} disabled={edit ? false : true} value={props.teacher.fullname}
                                   onChange={event => {
                                       setFullname(event.target.value);
                                   }}/>
                        </div>
                        <span style={{color: '#FF8300', fontWeight: 'bold' }}>{props.teacher.approved ? null : 'Карта находится в модерации'}</span>
                        <div className={styles.info_smallBody}>
                                <textarea className={styles.textArea} disabled={edit ? false : true}>
                                    {props.teacher.description}
                                </textarea>
                        </div>
                    </div>
                    <div className={styles.linkButtonBody}>
                        {/*<div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>*/}
                        {/*    <button className={classnames(styles.cancel_button)}*/}
                        {/*            onClick={()=>{*/}
                        {/*                if(edit){*/}
                        {/*                    // soxranenie*/}
                        {/*                    setEdit(!edit)*/}
                        {/*                }else{*/}
                        {/*                    setEdit(!edit)*/}
                        {/*                }*/}
                        {/*            }}*/}
                        {/*    >{edit ? 'Сохранить изменения' : 'Редактировать'}</button>*/}
                        {/*</div>*/}

                        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                            <button className={styles.cancel_button}
                                    onClick={async ()=>{
                                        await axios({
                                            method: 'post',
                                            data: {teacherId: props.teacher.id},
                                            url: `${globals.productionServerDomain}/deleteCourseTeacher`,
                                            headers: {
                                                'Authorization': `Bearer ${localStorage.getItem("auth token")}`
                                            }
                                        }).then(function(res){
                                            setEdit(!edit)
                                            location.reload()
                                        });
                                    }}
                            >Удалить</button>
                        </div>
                    </div>
                </div>
        </div>
    )
}




