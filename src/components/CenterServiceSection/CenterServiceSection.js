import { useState, useEffect } from "react";
import styles from "./CenterServiceSection.module.css";
import globals from "../../globals";

const axios = require("axios").default;

const CenterServiceSection = () => {
  const [loading, setLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(true);

  const [filters, setFilters] = useState([]);
  const [categories, setCategories] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);

  const [selectedCenterId, setSelectedCenterId] = useState(0);
  const [cardTitle, setCardTitle] = useState("");
  const [cardDescription, setCardDescription] = useState("");
  const [cardSchedule, setCardSchedule] = useState("");
  const [cardAges, setCardAges] = useState("");
  const [cardDirectionId, setCardDirectionId] = useState(1);
  const [cardPrice, setCardPrice] = useState(0);
  const [cardUnitOfTime, setCardUnitOfTime] = useState("Курс");
  const [cardIsOnline, setCardIsOnline] = useState(false);

  useEffect(async () => {
    document.title = "Oilan - База данных";
    setLoading(false);
    setIsLogged(true);

    axios.get(`https://realibi.kz/filters`).then((res) => {
      setFilters(res.data);
      console.log(res.data);
    });

    loadData();
  }, []);

  const addCourseCard = async () => {
    const data = {
      cardTitle,
      cardDescription,
      cardDirectionId,
      cardPrice,
      cardSchedule,
      cardAges,
      cardUnitOfTime,
      cardIsOnline,
      courseId: selectedCenterId,
    };

    await console.log(data);

    await axios({
      method: "post",
      url: `${globals.productionServerDomain}/addCourseCard`,
      data: data,
    })
      .then(function (res) {
        alert("Карточка создана успешно!");
      })
      .catch((err) => {
        alert("Произошла ошибка");
        console.log("error");
      });
  };

  const loadData = () => {
    axios({
      method: "post",
      url: `${globals.productionServerDomain}/courseCategories`,
    })
      .then(function (res) {
        setCategories(res.data);
      })
      .catch((err) => {
        alert("Произошла ошибка");
        console.log("error");
      });
  };

  return (
    <div className={styles.wrapper}>
      <div style={{ display: "flex", flexDirection: "column", width: "40%" }}>
        <br />
        <br />
        <span className={styles.wrapperItemTitle}>Центр:</span> <br />
        <select
          className={styles.wrapperItemInput}
          onChange={(e) => setSelectedCenterId(e.target.value)}
        >
          {filters[2] !== undefined
            ? filters[2].map((filterOption) =>
                filterOption.title !== "test" ? (
                  <option value={filterOption.id}>
                    {filterOption.title} ({filterOption.id})
                  </option>
                ) : null
              )
            : null}
        </select>{" "}
        <br />
        <span className={styles.wrapperItemTitle}>Название курса:</span> <br />
        <input
          type="text"
          onChange={(e) => setCardTitle(e.target.value)}
        />{" "}
        <br />
        <span className={styles.wrapperItemTitle}>Описание курса:</span> <br />
        <input
          type="text"
          onChange={(e) => setCardDescription(e.target.value)}
        />{" "}
        <br />
        <span className={styles.wrapperItemTitle}>Расписание:</span> <br />
        <input
          type="text"
          onChange={(e) => setCardSchedule(e.target.value)}
        />{" "}
        <br />
        <span className={styles.wrapperItemTitle}>
          Возрастная категория:
        </span>{" "}
        <br />
        <input type="text" onChange={(e) => setCardAges(e.target.value)} />{" "}
        <br />
        <span className={styles.wrapperItemTitle}>Направление:</span> <br />
        <select
          className={styles.wrapperItemInput}
          onChange={(e) => setCardDirectionId(e.target.value)}
        >
          {categories.map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
        </select>{" "}
        <br />
        <span className={styles.wrapperItemTitle}>Цена:</span> <br />
        <input
          type="number"
          onChange={(e) => setCardPrice(e.target.value)}
        />{" "}
        <br />
        <span className={styles.wrapperItemTitle}>Цена за:</span> <br />
        <select
          className={styles.wrapperItemInput}
          onChange={(e) => setCardUnitOfTime(e.target.value)}
        >
          <option value={"Курс"}>Курс</option>
          <option value={"Месяц"}>Месяц</option>
          <option value={"Час"}>Час</option>
        </select>{" "}
        <br />
        <div >
          <input
            className={styles.wrapperItemCheckbox}
            type="checkbox"
            onClick={() => {
              setCardIsOnline(!cardIsOnline);
            }}
          />{" "}
          Онлайн
        </div>
        <div className={styles.buttonBody}>
          <button
            disabled={disableBtn}
            onClick={async () => {
              await addCourseCard();
            }}
            className={styles.addButton}
          >
            Создать карточку
          </button>

          {loading ? (
            <span className={styles.loadingMessage}>
              Обработка данных...
              <img
                src="/loader.gif"
                alt="loading.png"
                className={styles.loadingImage}
              />
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CenterServiceSection;
