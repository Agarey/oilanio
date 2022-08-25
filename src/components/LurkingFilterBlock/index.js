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
  const [category, setCategory] = useState(false);
  const [type, setType] = useState(false);
  const [isOnline, setIsOnline] = useState(0);
  const [price, setPrice] = useState("0");
  const [cityId, setCityId] = useState("1");
  const [directionId, setDirectionId] = useState(1);
  const [categoryId, setCategoryId] = useState(0);
  const [typeId, setTypeId] = useState(0)
  const [catIds, setCatIds] = useState([])

  const getCards = async () => {
    console.log("Функция getCards");
    setCatIds([])
    let currentCat
    if (typeId != 0){
      currentCat = typeId
    } else if (categoryId != 0){
      currentCat = categoryId
    } else {
      currentCat = directionId
    }
    catIds.push(Number(currentCat))
    directions.map((item) => {
      if (item.parent == currentCat){
        catIds.push(item.id)
      }
    })
    console.log('ids',catIds)
    if (props.isTutors) {
      const data = {
        centerName: "",
        city: cityId,
        direction: (typeId!=0)?typeId.toString():(categoryId!=0)?categoryId.toString():directionId.toString(),
        price: price,
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
        direction: catIds,
        price: price,
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
          onChange={(e) => {
            setCategory(true)
            setType(false)
            setCategoryId(0)
            setTypeId(0)
            setDirectionId(e.target.value)}
          }
        >
          <option value="1">Направления</option>
          {directions.map((item) => {
            if ((item.name != "test") && (item.parent == 0)) {
              return <option value={item.id}>{item.name}</option>;
            }
          })}
        </select>
        <select
          style={{display:category?'block':'none'}}
          className={styles.select}
          onChange={(e) => {
            setType(true)
            setTypeId(0)
            setCategoryId(e.target.value)
            }
          }
        >
          <option value="1">Категории</option>
          {directions.map((item) => {
            if (item.parent == directionId) {
              return <option value={item.id}>{item.name}</option>;
            }
          })}
        </select>
        <select
          style={{display:type?'block':'none'}}
          className={styles.select}
          onChange={(e) => {
            setTypeId(e.target.value)
            }
          }
        >
          <option value="1">Тип</option>
          {directions.map((item) => {
            if (item.parent == categoryId) {
              return <option value={item.id}>{item.name}</option>;
            }
          })}
        </select>
        <select
          className={styles.select}
          onChange={(e) => setIsOnline(e.target.value)}
        >
          <option value={0}>Формат занятий</option>
          <option value={1}>Онлайн</option>
          <option value={2}>Офлайн</option>
        </select>
        <select
          className={styles.select}
          onChange={(e) => setPrice(e.target.value)}
        >
          <option value="0">Цена</option>
          <option value={"0-20000"}>0 - 20 000KZT</option>
          <option value={"20000-40000"}>20 000 - 40 000KZT</option>
          <option value={"40000-60000"}>40 000 - 60 000KZT</option>
          <option value={"60000-80000"}>60 000 - 80 000KZT</option>
          <option value={"80000-100000"}>80 000 - 100 000KZT</option>
          <option value={"100000"}>100 000KZT +</option>
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
