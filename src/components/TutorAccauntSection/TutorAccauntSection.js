import { useState, useEffect } from "react";
import styles from './TutorAccauntSection.module.css';

import globals from "../../globals";
const axios = require("axios").default;

const TutorAccountSection = () => {
  const [disableBtn, setDisableBtn] = useState(false);

  const [selectedTutorId, setSelectedTutorId] = useState(1);
  const [tutorsList, setTutorsList] = useState([]);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState('');

  useEffect(async () => {
    document.title = "Oilan - База данных";

    // axios.get(`${globals.productionServerDomain}/filters`).then((res) => {
    //   setFilters(res.data);
    // });

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

  const createTutorAccount = async () => {
    const data = {
      login,
      password,
      selectedTutorId,
    };

    await axios({
      method: "post",
      url: `${globals.productionServerDomain}/createTutorAccount`,
      data: data,
    })
      .then(function (res) {
        alert(`Аккаунт репетитора ${fullname} успешно создан!`);
      })
      .catch((err) => {
        alert(`Произошла ошибка ${err}`);
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperItem}>
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
        <p className={styles.wrapperItemTitle}>Логин</p>
        <input
          type="text"
          className={styles.wrapperItemInput}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </div>

      <div className={styles.wrapperItem}>
        <p className={styles.wrapperItemTitle}>Пароль</p>
        <input
          type="text"
          className={styles.wrapperItemInput}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles.buttonBlock}>
        <button
          disabled={disableBtn}
          className={styles.addButton}
          onClick={() => {
            setDisableBtn(true);
            setTimeout(() => {
              setDisableBtn(false);
            }, 5000);
            createTutorAccount();
          }}
        >
          Создать аккаунт репетитора (id {selectedTutorId})
        </button>
      </div>
    </div>
  );
};

export default TutorAccountSection;
