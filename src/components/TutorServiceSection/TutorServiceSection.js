import { useState, useEffect } from "react";
import styles from "./TutorServiceSection.module.css";
import globals from "../../globals";
import { TypeSelector } from "react-yandex-maps";

const axios = require("axios").default;

const TutorServiceSection = () => {
  const [tutorsList, setTutorsList] = useState([]);
  const [filters, setFilters] = useState([[], [], []]);
  const [disableBtn, setDisableBtn] = useState(false);

  const [fullname, setFullname] = useState('');
  const [selectedTutorId, setSelectedTutorId] = useState(1);
  const [title, setTitle] = useState("");
  const [minAge, setMinAge] = useState(1);
  const [maxAge, setMaxAge] = useState(60);
  const [schedule, setSchedule] = useState("");
  const [startRequirements, setStartRequirements] = useState('');
  const [expectingResults, setExpectingResults] = useState('');
  const [durationValue, setDurationValue] = useState(1);
  const [categoryId, setCategoryId] = useState(1);
  const [price, setPrice] = useState(1000);
  const [durationWord, setDurationWord] = useState('Месяцев');
  const [unitOfTime, setUnitOfTime] = useState("Час");
  const [currency, setCurrency] = useState('KZT');

  useEffect(async () => {
    document.title = "Oilan - База данных";

    axios.get(`${globals.productionServerDomain}/filters`).then((res) => {
      setFilters(res.data);
    });

    loadTutors();
  }, []);

  const loadTutors = async () => {
    await axios({
      method: "get",
      url: `${globals.productionServerDomain}/tutors`,
    })
      .then(function (res) {
        setSelectedTutorId(res.data[0].id);
        setTutorsList(res.data);
      })
      .catch((err) => {
        alert("Произошла ошибка при загрузке списка репетиторов!");
      });
  };

  const createTutorCourseCard = async () => {
    const data = {
      title,
      categoryId,
      minAge,
      maxAge,
      schedule,
      startRequirements,
      expectingResults,
      durationValue,
      price,
      unitOfTime,
      schedule,
      durationWord,
      tutorId: selectedTutorId,
      currency,
    };

    await axios({
      method: "post",
      url: `${globals.productionServerDomain}/createTutorCourseCard`,
      data: data,
    })
      .then(function (res) {
        alert(`Карточка курса репетитора ${fullname} успешно создана!`);
      })
      .catch((err) => {
        alert("Произошла ошибка");
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperItme}>
        <p className={styles.wrapperItemTitle}>Репетитор</p>
        <select
          className={styles.wrapperItemInput}
          onChange={(e) => {
            setSelectedTutorId(e.target.value);
          }}
          value={selectedTutorId}
        >
          {tutorsList.map((item) => (
            <option value={item.id}>
              {item.fullname} (id: {item.id})
            </option>
          ))}
        </select>
      </div>

      <div className={styles.wrapperItem}>
        <p className={styles.wrapperItemTitle}>Название курса</p>
        <input
          type="text"
          className={styles.wrapperItemInput}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className={styles.wrapperItem}>
        <p className={styles.wrapperItemTitle}>Минимальный возраст</p>
        <input
          type="number"
          className={styles.wrapperItemInput}
          value={minAge}
          onChange={(e) => setMinAge(e.target.value)}
        />
      </div>

      <div className={styles.wrapperItem}>
        <p className={styles.wrapperItemTitle}>Максимальный возраст</p>
        <input
          type="number"
          className={styles.wrapperItemInput}
          value={maxAge}
          onChange={(e) => setMaxAge(e.target.value)}
        />
      </div>

      <div className={styles.wrapperItem}>
        <p className={styles.wrapperItemTitle}>Расписание</p>
        <input
          type="text"
          className={styles.wrapperItemInput}
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
        />
      </div>

      <div className={styles.wrapperItem}>
        <p className={styles.wrapperItemTitle}>Продолжительность</p>
        <input 
          type="number"
          className={styles.wrapperItemInput}
          value={durationValue}
          onChange={(e) => setDurationValue(e.target.value)}
        />
        <select
          className={styles.wrapperItemInput}
          value={durationWord}
          onChange={(e) => setDurationWord(e.target.value)}
        >
            <option value="Дней">Дней</option>
            <option value="Недель">Недель</option>
            <option value="Месяцев">Месяцев</option>
            <option value="Лет">Лет</option>
        </select>
      </div>

      <div className={styles.wrapperItem}>
        <p className={styles.wrapperItemTitle}>Направление</p>
        <select
          onChange={(e) => setCategoryId(e.target.value)}
          value={categoryId}
          className={styles.wrapperItemInput}
        >
          {filters[1].map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>

      <div className={styles.wrapperItem}>
        <p className={styles.wrapperItemTitle}>Цена</p>
        <div>
          <input
            type="number"
            className={styles.wrapperItemInput}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <select
            className={styles.wrapperItemInput}
            value={unitOfTime}
            onChange={(e) => setUnitOfTime(e.target.value)}
          >
            <option value="Час">За час</option>
            <option value="Курс">За курс</option>
            <option value="Месяц">За месяц</option>
          </select>
        </div>
      </div>

      <div className={styles.buttonBlock}>
        <button
          className={styles.addButton}
          disabled={disableBtn}
          onClick={() => {
            setDisableBtn(true);
            setTimeout(() => {
              setDisableBtn(false);
            }, 5000);
            createTutorCourseCard();
          }}
        >
          Создать курс репетитора ({selectedTutorId})
        </button>
      </div>
    </div>
  );
};

export default TutorServiceSection;
