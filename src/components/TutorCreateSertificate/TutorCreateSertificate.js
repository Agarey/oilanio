import { useEffect, useRef, useState } from 'react';
import styles from './style.module.css';
import {default as axios} from "axios";
import globals from "../../../src/globals";

const TutorCreateSertificate = ({ 
  show, 
  close, 
  tutorId,
}) => {
  const [drag, setDrag] = useState(false);
  const [filename, setFilename] = useState("");
  const inputRef = useRef();
  
  const [imageDatas, setImageDatas] = useState([]);
  const [images, setImages] = useState([]);

  const [imgFile, setImgFile] = useState(null);
  const [serfTitle, setSerfTitle] = useState("");

  const [tutorSerfs, setTutorSerfs] = useState([]);
  const [showSModal, setShowSModal] = useState(false);

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };

 

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

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const onChangeFileHandler = async (e) => {
    let files = [...e.target.files];
    for (let i=0, f; f = files[i]; i++) {
      const file = files[i];
      console.log(file);
      setImages([...images, file]);
      const fileReader = new FileReader();
      fileReader.onload = (function (theFile) {
        return function (e) {
          setImageDatas(prevState => {
            return [
              ...prevState,
              {
                file: f,
                fileUrl: e.target.result,
                fileName: theFile.name,
                fileTitle: "",
                status: f.size > 1073741824 ? "Файл слишком большой" : "Назовите файл"
              }
            ];
          });
        };
      })(f);
      fileReader.readAsDataURL(f);
    };
    setDrag(false);
  }

  const onDropHandler = async (e) => {
    e.preventDefault();
    let files = [...e.dataTransfer.files];
    console.log(files);
    for (let i=0, f; f = files[i]; i++) {
      const file = files[i];
      
      console.log(file);
      setImages([...images, file]);
      const fileReader = new FileReader();
      fileReader.onload = (function (theFile) {
        console.log(theFile);
        return function (e) {
          setImageDatas(prevState => {
            return [
              ...prevState,
              {
                file: f,
                fileUrl: e.target.result,
                fileName: theFile.name,
                fileTitle: "",
                status: f.size > 1073741824 ? "Файл слишком большой" : "Назовите файл"
              }
            ];
          });
        };
      })(f);
      fileReader.readAsDataURL(f);
    };
    setDrag(false);
  };

  console.log(imageDatas);

  const closeHandler = () => {
    setDrag(false);
    setImageDatas([]);
    close();
    if (imageDatas.length > 0) location.reload();
  };

  const activateInput = () => {
    inputRef.current.click();
  };

  const onDeleteHandler = (i) => {
    const index = imageDatas.findIndex((data, index) => index === i);
    const newImageDatas = [...imageDatas];
    newImageDatas.splice(index, 1)
    setImageDatas(newImageDatas)
  };

  const onChangeHandler = (e, i) => {
    setImageDatas(imageDatas.map((data, index) => {
      if (index === i) {
        if (data.fileTitle.length > 4) {
          return {...data, fileTitle: e.target.value, status: ""}
        } else if (data.fileTitle.length < 5) {
          return {...data, fileTitle: e.target.value, status: "Назовите файл"}
        } else {
          return {...data, fileTitle: e.target.value}
        }
      } else {
        return data;
      }
    }));
  };

  console.log(imageDatas);

  const newSertificate = async (sertificateTitle, imgFile, index, status) => {
    let id = maxSerfId + (index + 1);
    let title = sertificateTitle;
    let tutor_id = tutorId;
    console.log('new id', id)
    let formData = new FormData();
    formData.append('file', imgFile);

    if (status === "") {
      const idx = imageDatas.findIndex((data, i) => i === index);
      const newImageDatas = [...imageDatas];
      newImageDatas[idx].status = "Загрузка";
      await setImageDatas(newImageDatas)
      await axios({
        method: "post",
        url: `${globals.ftpDomain}/file/upload`,
        data: formData,
        headers: {"Content-Type": "multipart/form-data"},
      })
      .then(function (response) {
        
        console.log(response.data);
        console.log(id, title, tutor_id, `https://realibi.kz/file/${response.data.split('/')[4]}`);
        axios({
          method: 'post',
          url: `${globals.productionServerDomain}/createTutorSertificate`,
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("auth token")).token}`
          },
          data: {
          id: id,
          title: title,
          tutor_id: tutor_id,
          img_src: `https://realibi.kz/file/${response.data.split('/')[4]}`,
        }})
        .then(res => {
          console.log("Status:" + res.status);
          const idx = imageDatas.findIndex((data, i) => i === index);
          const newImageDatas = [...imageDatas];
          newImageDatas[idx].status = "Успешно";
          setImageDatas(newImageDatas)
        })
        .catch(error => {
          const idx = imageDatas.findIndex((data, i) => i === index);
          const newImageDatas = [...imageDatas];
          newImageDatas[idx].status = "Ошибка";
          setImageDatas(newImageDatas)
        });
      });
    } else {
      const idx = imageDatas.findIndex((data, i) => i === index);
      const newImageDatas = [...imageDatas];
      newImageDatas[idx].status = "Ошибка";
      setImageDatas(newImageDatas)
    }
    // location.reload();
  };

  const createSertificate = async () => {
    await imageDatas.map(async (data, index) => {
      return await newSertificate(data.fileTitle, data.file, index, data.status);
    });
    
  };

  return (
    <>
      <div style={{
        transform: `translateY(${show ? 0 : "-100vh"})`,
        opacity: show ? 1 : 0
      }}
        className={styles.modal}
      >
        <h3 className={styles.title}>Ваши сертификаты</h3>
        <div className={styles.serfInfoContainer}>
          <div className={styles.drop_area_container}>
            {drag
              ? <div 
                className={styles.drop_area}
                onDragStart={e => dragStartHandler(e)}
                onDragLeave={e => dragLeaveHandler(e)}
                onDragOver={e => dragStartHandler(e)}
                onDrop={e => onDropHandler(e)}
              >
                Отпустите файлы, чтобы загрузить их
              </div>
              : <div 
                className={styles.drop_area}
                onDragStart={e => dragStartHandler(e)}
                onDragLeave={e => dragLeaveHandler(e)}
                onDragOver={e => dragStartHandler(e)}
              >
                <p className={styles.drop_area_text}>
                  Перетащите ваши файлы или выберите на компьютере
                </p>
                <input 
                  type="file" 
                  name="image"
                  ref={inputRef}
                  style={{display: "none"}}
                  onChange={onChangeFileHandler}
                  accept="image/png, image/jpeg"
                />
                <p
                  onClick={activateInput}
                  className={styles.chooseFile}
                >
                  Выбрать файл
                </p>

              </div>
            }
            <p className={styles.serfInfoText}>Загрузите изображения в формате - jpg. png. pdf.</p>
            <p className={styles.serfInfoText}>Не больше 5 файлов за раз</p>
            <button 
              className={styles.serfCreateBtn}
              onClick={createSertificate}  
            >
              Сохранить изменения
            </button>
          </div>
          
          <div className={styles.uploadImages}>
            {
              imageDatas.map((image, i) => {
                return <div className={styles.serfImagesInfo}>
                  <img 
                    className={styles.serfImg} 
                    src={image.fileUrl} 
                    alt={image.name}
                  />
                  <div className={styles.serfInfo}>
                    <input 
                      className={styles.serfInfoTitle} 
                      placeholder={image.fileName} 
                      type="text"
                      name="fileTitle"
                      onChange={(e) => onChangeHandler(e, i)}
                    />
                    <span
                      className={image.status === "Назовите файл" 
                      ? styles.statusFileName 
                      : image.status === "Файл слишком большой" 
                      ? styles.statusBigFile 
                      : image.status === "Успешно" 
                      ? styles.statusYes
                      : image.status === "Загрузка"
                      ? styles.statusLoader
                      : styles.statusError
                    }
                    >{image.status}</span>
                  </div>
                  <span 
                    className={styles.deleteSerf}
                    onClick={(e) => onDeleteHandler(i)}
                  ></span>
                </div>
              })
            }
          </div>
          
        </div>
        <button onClick={closeHandler} className={styles.closeBtn}></button>
      </div>
    </>
  )
  
};

export default TutorCreateSertificate;