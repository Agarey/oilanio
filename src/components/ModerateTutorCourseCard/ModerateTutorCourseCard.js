import React, { useState, useEffect } from "react";
import styles from "./ModerateTutorCourseCard.module.css";
import globals from "../../globals";
import { Image } from "react-bootstrap";
const axios = require("axios").default;

export default function ModerateTutorCourseCard(props) {
  const [cardId, setCardId] = useState(props.course.id);
  const [tutorsName, setTutorsName] = useState(props.course.tutorsName);
  const [tutorsId, setTutorsId] = useState(props.course.tutorsId);
  const [imgSrc, setImgSrc] = useState(props.course.img_src);
  const [schedule, setSchedule] = useState(props.course.schedule);
  const [price, setPrice] = useState(props.course.price);
  const [currency, setCurrency] = useState(props.course.currency);
  const [unitOfTime, setUnitOfTime] = useState(props.course.unit_of_time);
  const [title, setTitle] = useState(props.course.title);
  const [courseCategory, setCourseCategory] = useState(
    props.course.courseCategory
  );
  const [courseCategoryId, setCourseCategoryId] = useState(
    props.course.category_id
  );
  const [isOnline, setIsOnline] = useState(props.course.is_online);
  const [teachingLanguage, setTeachingLanguage] = useState(
    props.course.teaching_language
  );
  const [minAge, setMinAge] = useState(props.course.min_age);
  const [maxAge, setMaxAge] = useState(props.course.max_age);
  const [tutorDescription, setTutorDescription] = useState(
    props.course.tutorDescription
  );
  const [startRequirements, setStartRequirements] = useState(
    props.course.start_requirements
  );
  const [expectingResults, setExpectingResults] = useState(
    props.course.expecting_results
  );
  const [verificated, setVerificated] = useState(props.course.verificated);

  const [editImgSrc, setEditImgSrc] = useState(false);
  const [savedImgSrc, setSavedImgSrc] = useState(true);
  const [editSchedule, setEditSchedule] = useState(false);
  const [savedSchedule, setSavedSchedule] = useState(true);
  const [editPrice, setEditPrice] = useState(false);
  const [savedPrice, setSavedPrice] = useState(true);
  const [editCurrency, setEditCurrency] = useState(false);
  const [savedCurrency, setSavedCurrency] = useState(true);
  const [editUnitOfTime, setEditUnitOfTime] = useState(false);
  const [savedUnitOfTime, setSavedUnitOfTime] = useState(true);
  const [editTitle, setEditTitle] = useState(false);
  const [savedTitle, setSavedTitle] = useState(true);
  const [editCourseCategory, setEditCourseCategory] = useState(false);
  const [savedCourseCategory, setSavedCourseCategory] = useState(true);
  const [editCategoryId, setEditCategoryId] = useState(false);
  const [savedCategoryId, setSavedCategoryId] = useState(true);
  const [editIsOnline, setEditIsOnline] = useState(false);
  const [savedIsOnline, setSavedIsOnline] = useState(true);
  const [editTeachingLanguage, setEditTeachingLanguage] = useState(false);
  const [savedTeachingLanguage, setSavedTeachingLanguage] = useState(true);
  const [editMinAge, setEditMinAge] = useState(false);
  const [savedMinAge, setSavedMinAge] = useState(true);
  const [editMaxAge, setEditMaxAge] = useState(false);
  const [savedMaxAge, setSavedMaxAge] = useState(true);
  const [editTutorDescription, setEditTutorDescription] = useState(false);
  const [savedTutorDescription, setSavedTutorDescription] = useState(true);
  const [editStartRequirements, setEditStartRequirements] = useState(false);
  const [savedStartRequirement, setSavedStartRequirements] = useState(true);
  const [editExpectingResults, setEditExpectingResults] = useState(false);
  const [savedExpectingResults, setSavedExpectingResults] = useState(true);
  const [editVerificated, setEditVerificated] = useState(false);
  const [savedverificated, setSavedVerificated] = useState(true);

  const [filters, setFilters] = useState([[], [], []]);

  const [teachingLanguages, setTeachingLanguages] = useState("");

  useEffect(() => {
    setCardId(props.course.id);
    setTutorsName(props.course.tutorsName);
    setTutorsId(props.course.tutorsId);
    setImgSrc(props.course.img_src);
    setSchedule(props.course.schedule);
    setPrice(props.course.price);
    setCurrency(props.course.currency);
    setUnitOfTime(props.course.unit_of_time);
    setTitle(props.course.title);
    setCourseCategory(props.course.courseCategory);
    setIsOnline(props.course.is_online);
    setTeachingLanguage(props.course.teaching_language);
    setMinAge(props.course.min_age);
    setMaxAge(props.course.max_age);
    setTutorDescription(props.course.tutorDescription);
    setStartRequirements(props.course.start_requirements);
    setExpectingResults(props.course.expecting_results);
    setVerificated(props.course.verificated);
  }, [props]);
  useEffect(() => {
    axios.get(`${globals.productionServerDomain}/filters`).then((res) => {
      setFilters(res.data);
      // console.log(res.data);
    });
  }, []);

  useEffect(() => {
    console.log('is online')
    console.log(isOnline)
  }, [isOnline])

  const updateTutorsCourseTitle = (value) => {
    let data = {
      id: value.id,
      title: value.title,
    };
    console.log(data);
    axios
      .post(`${globals.productionServerDomain}/setTutorCourseTitle/`, {
        id: value.id,
        title: value.title,
      })
      .then(alert("Changes saved!"));
  };

  const updateSchedule = (value) => {
    let data = {
      id: value.id,
      schedule: value.schedule,
    };
    console.log(data);
    axios
      .post(`${globals.productionServerDomain}/updateTutorCourseSchedule/`, {
        id: value.id,
        schedule: value.schedule,
      })
      .then(alert("Changes saved!"));
  };

  const updateTutorsCourseImg = (value) => {};

  const updateTutorsCoursePrice = (value) => {
    let data = {
      id: value.id,
      price: value.price,
      currency: value.currency,
      unitOfTime: value.unitOfTime,
    };
    console.log(data);
    axios
      .post(`${globals.productionServerDomain}/updateTutorCoursePrice/`, {
        id: value.id,
        price: value.price,
        currency: value.currency,
        unitOfTime: value.unitOfTime,
      })
      .then(alert("Changes saved!"));
  };

  const updateTutorsCourseCategory = (value) => {
    let data = {
      id: value.id,
      category_id: value.courseCategoryId,
    };
    console.log(data);
    axios
      .post(`${globals.productionServerDomain}/updateTutorCourseCategory/`, {
        id: value.id,
        category_id: value.courseCategoryId,
      })
      .then(alert("Changes saved!"));
  };

  const updateTeachingLanguage = (value) => {
    let data = {
      id: value.id,
      teachingLanguage: value.teachingLanguage,
    };
    console.log(data);
    axios
      .post(`${globals.productionServerDomain}/updateTutorsTeachingLanguage/`, {
        id: value.id,
        teachingLanguage: value.teachingLanguage,
      })
      .then(alert("Changes saved!"));
  };

  const updateMinMaxAges = (value) => {
    let data = {
      id: value.id,
      minAge: value.minAge,
      maxAge: value.maxAge,
    };
    console.log(data);
    axios
      .post(`${globals.productionServerDomain}/updateTutorCourseMinMaxAges/`, {
        id: value.id,
        minAge: value.minAge,
        maxAge: value.maxAge,
      })
      .then(alert("Changes saved!"));
  };

  const updateIsOnline = (value) => {
    let data = {
      id: value.id,
      isOnline: value.isOnline,
    };
    console.log(data);
    axios
      .post(`${globals.productionServerDomain}/setTutorCourseIsOnline/`, {
        id: value.id,
        isOnline: value.isOnline,
      })
      .then(alert("Changes saved!"));
  };

  const updateTutorsStartRequirements = (value) => {
    let data = {
      id: value.id,
      startRequirements: value.startRequirements,
    };
    console.log(data);
    axios
      .post(`${globals.productionServerDomain}/updateTutorCourseStartRequirements/`, {
        id: value.id,
        startRequirements: value.startRequirements,
      })
      .then(alert("Changes saved!"));
  };

  const updateExpectingResults = (value) => {
    let data = {
      id: value.id,
      expectingResults: value.expectingResults,
    };
    console.log(data);
    axios
      .post(`${globals.productionServerDomain}/updateTutorCourseExpectingResults/`, {
        id: value.id,
        expectingResults: value.expectingResults,
      })
      .then(alert("Changes saved!"));
  };

  const updateTutorDescription = (value) => {
    let data = {
      id: value.id,
      tutorDescription: value.tutorDescription,
    };
    console.log(data);
    axios
      .post(`${globals.productionServerDomain}/updateTutorDescription/`, {
        id: value.id,
        tutorDescription: value.tutorDescription,
      })
      .then(alert("Changes saved!"));
  };

  const updateIsVerificated = (value) => {
    let data = {
      id: value.id,
      verificated: value.verificated,
    };
    console.log('verificated:')
    console.log(data);
    axios
      .post(
        `${globals.productionServerDomain}/setTutorCourseCardVerificated/`,
        {
          id: value.id,
          verificated: value.verificated,
        }
      )
      .then(alert("Changes saved!"));
  };

  const parseAges = () => {
    if (!minAge || minAge == "-") {
      return `До ${maxAge} лет`;
    } else if (!maxAge || maxAge == "-") {
      return `От ${minAge} лет`;
    } else {
      return `От ${minAge} до ${maxAge}`;
    }
  };

  const str = String(props.course.img_src);
  const substr = "realibi";
  const defaultAvatar = "https://realibi.kz/file/338803.png";
  const checkLink = () => {
    return str.includes(substr) && str !== defaultAvatar;
  };

  return (
    <div className={styles.cardBlock}>
      <div className={styles.primalBlock}>
        <p>
          <b>Id репетитора: </b>
          {tutorsId}
        </p>
        <p>
          <b>Репетитор: </b>
          {tutorsName}
        </p>
        <p>
          <b>Id карточки: </b>
          {cardId}
        </p>

        <div className={styles.editRow}>
          <p
            style={
              props.course.title
                ? props.course.title == props.course.expecting_results ||
                  props.course.title == props.course.tutorDescription
                  ? savedTitle
                    ? { display: "block", backgroundColor: "yellow" }
                    : { display: "none", backgroundColor: "yellow" }
                  : savedTitle
                  ? { display: "block" }
                  : { display: "none" }
                : savedTitle
                ? { display: "block", backgroundColor: "red" }
                : { display: "none", backgroundColor: "red" }
            }
          >
            <b>Название курса: </b>
            {title}
          </p>
          <button
            onClick={() => {
              setSavedTitle(false);
              setEditTitle(true);
            }}
            style={savedTitle ? { display: "block" } : { display: "none" }}
            className={styles.editButton}
          >
            &#128393;
          </button>
          <input
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            value={title}
            className={styles.moderateRow}
            style={editTitle ? { display: "block" } : { display: "none" }}
          />
          <button
            className={styles.saveButton}
            style={editTitle ? { display: "block" } : { display: "none" }}
            onClick={() => {
              setEditTitle(false);
              setSavedTitle(true);
              updateTutorsCourseTitle({
                id: props.course.id,
                title: title,
              });
            }}
          >
            &#10003;
          </button>
        </div>
        <p>
          <b>Лого: </b>
          <div
            className={styles.image_block}
            style={
              imgSrc
                ? {
                    backgroundImage: `url(${imgSrc})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundColor: "white",
                    border: "1px solid white",
                    width: "100%",
                    aspectRatio: "1/1",
                  }
                : {
                    backgroundColor: "red",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    border: "1px solid white",
                    width: "100%",
                    aspectRatio: "1/1",
                  }
            }
          >
            <Image style={{ width: "100%", opacity: "0.5" }} />
          </div>
          <button
            onClick={() => {
              setEditAvatar(true);
            }}
          >
            Изменить
          </button>
        </p>
        <div className={styles.editRow}>
          <p
            className={styles.link}
            style={
              props.course.img_src
                ? checkLink()
                  ? savedImgSrc
                    ? { display: "block" }
                    : { display: "none" }
                  : savedImgSrc
                  ? { display: "block", backgroundColor: "yellow" }
                  : { display: "none", backgroundColor: "yellow" }
                : savedImgSrc
                ? { display: "block", backgroundColor: "red" }
                : { display: "none", backgroundColor: "red" }
            }
          >
            <b>Ссылка на лого:</b>
            <a target="blank" href={props.course.img_src}>
              {imgSrc}
            </a>
          </p>
          <button
            className={styles.editButton}
            onClick={() => {
              setSavedImgSrc(false);
              setEditImgSrc(true);
            }}
            style={savedImgSrc ? { display: "block" } : { display: "none" }}
          >
            &#128393;
          </button>
          <input
            onChange={(event) => {
              setImgSrc(event.target.value);
            }}
            style={editImgSrc ? { display: "block" } : { display: "none" }}
            className={styles.moderateRow}
            value={imgSrc}
          />
          <button
            onClick={() => {
              setSavedImgSrc(true);
              setEditImgSrc(false);
              updateTutorsCourseImg({
                id: props.course.course_id,
                logo: imgSrc,
              });
            }}
            style={editImgSrc ? { display: "block" } : { display: "none" }}
            className={styles.saveButton}
          >
            &#10003;
          </button>
        </div>
      </div>
      <div className={styles.primalBlock}>
        <div className={styles.editRow}>
          <p
            style={
              props.course.schedule
                ? savedSchedule
                  ? { display: "block" }
                  : { display: "none" }
                : savedSchedule
                ? { display: "block", backgroundColor: "red" }
                : { display: "none", backgroundColor: "red" }
            }
          >
            <b>Расписание: </b>
            {schedule}
          </p>
          <button
            onClick={() => {
              setSavedSchedule(false);
              setEditSchedule(true);
            }}
            style={savedSchedule ? { display: "block" } : { display: "none" }}
            className={styles.editButton}
          >
            &#128393;
          </button>
          <input
            onChange={(event) => {
              setSchedule(event.target.value);
            }}
            style={editSchedule ? { display: "block" } : { display: "none" }}
            className={styles.moderateRow}
            value={schedule}
          />
          <button
            onClick={() => {
              setSavedSchedule(true);
              setEditSchedule(false);
              updateSchedule({
                id: props.course.id,
                schedule: schedule,
              });
            }}
            style={editSchedule ? { display: "block" } : { display: "none" }}
            className={styles.saveButton}
          >
            &#10003;
          </button>
        </div>
        <div className={styles.editRow}>
          <p
            style={
              props.course.price &&
              props.course.currency &&
              props.course.unit_of_time
                ? savedPrice && savedCurrency && savedUnitOfTime
                  ? { display: "block" }
                  : { display: "none" }
                : savedPrice && savedCurrency && savedUnitOfTime
                ? { display: "block", backgroundColor: "red" }
                : { display: "none", backgroundColor: "red" }
            }
          >
            <b>Цена:</b> {price}
            {currency}/{unitOfTime}
          </p>

          <button
            onClick={() => {
              setSavedPrice(false);
              setEditPrice(true);
              setSavedCurrency(false);
              setEditCurrency(true);
              setSavedUnitOfTime(false);
              setEditUnitOfTime(true);
            }}
            style={
              savedPrice && savedCurrency && savedUnitOfTime
                ? { display: "block" }
                : { display: "none" }
            }
            className={styles.editButton}
          >
            &#128393;
          </button>
          <input
            className={styles.moderateRowPart1}
            onChange={(event) => {
              setEditPrice(event.target.value);
            }}
            style={editPrice ? { display: "block" } : { display: "none" }}
            value={price}
          />
          <input
            className={styles.moderateRowPart2}
            onChange={(event) => {
              setCurrency(event.target.value);
            }}
            style={editCurrency ? { display: "block" } : { display: "none" }}
            value={currency}
          />
          <input
            className={styles.moderateRowPart3}
            onChange={(event) => {
              setUnitOfTime(event.target.value);
            }}
            style={editUnitOfTime ? { display: "block" } : { display: "none" }}
            value={unitOfTime}
          />
          <button
            onClick={() => {
              setSavedPrice(true);
              setEditPrice(false);
              setSavedCurrency(true);
              setEditCurrency(false);
              setSavedUnitOfTime(true);
              setEditUnitOfTime(false);
              updateTutorsCoursePrice({
                id: props.course.id,
                price: price,
                currency: currency,
                unitOfTime: unitOfTime,
              });
            }}
            style={
              editPrice && editCurrency && editUnitOfTime
                ? { display: "block" }
                : { display: "none" }
            }
            className={styles.saveButton}
          >
            &#10003;
          </button>
        </div>
        <div className={styles.editRow}>
          <p
            style={
              props.course.courseCategory
                ? savedCourseCategory
                  ? { display: "block" }
                  : { display: "none" }
                : savedCourseCategory
                ? { display: "block", backgroundColor: "red" }
                : { display: "none", backgroundColor: "red" }
            }
          >
            <b>Направление:</b> {courseCategory}
          </p>
          <button
            onClick={() => {
              setSavedCourseCategory(false);
              setEditCourseCategory(true);
              setSavedCategoryId(false);
              setEditCategoryId(true);
            }}
            style={
              savedCourseCategory && savedCategoryId
                ? { display: "block" }
                : { display: "none" }
            }
            className={styles.editButton}
          >
            &#128393;
          </button>
          <select
            className={styles.moderateRow}
            value={courseCategory}
            style={
              editCourseCategory && editCategoryId
                ? { display: "block" }
                : { display: "none" }
            }
            onChange={(e) => {
              setCourseCategoryId(e.target.value)
            }}
          >
            {filters[1] !== undefined
              ? filters[1].map((filterOption) =>
                  filterOption.name !== "test" ? (
                    <option
                      value={filterOption.id}
                      selected={
                        filterOption.id == courseCategoryId ? true : false
                      }
                    >
                      {filterOption.name}
                    </option>
                  ) : null
                )
              : null}
          </select>
          <button
            onClick={() => {
              setSavedCourseCategory(true);
              setEditCourseCategory(false);
              setSavedCategoryId(true);
              setEditCategoryId(false);
              updateTutorsCourseCategory({
                id: props.course.id,
                category_id: courseCategoryId,
              });
            }}
            style={
              editCourseCategory && editCategoryId
                ? { display: "block" }
                : { display: "none" }
            }
            className={styles.saveButton}
          >
            &#10003;
          </button>
        </div>
        <div className={styles.editRow}>
          <p
            style={
              props.course.teaching_language
                ? savedTeachingLanguage
                  ? { display: "block" }
                  : { display: "none" }
                : savedTeachingLanguage
                ? { display: "block", backgroundColor: "red" }
                : { display: "none", backgroundColor: "red" }
            }
          >
            <b>Языки обучения: </b>
            {teachingLanguage}
          </p>
          <button
            onClick={() => {
              setSavedTeachingLanguage(false);
              setEditTeachingLanguage(true);
            }}
            style={
              savedTeachingLanguage ? { display: "block" } : { display: "none" }
            }
            className={styles.editButton}
          >
            &#128393;
          </button>
          <select
            value={teachingLanguage}
            className={styles.moderateRow}
            style={
              editTeachingLanguage ? { display: "block" } : { display: "none" }
            }
            onChange={(e) => setTeachingLanguage(e.target.value)}
          >
            <option value={"Английский"}>Английский</option>
            <option value={"Русский"}>Русский</option>
            <option value={"Казахский"}>Казахский</option>
            <option value={"Русский, Казахский"}>Русский, Казахский</option>
            <option value={"Русский, Английский"}>Русский, Английский</option>
            <option value={"Казахский, Английский"}>
              Казахский, Английский
            </option>
            <option value={"Все языки"}>Все языки</option>
          </select>
          <button
            onClick={() => {
              setSavedTeachingLanguage(true);
              setEditTeachingLanguage(false);
              updateTeachingLanguage({
                id: props.course.tutorsId,
                teachingLanguage: teachingLanguage,
              });
            }}
            style={
              editTeachingLanguage ? { display: "block" } : { display: "none" }
            }
            className={styles.saveButton}
          >
            &#10003;
          </button>
        </div>

        <div className={styles.editRow}>
          <p
            style={
              props.course.min_age ||
              props.course.max_age ||
              (props.course.min_age == "-" && props.course.max_age == "-")
                ? savedMinAge && savedMaxAge
                  ? { display: "block" }
                  : { display: "none" }
                : savedMinAge && savedMaxAge
                ? { display: "block", backgroundColor: "red" }
                : { display: "none", backgroundColor: "red" }
            }
          >
            <b>Цена:</b>
            {parseAges()}
          </p>

          <button
            onClick={() => {
              setSavedMinAge(false);
              setEditMinAge(true);
              setSavedMaxAge(false);
              setEditMaxAge(true);
            }}
            style={
              savedMinAge && savedMaxAge
                ? { display: "block" }
                : { display: "none" }
            }
            className={styles.editButton}
          >
            &#128393;
          </button>

          <input
            className={styles.moderateRowPart1}
            onChange={(event) => {
              setMinAge(event.target.value);
            }}
            style={editMinAge ? { display: "block" } : { display: "none" }}
            value={minAge}
          />
          <input
            className={styles.moderateRowPart3}
            onChange={(event) => {
              setMaxAge(event.target.value);
            }}
            style={editMaxAge ? { display: "block" } : { display: "none" }}
            value={maxAge}
          />

          <button
            onClick={() => {
              setSavedMinAge(true);
              setEditMinAge(false);
              setSavedMaxAge(true);
              setEditMaxAge(false);
              updateMinMaxAges({
                id: props.course.id,
                minAge: minAge,
                maxAge: maxAge,
              });
            }}
            style={
              editMinAge && editMaxAge
                ? { display: "block" }
                : { display: "none" }
            }
            className={styles.saveButton}
          >
            &#10003;
          </button>
        </div>
      </div>
      <div className={styles.aboutBlock}>
        <div className={styles.editRow}>
          <p
            style={
              props.course.start_requirements
                ? props.course.start_requirements ==
                    props.course.tutorDescription ||
                  props.course.start_requirements == props.course.title ||
                  props.course.start_requirements ==
                    props.course.expecting_results
                  ? savedStartRequirement
                    ? { display: "block", backgroundColor: "yellow" }
                    : { display: "none", backgroundColor: "yellow" }
                  : savedStartRequirement
                  ? { display: "block" }
                  : { display: "none" }
                : savedStartRequirement
                ? { display: "block", backgroundColor: "red" }
                : { display: "none", backgroundColor: "red" }
            }
          >
            <b>Начальные требования:</b> {startRequirements}
          </p>
          <button
            onClick={() => {
              setSavedStartRequirements(false);
              setEditStartRequirements(true);
            }}
            style={
              savedStartRequirement ? { display: "block" } : { display: "none" }
            }
            className={styles.editButton}
          >
            &#128393;
          </button>
          <textarea
            onChange={(event) => {
              setStartRequirements(event.target.value);
            }}
            style={
              editStartRequirements ? { display: "block" } : { display: "none" }
            }
            className={styles.moderateRow}
            value={startRequirements}
          ></textarea>
          <button
            onClick={() => {
              setSavedStartRequirements(true);
              setEditStartRequirements(false);
              updateTutorsStartRequirements({
                id: props.course.id,
                startRequirements: startRequirements,
              });
            }}
            style={
              editStartRequirements ? { display: "block" } : { display: "none" }
            }
            className={styles.saveButton}
          >
            &#10003;
          </button>
        </div>
        <div className={styles.editRow}>
          <p
            style={
              props.course.expecting_results
                ? props.course.expecting_results ==
                    props.course.tutorDescription ||
                  props.course.expecting_results == props.course.title ||
                  props.course.expecting_results ==
                    props.course.start_requirements
                  ? savedExpectingResults
                    ? { display: "block", backgroundColor: "yellow" }
                    : { display: "none", backgroundColor: "yellow" }
                  : savedExpectingResults
                  ? { display: "block" }
                  : { display: "none" }
                : savedExpectingResults
                ? { display: "block", backgroundColor: "red" }
                : { display: "none", backgroundColor: "red" }
            }
          >
            <b>Ожидаемый результат:</b> {startRequirements}
          </p>
          <button
            onClick={() => {
              setSavedExpectingResults(false);
              setEditExpectingResults(true);
            }}
            style={
              savedExpectingResults ? { display: "block" } : { display: "none" }
            }
            className={styles.editButton}
          >
            &#128393;
          </button>
          <textarea
            onChange={(event) => {
              setExpectingResults(event.target.value);
            }}
            style={
              editExpectingResults ? { display: "block" } : { display: "none" }
            }
            className={styles.moderateRow}
            value={expectingResults}
          ></textarea>
          <button
            onClick={() => {
              setSavedExpectingResults(true);
              setEditExpectingResults(false);
              updateExpectingResults({
                id: props.course.id,
                expectingResults: expectingResults,
              });
            }}
            style={
              editExpectingResults ? { display: "block" } : { display: "none" }
            }
            className={styles.saveButton}
          >
            &#10003;
          </button>
        </div>

        <div className={styles.editRow}>
          <p
            style={
              props.course.tutorDescription
                ? props.course.tutorDescription ==
                    props.course.expecting_results ||
                  props.course.tutorDescription == props.course.title ||
                  props.course.tutorDescription ==
                    props.course.start_requirements
                  ? savedTutorDescription
                    ? { display: "block", backgroundColor: "yellow" }
                    : { display: "none", backgroundColor: "yellow" }
                  : savedTutorDescription
                  ? { display: "block" }
                  : { display: "none" }
                : savedTutorDescription
                ? { display: "block", backgroundColor: "red" }
                : { display: "none", backgroundColor: "red" }
            }
          >
            <b>Описание репетитора:</b> {tutorDescription}
          </p>
          <button
            onClick={() => {
              setSavedTutorDescription(false);
              setEditTutorDescription(true);
            }}
            style={
              savedTutorDescription ? { display: "block" } : { display: "none" }
            }
            className={styles.editButton}
          >
            &#128393;
          </button>
          <textarea
            onChange={(event) => {
              setTutorDescription(event.target.value);
            }}
            style={
              editTutorDescription ? { display: "block" } : { display: "none" }
            }
            className={styles.moderateRow}
            value={tutorDescription}
          ></textarea>
          <button
            onClick={() => {
              setSavedTutorDescription(true);
              setEditTutorDescription(false);
              updateTutorDescription({
                id: props.course.tutorsId,
                tutorDescription: tutorDescription,
              });
            }}
            style={
              editTutorDescription ? { display: "block" } : { display: "none" }
            }
            className={styles.saveButton}
          >
            &#10003;
          </button>
        </div>

        <p className={styles.moderate}>
          <b>Онлайн:</b>{" "}
          <input
            type="checkbox"
            onClick={() => {
              setIsOnline((prevValue) => {
                if (prevValue === null) {
                  return true;
                } else {
                  return !prevValue;
                }
              });
              updateIsOnline({
                id: props.course.id,
                isOnline: isOnline,
              });
            }}
            checked={isOnline ? true : false}
          />
        </p>

        <p className={styles.moderate}>
          <b>Одобрено:</b>{" "}
          <input
            type="checkbox"
            onClick={() => {
              setVerificated((prevValue) => {
                return !prevValue;
              });
              updateIsVerificated({
                id: props.course.id,
                verificated: verificated,
              });
            }}
            checked={verificated ? true : false}
          />
        </p>
      </div>
      <button className={styles.trash}>&#10007;</button>
    </div>
  );
}

// export default ModerateTutorCourseCard;
