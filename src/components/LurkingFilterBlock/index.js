import styles from "./LurkingFilterBLock.module.css";
import React, { useState } from "react";
import { Image } from "react-bootstrap";
import classnames from "classnames";
import { default as axios } from "axios";
import globals from "../../globals";

const LurkingFilterBlock = ({
  cities,
  directions,
  setCoursesLoading,
  setCourseCards,
  setTutorCards,
  ...props
}) => {
  const [show, setShow] = useState(false);

  const [isOnline, setIsOnline] = useState(0);
  const [priceFrom, setPriceFrom] = useState("0");
  const [priceTo, setPriceTo] = useState("0");
  const [cityId, setCityId] = useState("1");
  const [directionId, setDirectionId] = useState(1);

  const getCards = async () => {
    console.log("Функция getCards");
    if (props.isTutors) {
      const data = {
        centerName: "",
        city: cityId,
        direction: directionId.toString(),
        priceFrom: priceFrom,
        priceTo: priceTo,
        center: "0",
        isOnline: isOnline,
      };
      console.log(data.isOnline);

      let postResult = await axios.post(
        `${globals.productionServerDomain}/tutorCourseCardsFilter`,
        data
      );

      console.log("postResult равно", postResult.data);
      setTutorCards(postResult.data);
      setCoursesLoading(false);
    } else {
      const data = {
        centerName: "",
        city: cityId,
        direction: directionId.toString(),
        priceFrom: priceFrom,
        priceTo: priceTo,
        center: "0",
        isOnline: isOnline,
        //individualLesson: individualLesson,
        sortType: "0",
      };

      console.log("Tutor", data);
      let postResult = await axios.post(
        `${globals.productionServerDomain}/courseCardsFilter/`,
        data
      );

      console.log("postResult равно", postResult.data);
      await setCourseCards(postResult.data);
      await setCoursesLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span
          className={classnames(styles.btn)}
          onClick={() => {
            setShow(!show);
          }}
        >
          Фильтр{" "}
          <Image
            src={"/Vector-4.png"}
            style={{ height: 8 }}
            className={show ? styles.rotateBtn : null}
          />
        </span>
      </div>

      <div className={classnames(styles.list, show ? styles.listShow : null)}>
        <select
          className={styles.select}
          onChange={(e) => setCityId(e.target.value)}
        >
          <option value="0">Город</option>
          {cities.map((item) => {
            if (item.name != "test") {
              return <option value={item.id}>{item.name}</option>;
            }
          })}
        </select>
        <select
          className={styles.select}
          onChange={(e) => setDirectionId(e.target.value)}
        >
          <option value="1">Направления</option>
          {directions.map((item) => {
            if (item.name != "test") {
              return <option value={item.id}>{item.name}</option>;
            }
          })}
        </select>
        <select
          className={styles.select}
          onChange={(e) => setPriceFrom(e.target.value)}
        >
          <option value="0">Минимальная цена</option>
          <option value={0}>0 KZT</option>
          <option value={20000}>20 000 KZT</option>
          <option value={40000}>40 000 KZT</option>
          <option value={60000}>60 000 KZT</option>
          <option value={80000}>80 000 KZT</option>
          <option value={100000}>100 000 KZT +</option>
        </select>
        <select
          className={styles.select}
          onChange={(e) => setPriceTo(e.target.value)}
        >
          <option value="0">Максимальная цена</option>
          <option 
            style={priceFrom >= 20000 ? {display: "none"} : {display: "block"}} 
            value={20000}
          >
            20 000 KZT
          </option>
          <option 
            style={priceFrom >= 40000 ? {display: "none"} : {display: "block"}} 
            value={40000}
          >
            40 000 KZT
          </option>
          <option 
            style={priceFrom >= 60000 ? {display: "none"} : {display: "block"}} 
            value={60000}
          >
            60 000 KZT
          </option>
          <option 
            style={priceFrom >= 80000 ? {display: "none"} : {display: "block"}} 
            value={80000}
          >
            80 000 KZT
          </option>
          <option 
            style={priceFrom >= 100000 ? {display: "none"} : {display: "block"}} 
            value={100000}
          >
            100 000 + KZT
          </option>
        </select>
        <select
          className={styles.select}
          onChange={(e) => setIsOnline(e.target.value)}
        >
          <option value={0}>Формат занятий</option>
          <option value={1}>Онлайн</option>
          <option value={2}>Офлайн</option>
        </select>
        <button
          className={styles.button}
          onClick={() => {
            props.setCardsToShow(8);
            setCoursesLoading(false);
            getCards();
          }}
        >
          Найти курс
        </button>
      </div>
    </div>
  );
};

export default LurkingFilterBlock;
