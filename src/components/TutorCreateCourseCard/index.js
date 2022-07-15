import React, {useEffect, useState} from "react";
import 'react-animated-slider/build/horizontal.css'
import styles from './style.module.css'
import {default as axios} from "axios";
import classnames from "classnames";
import globals from "../../globals";
import ModalWindow from "../Modal/ModalWindow";
import { CardCreationPermissionForm } from "../Forms/CardCreationLimitForm/CardCreationPermissionForm";

export default function TutorCreateCourseCard(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [create, setCreate] = useState(false)

  let [permittedCardsCount, setPermittedCardsCount] = useState(0);

  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [startRequirements, setStartRequirements] = useState('');
  const [expectingResults, setExpectingResults] = useState('');
  const [durationValue, setDurationValue] = useState(1);
  const [price, setPrice] = useState('');
  const [unitOfTime, setUnitOfTime] = useState('Час');
  const [schedule, setSchedule] = useState('');
  const [durationWord, setDurationWord] = useState('Дней');
  const [currency, setCurrency] = useState('KZT');
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(function(){
    axios.post(`${globals.productionServerDomain}/courseCategories`).then(function(res){
      console.log("course categories:")
      console.log(res.data);
      setCourseCategories(res.data);
    });
  }, []);

  const createCard = () => {
    let tutorId = +localStorage.getItem(globals.localStorageKeys.centerId);
    const data = {
      title,
      categoryId,
      minAge,
      maxAge,
      startRequirements,
      expectingResults,
      durationValue,
      price,
      unitOfTime,
      schedule,
      durationWord,
      tutorId,
      currency
    }

    axios({
      method: 'post',
      url: `${globals.productionServerDomain}/createTutorCourseCard`,
      data: data,
      headers: {
        'Authorization': `Bearer ${globals.localStorageKeys.authToken}`
      }
    }).then(function(res){
      alert('Карточка успешно отправлена на модерацию!');
      location.reload();
    }).catch(() => {
      alert('Что-то пошло не так!');
    });
  };

  return (
    <div className={styles.container}>
      <ModalWindow 
        show={show} 
        handleClose={handleClose} 
        heading={'Лимит на создания карточек'} 
        body={<CardCreationPermissionForm 
          permittedCardsCount={permittedCardsCount} 
          handleClose={handleClose}
        />}/>
      <div className={styles.titleImage__Body}>
        <div className={styles.titleImageWrapper}>
          {
            props.course !== null ? (
            <>
              <div className={styles.titleImageBody}
                style={{
                  backgroundImage: `url(https://realibi.kz/file/138424.png)`
                }}
              >
              </div>
              <div className={styles.image_block} style={{
                backgroundImage: `url(${props.course.img_src})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundColor: 'white',
                border: '1px solid white'
              }}>
              </div>
            </>
            ) : null
          }
        </div>

      </div>
      {create ? null : (
        <div className={styles.createBlock}
          onClick={async ()=>{
            setCreate(!create)
          }}
        >
          <button className={styles.createButton}>
            +
          </button>
        </div>
      )}
      {create ? (
        <div className={styles.info_block}>
          <div>
            <div className={styles.inputBody}>
              <input
                type="text"
                className={classnames(styles.select, styles.input)}
                placeholder="Название курса"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div>
              <p className={styles.info_title}>Направление: </p>
              <select
                className={styles.select}
                onChange={e => setCategoryId(e.target.value)}
              >
                <option value={null}>Выберите направление</option>
                {courseCategories === undefined
                  ?
                    null
                  :
                    (courseCategories.map(category => category.name === "test" 
                      ? 
                        null 
                      : (<option value={category.id}>{category.name}</option>)
                    ))
                }
              </select>
              <p className={styles.info_title}>Возрастная категория: </p>
              <div className={classnames(styles.inputBody, styles.flexbox)}>
                <input 
                  value={minAge} 
                  min={3} 
                  max={60} 
                  type="number" 
                  onChange={e => setMinAge(e.target.value)} 
                  className={classnames(styles.select, styles.input, styles.select50)} 
                  placeholder="От (число)"
                />
                <input 
                  value={maxAge} 
                  min={3} 
                  max={60} 
                  type="number" 
                  onChange={e => setMaxAge(e.target.value)} 
                  className={classnames(styles.select, styles.input, styles.select50)} 
                  placeholder="До (число)"
                />
              </div>
              <p className={styles.info_title}>Цена: </p>
              <div className={classnames(styles.inputBody, styles.flexbox)}>
                <input 
                  minLength={3} 
                  value={price}  
                  type="number" 
                  onChange={e => setPrice(e.target.value)} 
                  className={classnames(styles.select, styles.input, styles.select50)} 
                  placeholder="Цена"
                />
                <select
                  className={classnames(styles.select,styles.select50)}
                  onChange={e => setCurrency(e.target.value)}
                  value={currency}
                >
                  <option value="KZT">KZT</option>
                  <option value="USD">US</option>
                  <option value="RUB">RUB</option>
                </select>
              </div>
              <p className={styles.info_title}>Цена за: </p>
              <select
                className={styles.select}
                onChange={e => setUnitOfTime(e.target.value)}
                value={unitOfTime}
              >
                <option value="Месяц">Месяц</option>
                <option value="Час">Час</option>
                <option value="День">День</option>
                <option value="Курс">Курс</option>
              </select>
            </div>
          </div>
          <div className={styles.linkButtonBody}>
            <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
              <button className={classnames(styles.cancel_button)}
                onClick={async () => {
                  await createCard();
                  setCreate(!create);
                  location.reload();
                }}
              >
                Добавить
              </button>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
              <button className={styles.cancel_button}
                onClick={() => {
                  setCreate(!create)
                }}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}