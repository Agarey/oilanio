import { useState, useEffect } from "react";
import styles from "./TutorSection.module.css";
import globals from "../../globals";
import PhoneInput from "react-phone-number-input/input";

const axios = require("axios").default;

const TutorSection = () => {
  const [filters, setFilters] = useState([[], [], []]);

  const [disableBtn, setDisableBtn] = useState(false);

  const [fullname, setFullname] = useState("");
  const [description, setDescription] = useState("");
  const [img_src, setImg_src] = useState(null);
  const [canWorkOnline, setCanWorkOnline] = useState(false);
  const [canWorkOffline, setCanWorkOffline] = useState(false);
  const [workingAddress, setWorkingAddress] = useState("");
  const [canWorkOnDeparture, setCanWorkOnDeparture] = useState(false);
  const [phone, setPhone] = useState("");
  const [cityId, setCityId] = useState(1);
  const [teachingLanguage, setTeachingLanguage] = useState("");

  useEffect(async () => {
    document.title = "Oilan - База данных";

    axios.get(`${globals.productionServerDomain}/filters`).then((res) => {
      setFilters(res.data);
    });

    // loadTutors();
  }, []);

  const createTutor = async () => {
    const data = {
      fullname,
      img_src,
      description,
      canWorkOnline,
      canWorkOffline,
      phone,
      cityId,
      canWorkOnDeparture,
      teachingLanguage,
      workingAddress,
    };

    await axios({
      method: "post",
      url: `${globals.productionServerDomain}/createTutor`,
      data: data,
    })
      .then(function (res) {
        alert("Репетитор успешно создан");
      })
      .catch((err) => {
        alert("Произошла ошибка");
      });
  };

//   const loadTutors = async () => {
//     await axios({
//       method: "get",
//       url: `${globals.productionServerDomain}/tutors`,
//     })
//       .then(function (res) {
//         setSelectedTutorId(res.data[0].id);
//         setTutorsList(res.data);
//       })
//       .catch((err) => {
//         alert("Произошла ошибка при загрузке списка репетиторов!");
//       });
//   };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperItem}>
        <span className={styles.wrapperItemTitle}>ФИО</span> <br />
        <input
          type="text"
          className={styles.wrapperItemInput}
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div className={styles.wrapperItem}>
        <span className={styles.wrapperItemTitle}>О репетиторе: </span>{' '}
        <br />
        <textarea
          type="text"
          className={styles.wrapperItemInput}
          style={{ width: "50%", height: "100px" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className={styles.wrapperItem}>
        <span className={styles.wrapperItemTitle}>Ссылка на фото:</span>{' '}
        <br />
        <input
          type="text"
          className={styles.wrapperItemInput}
          onChange={(e) => setImg_src(e.target.value)}
        />
      </div>
      <div className={styles.wrapperItem}>
        <div style={{ display: "flex" }}>
          <p className={styles.wrapperItemTitle}>Может работать онлайн</p>
          <input
            style={{ marginLeft: 10 }}
            type="checkbox"
            className={styles.wrapperItemCheckbox}
            value={canWorkOnline}
            onClick={(e) => setCanWorkOnline(e.target.checked)}
          />
        </div>
      </div>

      <div className={styles.wrapperItem}>
        <div style={{ display: "flex" }}>
          <p className={styles.wrapperItemTitle}>Может работать офлайн</p>
          <input
            style={{ marginLeft: 10 }}
            type="checkbox"
            className={styles.wrapperItemCheckbox}
            value={canWorkOffline}
            onClick={(e) => setCanWorkOffline(e.target.checked)}
          />
        </div>
      </div>

      <div className={styles.wrapperItem}>
        <p className={styles.wrapperItemTitle}>Адрес офлайн работы</p>
        <input
          type="text"
          className={styles.wrapperItemInput}
          value={workingAddress}
          disabled={!canWorkOffline}
          onChange={(e) => setWorkingAddress(e.target.value)}
        />
      </div>

      <div className={styles.wrapperItem}>
        <div style={{ display: "flex" }}>
          <p className={styles.wrapperItemTitle}>
            Может работать на выезд (дома у студента)
          </p>
          <input
            style={{ marginLeft: 10 }}
            type="checkbox"
            className={styles.wrapperItemCheckbox}
            value={canWorkOnDeparture}
            onClick={(e) => setCanWorkOnDeparture(e.target.checked)}
          />
        </div>
      </div>

      <div className={styles.wrapperItem}>
        <p className={styles.wrapperItemTitle}>Номер телефона</p>
        <PhoneInput
          className={styles.wrapperItemInput}
          international={false}
          defaultCountry="KZ"
          value={phone}
          onChange={setPhone}
        />
      </div>

      <div className={styles.wrapperItem}>
        <p className={styles.wrapperItemTitle}>Город</p>
        <select className={styles.wrapperItemInput} onChange={(e) => setCityId(e.target.value)} value={cityId}>
          {filters[0].map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>

      <div className={styles.wrapperItem}>
        <p className={styles.wrapperItemTitle}>Язык обучения</p>
        <select
          className={styles.wrapperItemInput}
          onChange={(e) => setTeachingLanguage(e.target.value)}
          value={teachingLanguage}
        >
          <option value={"Английский"}>Английский</option>
          <option value={"Русский"}>Русский</option>
          <option value={"Казахский"}>Казахский</option>
          <option value={"Русский, Казахский"}>Русский, Казахский</option>
          <option value={"Русский, Английский"}>Русский, Английский</option>
          <option value={"Казахский, Английский"}>Казахский, Английский</option>
          <option value={"Все языки"}>Все языки</option>
        </select>
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
            createTutor();
            // loadTutors();
          }}
        >
          Добавить репетитора
        </button>
      </div>
    </div>
  );
};

export default TutorSection;
