import styles from '../../../styles/components/CreateTeacherCard.module.css'
import Link from "next/link";
import React, {useState, useEffect} from "react";
import classnames from 'classnames';
import globals from "../../globals";

const axios = require('axios').default;

export default function CreateTeacherCard(props) {
    const [showInfo, setShowInfo] = useState(false)
    const [create, setCreate] = useState(false)
    const [fullname, setFullname] = useState("");
    const [description, setDescription] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [courseId, setCourseId] = useState([])
    const [selectedCourseId, setSelectedCourseId] = useState()

    
    const loadCourses = async () => {
        await axios({
          method: "get",
          url: `${globals.productionServerDomain}/courses`,
        })
          .then(function (res) {
            setCourseId(res.data);
            console.log(res.data)
          })
          .catch((err) => {
            alert("Произошла ошибка при загрузке списка центров!");
          });
      };

    useEffect(async () => {
        loadCourses();
      }, []);


      const addTeacherCard = () => {
        let formData = new FormData();
        formData.append('file', imgFile);

        axios({
            method: "post",
            url: `${globals.ftpDomain}/file/upload`,
            data: formData,
            headers: {"Content-Type": "multipart/form-data"},
        })
            .then(function (response) {
                axios({
                    method: 'post',
                    url: `${globals.productionServerDomain}/createCourseTeacher`,
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("auth token")).token}`
                    },
                    data: {
                        fullname: fullname,
                        description: description,
                        img_url: `https://realibi.kz/file/${response.data.split('/')[4]}`,
                        course_id: selectedCourseId,
                    },
                }).then(res => {
                    console.log('data',res.data),
                    console.log("Status:" + res.status);
                    // location.reload()
                });
            })
    }

    return (
        <div className={styles.teacherCard} >
            <div>
                {create ? (<input
                    type="file"
                    className={styles.inputFile}
                    onChange={function(e){
                        setImgFile(e.target.files[0]);
                    }}
                />) : null}
            </div>

            {create ? null : (
                <div className={styles.createBlock}
                     onClick={()=>{
                         setCreate(!create)
                     }}
                >
                    <button className={styles.createButton}>+</button>
                </div>
            ) }
            {create ? (
                <div className={styles.info_block}>
                    <div className={styles.tabCourseCardTitleBLock}>
                        <p className={styles.info_title}>Имя преподавателя: </p>
                        <input
                            type="text"
                            className={classnames(styles.select, styles.input)}
                            placeholder='ФИО'
                            onChange={ e => { setFullname(e.target.value) } }
                        />

                        <p className={styles.info_title}>Краткое описание: </p>
                        <div className={styles.inputBody}>
                            <textarea
                                className={styles.textArea}
                                onChange={ e => { setDescription(e.target.value) } }
                            ></textarea>
                        </div>
                        <select
                            onChange={e => {
                                setSelectedCourseId(e.target.value)
                                console.log(selectedCourseId)
                            }}
                            >
                            {courseId.map(item => (
                                <option value={item.id}>{`${item.title}`}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.linkButtonBody}>
                        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                            <button className={classnames(styles.cancel_button)}
                                    onClick={()=>{
                                        addTeacherCard();
                                        setCreate(!create);
                                        // window.location.reload()
                                    }}
                            >Добавить</button>
                        </div>

                        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
                            <button className={styles.cancel_button}
                                    onClick={()=>{
                                        setCreate(!create)
                                    }}
                            >Отмена</button>
                        </div>
                    </div>

                </div>
            ) : null}

        </div>
    )
}
