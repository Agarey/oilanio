import styles from "./ModerateTutorCardsSection.module.css";
import React, { useEffect, useState } from "react";
import { default as axios } from "axios";
import globals from "../../globals";
import TutorCardsList from "./TutorCardsList";
import Pagination from "./Pagination";


const ModerateTutorCardsSection = () => {
  const [allCardsCount, setAllCardsCount] = useState(0);
  const [verificatedCardsCount, setVerificatedCardsCount] = useState(0);
  const [notVerificatedCardsCount, setNotVerificatedCardsCount] = useState(0);
  const [redCardsCount, setRedCardsCount] = useState(0);
  const [yellowCardsCount, setYellowCardsCount] = useState(0);
  const [byTutorCardsCount, setByTutorCardsCount] = useState(0);

  // выбранный радио баттон
  const [allCardsChecked, setAllCardsChecked] = useState(true);
  const [verificatedCardsChecked, setVerificatedCardsChecked] = useState(false);
  const [notVerificatedCardsChecked, setNotVerificatedCardsChecked] =
    useState(false);
  const [redCardsChecked, setRedCardsChecked] = useState(false);
  const [yellowCardsChecked, setYellowCardsChecked] = useState(false);
  const [cardsByTutorIdChecked, setCardsByTutorIdChecked] = useState(false);

  // текущий выбранный список карточек
  const [currentList, setCurrentList] = useState([]);
  const [allCardsList, setAllCardsList] = useState([]);

  const [selectedTutorId, setSelectedTutorId] = useState(0);

  const [tutorsList, setTutorsList] = useState([])

  const [coursesLoading, setCoursesLoading] = useState(false);

  const [loadingModal, setLoadingModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(10);

  useEffect(async () => {
    await loadTutorsList();
    await loadCourseCards();
    // countCardLists();
  }, []);

  const loadTutorsList = async () => {
    await axios({
        method: 'get',
        url: `${globals.productionServerDomain}/tutors`,
    }).then(function(res){
        setSelectedTutorId(res.data[0].id);
        setTutorsList(res.data);
    }).catch((err)=>{
        alert("Произошла ошибка при загрузке списка репетиторов!", err)
    })
  };

  useEffect(() => {
    countCardLists();
  }, [allCardsList]);

  const loadCourseCards = async () => {
    setCoursesLoading(true);
    let result = await axios
      .get(`${globals.productionServerDomain}/tutorCourseCards/`)
      .then((result) => {
        setAllCardsList(result.data);
        setCurrentList(result.data);
      });
    setCoursesLoading(false);
  };

  const countCardLists = () => {
    setAllCardsCount(allCardsList.length);
    setVerificatedCardsCount(0);
    setNotVerificatedCardsCount(0);
    setRedCardsCount(0);
    setYellowCardsCount(0);
    setByTutorCardsCount(0);

    allCardsList.forEach(function (course) {
      if (
        !course.tutorsName ||
        !course.tutorsId ||
        !course.img_src ||
        !course.schedule ||
        !course.price ||
        !course.currency ||
        !course.unit_of_time ||
        !course.title ||
        !course.courseCategory ||
        !course.is_online ||
        !course.teaching_language ||
        !course.min_age ||
        !course.max_age ||
        !course.tutorDescription ||
        !course.start_requirements ||
        !course.expecting_results
      ) {
        setRedCardsCount((prevValue) => {
          return prevValue + 1;
        });
      }
    });

    allCardsList.forEach(function (course) {
      if (course.verificated) {
        setVerificatedCardsCount((prevValue) => {
          return prevValue + 1;
        });
      }
    });

    allCardsList.forEach(function (course) {
      if (!course.verificated) {
        setNotVerificatedCardsCount((prevValue) => {
          return prevValue + 1;
        });
      }
    });

    allCardsList.forEach(function (course) {
      if (course.id == selectedTutorId) {
        setByTutorCardsCount((prevValue) => {
          return prevValue + 1;
        });
      }
    });

    allCardsList.forEach(function (course) {
      const str = String(course.img_src);
      const substr = "realibi";
      const checkLink = str.includes(substr);
      if (
        (course.title == course.expecting_results && course.title) ||
        (course.title == course.tutorDescription && course.title) ||
        (course.min_age == "" && course.max_age == "") ||
        (course.min_age == undefined && course.max_age == undefined) ||
        (course.img_src && !checkLink)
      ) {
        setYellowCardsCount((prevValue) => {
          return (prevValue += 1);
        });
      }
    });
  };

  useEffect(async () => {
    if (allCardsChecked) {
      const result = await axios.get(
        `${globals.productionServerDomain}/tutorCourseCards/`
      );
      const list = result.data;
      console.log(list);
      setCurrentPage(1);
      setCurrentList([]);
      setCurrentList(() => {
        return [...list];
      });
      setCurrentList(allCardsList);
    } else if (verificatedCardsChecked) {
      // TODO: Make the request in DB
      const result = await axios.get(
        `${globals.productionServerDomain}/verificatedTutorCourseCards/`
      );
      const list = result.data;
      setCurrentPage(1);
      setCurrentList([]);
      setCurrentList(() => {
        return [...list];
      });
    } else if (notVerificatedCardsChecked) {
      //загрузить не верифицированные карточки
      // TODO: Make the request in DB
      const result = await axios.get(
        `${globals.productionServerDomain}/notVerificatedTutorCourseCards/`
      );
      const list = result.data;
      setCurrentPage(1);
      setCurrentList([]);
      setCurrentList(() => {
        return [...list];
      });
    } else if (redCardsChecked) {
      const result = await axios.get(
        `${globals.productionServerDomain}/tutorCourseCards/`
      );
      setCurrentPage(1);
      let list = result.data.filter((course) => {
        if (
          !course.tutorsName ||
          !course.tutorsId ||
          !course.img_src ||
          !course.schedule ||
          !course.price ||
          !course.currency ||
          !course.unit_of_time ||
          !course.title ||
          !course.courseCategory ||
          !course.is_online ||
          !course.teaching_language ||
          !course.min_age ||
          !course.max_age ||
          !course.tutorDescription ||
          !course.start_requirements ||
          !course.expecting_results
        ) {
          return course;
        }
      });
      setCurrentList([]);
      setCurrentList(() => {
        return [...list];
      });
    } else if (yellowCardsChecked) {
      const result = await axios.get(
        `${globals.productionServerDomain}/tutorCourseCards/`
      );
      //загрузить желтые карточки
      const substr = "realibi";
      setCurrentPage(1);
      let list = result.data.filter((course) => {
        const str = String(course.img_src);
        const checkLink = str.includes(substr);
        if (
          (course.title == course.expecting_results && course.title) ||
          (course.title == course.tutorDescription && course.title) ||
          (course.min_age == "" && course.max_age == "") ||
          (course.min_age == undefined && course.max_age == undefined) ||
          (course.img_src && !checkLink)
        ) {
          return course;
        }
      });
      setCurrentList([]);
      setCurrentList(() => {
        return [...list];
      });
    } else if (cardsByTutorIdChecked) {
      setCurrentPage(1);
      // загрузить карточки центра
      const tutorId = selectedTutorId;
      // TODO: make request in DB
      const result = await axios.get(
        `${globals.productionServerDomain}/tutorCourseCardsByTutorId/${tutorId}`
      );
      const list = result.data;
      setByTutorCardsCount(list.length);
      setCurrentList([]);
      setCurrentList(() => {
        return [...list];
      });
    }
  }, [
    allCardsChecked,
    verificatedCardsChecked,
    notVerificatedCardsChecked,
    redCardsChecked,
    yellowCardsChecked,
    cardsByTutorIdChecked,
    selectedTutorId,
  ]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = currentList.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }

  return (
    <div>
      <div className={styles.filterArea}>
        <div className={styles.leftArea}>
          <p className={styles.moderate}>
            <b>Все карточки ({allCardsCount}): </b>
            <input
              type="radio"
              value="allCardsChecked"
              onClick={() => {
                setAllCardsChecked(true);
                setVerificatedCardsChecked(false);
                setNotVerificatedCardsChecked(false);
                setRedCardsChecked(false);
                setYellowCardsChecked(false);
                setCardsByTutorIdChecked(false);
              }}
              checked={allCardsChecked}
            />
          </p>
          <p className={styles.moderate}>
            <b>Только утвержденные ({verificatedCardsCount}): </b>
            <input
              type="radio"
              value="verificatedChecked"
              onClick={() => {
                setAllCardsChecked(false);
                setVerificatedCardsChecked(true);
                setNotVerificatedCardsChecked(false);
                setRedCardsChecked(false);
                setYellowCardsChecked(false);
                setCardsByTutorIdChecked(false);
              }}
              checked={verificatedCardsChecked}
            />
          </p>
          <p className={styles.moderate}>
            <b>Только не утвержденные ({notVerificatedCardsCount}): </b>
            <input
              type="radio"
              value="notVerificatedChecked"
              onClick={() => {
                setAllCardsChecked(false);
                setVerificatedCardsChecked(false);
                setNotVerificatedCardsChecked(true);
                setRedCardsChecked(false);
                setYellowCardsChecked(false);
                setCardsByTutorIdChecked(false);
              }}
              checked={notVerificatedCardsChecked}
            />
          </p>
        </div>
        <div className={styles.rightArea}>
          <p className={styles.moderate}>
            <b>С незаполненными полями ({redCardsCount}): </b>
            <input
              type="radio"
              onClick={() => {
                setAllCardsChecked(false);
                setVerificatedCardsChecked(false);
                setNotVerificatedCardsChecked(false);
                setRedCardsChecked(true);
                setYellowCardsChecked(false);
                setCardsByTutorIdChecked(false);
              }}
              checked={redCardsChecked}
            />
          </p>
          <p className={styles.moderate}>
            <b>С неверными или повторяющимися полями ({yellowCardsCount}): </b>
            <input
              type="radio"
              onClick={() => {
                setAllCardsChecked(false);
                setVerificatedCardsChecked(false);
                setNotVerificatedCardsChecked(false);
                setRedCardsChecked(false);
                setYellowCardsChecked(true);
                setCardsByTutorIdChecked(false);
              }}
              checked={yellowCardsChecked}
            />
          </p>
          <p className={styles.moderate}>
            <b>Поиск по центру ({byTutorCardsCount}): </b>
            <input
              type="radio"
              onClick={() => {
                setAllCardsChecked(false);
                setVerificatedCardsChecked(false);
                setNotVerificatedCardsChecked(false);
                setRedCardsChecked(false);
                setYellowCardsChecked(false);
                setCardsByTutorIdChecked(true);
              }}
              checked={cardsByTutorIdChecked}
            />
            <select
              disabled={!cardsByTutorIdChecked}
              className={styles.wrapperItemInput}
              value={selectedTutorId}
              onChange={(e) => setSelectedTutorId(e.target.value)}
            >
              {tutorsList !== undefined
                ? tutorsList.map((filterOption) =>
                    filterOption.fullname !== "test" ? (
                      <option value={filterOption.id}>
                        {filterOption.fullname}
                      </option>
                    ) : null
                  )
                : null}
            </select>
          </p>
        </div>
      </div>
      {currentCards.length > 0 && (
          <div>
            <TutorCardsList currentCards={currentCards} setLoadingModal={setLoadingModal}/>
            <div style={{width: "100%"}}>
              <Pagination cardsPerPage={cardsPerPage} totalCards={currentList.length} paginate={paginate} currentPage={currentPage}/>
            </div>
            
          </div>
        )
          }
    </div>
  );
};

export default ModerateTutorCardsSection;
