import styles from './AdministrateSertificates.module.css'
import TutorCreateCourseCard from "../TutorCreateCourseCard";
import TutorCourseCardEdit from "../TutorCourseCardEdit/TutorCourseCardEdit";
import classnames from 'classnames';
import CreateCourseCard from '../CreateCourseCard/CreateCourseCard';
import React, {useState, useEffect} from "react";
import {default as axios} from "axios";
import globals from "../../../src/globals";
import {Image} from "react-bootstrap";

export default function AdministrateSertificates(props){
  const [tutorSerfs, setTutorSerfs] = useState([])
  const [showSModal, setShowSModal] = useState(0)
  const [sertificateTitle, setSertificateTitle] = useState('')
  const [imgFile, setImgFile] = useState(null);
  const [tutorsList, setTutorsList] = useState([])
  const [selectedTutorId, setSelectedTutorId] = useState()

  let maxSerfId = 0;
  let serfCounter = 0;
  useEffect(()=>{
          axios.get(`${globals.productionServerDomain}/getSertificates`).then(res => {
              setTutorSerfs(res.data);
              console.log(res);
          });
          loadTutors()
      }, [])
    
      const loadTutors = async () => {
        await axios({
          method: "get",
          url: `${globals.productionServerDomain}/tutors`,
        })
          .then(function (res) {
            setTutorsList(res.data);
            // console.log(tutorsList)
          })
          .catch((err) => {
            alert("Произошла ошибка при загрузке списка репетиторов!");
          });
      };

  tutorSerfs.forEach(sertificate => {
                if (sertificate.id > maxSerfId){
                  maxSerfId = sertificate.id
                  }
                }
              );
    // console.log('tutorSerfs', tutorSerfs)
    // console.log('maxSerfId', maxSerfId)
  let lastSerf = tutorSerfs.slice(-1)
  console.log()
  const newSertificate = () => {
    let id = maxSerfId + 1;
    let title = sertificateTitle;
    // let tutor_id = props.tutor.id;
    console.log('new id', id)
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
                    url: `${globals.productionServerDomain}/createTutorSertificate`,
                    headers: {
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("auth token")).token}`
                    },
                    data: {
                        id: id,
                        title: title,
                        tutor_id: selectedTutorId,
                        img_src: `https://realibi.kz/file/${response.data.split('/')[4]}`,
                    }
                }).then(res => {
                    console.log("Status:" + res.status);
                    alert("Сертификат добавлен")
                    location.reload()
                });
            })
  };

  return (
    <div>
      <div className={styles.sertificatesBlock}>
        <div className={styles.createSertificate} 
          style={(showSModal == 1)?{display:'flex'}:{display:'none'}}>
          <div className={styles.closeButtonBlock}>
            <button className={styles.closeButton}
              onClick={() => {
                            setShowSModal(0);
                        }}>X</button>
          </div>
          <div className={styles.forlabelsser}>
            <p>Заголовок</p> 
            <input onChange={event => {
                                setSertificateTitle(event.target.value);
                                }} 
                                value={sertificateTitle}/>
          </div>
          <div className={styles.forlabelsser}>
            <p>Фото сертификата</p> 
            <input type="file"
              onChange={function(e){
                        setImgFile(e.target.files[0]);
                    }}/>
          </div>
          <div className={styles.forlabelsser}>
            <p>Учитель</p>
            <select
        onChange={e => {
            setSelectedTutorId(e.target.value);
            // console.log(selectedTutorId)
        }} 
    >
        <option value={0}>Все учителя</option>
        {tutorsList.map(item => (
            <option value={item.id}>{item.fullname}</option>
        ))}
    </select>
          </div>
          <button onClick={async () => {
                  await newSertificate();
                  setShowSModal(0);
                }}>Создать</button>
        </div>
        <div className={styles.sertificateAdd}>
          <center>Добавить сертификат</center>
          <button onClick={() => {
                            setShowSModal(1);
                        }} className={styles.createButton}>
            +
          </button>
          <Image className={styles.sertificateImg} src="https://realibi.kz/file/165614.jpg"/>
        </div>
      </div>
  </div>
)};
