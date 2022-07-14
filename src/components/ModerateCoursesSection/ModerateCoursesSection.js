
import styles from "./ModerateCourseSection.module.css";
import React, { useEffect, useState } from "react";
import { default as axios } from "axios";
import globals from "../../globals";
import CardsList from "./CardsList";
import Pagination from "./Pagination";



const ModerateCoursesSection = () => {
    // счетчики карточек по типу
    const [allCardsCount, setAllCardsCount] = useState(0);
    const [verifiedCardsCount, setVerifiedCardsCount] = useState(0);
    const [notVerifiedCardsCount, setNotVerifiedCardsCount] = useState(0);
    const [redCardsCount, setRedCardsCount] = useState(0);
    const [yellowCardsCount, setYellowCardsCount] = useState(0);
    const [byCenterCardsCount, setByCenterCardsCount] = useState(0);
  
    // выбранный радио баттон
    const [allCardsChecked, setAllCardsChecked] = useState(true);
    const [verifiedCardsChecked, setVerifiedCardsChecked] = useState(false);
    const [notVerifiedCardsChecked, setNotVerifiedCardsChecked] = useState(false);
    const [redCardsChecked, setRedCardsChecked] = useState(false);
    const [yellowCardsChecked, setYellowCardsChecked] = useState(false);
    const [cardsByCenterIdChecked, setCardsByCenterIdChecked] = useState(false);
  
    // текущий выбранный список карточек
    const [currentList, setCurrentList] = useState([]);
    const [allCardsList, setAllCardsList] = useState([]);
    // const [redList, setRedList] = useState([]);
    // const [yellowList, setYellowList] = useState([]);
    // const [verificatedList, setVerificatedList] = useState([]);
    // const [notVerificatedList, setNotVerificatedList] = useState([]);
    // const [byCenterIdList, setByCenterIdList] = useState([]);
  
    const [selectedCenterId, setSelectedCenterId] = useState(0);
  
    const [filters, setFilters] = useState([]);
  
    const [coursesLoading, setCoursesLoading] = useState(false);
  
    const [loadingModal, setLoadingModal] = useState(false);
  
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage] = useState(10);
  
    useEffect(async () => {
      await loadFilters();
      await loadCourseCards();
      // countCardLists();
    }, []);
  
    useEffect(() => {
      countCardLists();
    }, [allCardsList]);
  
    const loadFilters = async () => {
      let result = await axios.get(`${globals.productionServerDomain}/filters`);
      setFilters(result.data);
    };
  
    const loadCourseCards = async () => {
      setCoursesLoading(true);
      let result = await axios
        .get(`${globals.productionServerDomain}/courseCards/`)
        .then((result) => {
          setAllCardsList(result.data);
          setCurrentList(result.data);
        });
      // alert("data loaded")
      setCoursesLoading(false);
      // setAllCardsList(prevValue => {
      //   return result.data;
      // })
      // setAllCardsList(result.data);
      // setCurrentList(allCardsList)
      // setCurrentList(allCardsList);
      // console.log(`current list:`, currentList);
    };
  
    const countCardLists = () => {
      setAllCardsCount(allCardsList.length);
  
      setRedCardsCount(0);
      setYellowCardsCount(0);
      setVerifiedCardsCount(0);
      setNotVerifiedCardsCount(0);
      setByCenterCardsCount(0);
  
      allCardsList.forEach(function (course) {
        if (
          !course.title ||
          !course.addresses ||
          !course.ages ||
          !course.category ||
          !course.course_desc ||
          !course.course_title ||
          !course.description ||
          !course.format ||
          !course.img_src ||
          !course.phones ||
          !course.price ||
          !course.schedule ||
          !course.type
        ) {
          // setRedList(prevValue => {
          //   return [...prevValue, course];
          // })
          // redList.push(course);
          // console.log(course)
          // console.log(redCardsCount)
          setRedCardsCount((prevValue) => {
            return prevValue + 1;
          });
        }
      });
  
      allCardsList.forEach(function (course) {
        if (course.verificated) {
          setVerifiedCardsCount((prevValue) => {
            return prevValue + 1;
          });
        }
      });
  
      allCardsList.forEach(function (course) {
        if (!course.verificated) {
          setNotVerifiedCardsCount((prevValue) => {
            return prevValue + 1;
          });
        }
      });
  
      allCardsList.forEach(function (course) {
        if (course.course_id == selectedCenterId) {
          setByCenterCardsCount((prevValue) => {
            return prevValue + 1;
          });
        }
      });
  
      allCardsList.forEach(function (course) {
        const str = String(course.img_src);
        const substr = "realibi";
        const checkLink = str.includes(substr);
        if (
          (course.title == course.description && course.title) ||
          (course.title == course.course_desc && course.title) ||
          (course.description == course.course_desc && course.description) ||
          course.ages == " - " ||
          (course.img_src && !checkLink)
        ) {
          // setYellowList(prevValue => {
          //   return [...prevValue, course];
          // })
          // yellowList.push(course);
          setYellowCardsCount((prevValue) => {
            return (prevValue += 1);
          });
        }
      });
    };
  
    const onListLoaded = (list) => {
      setCurrentList((prevValue) => {
        return list;
      });
    };
  
    // useEffect(() => {
    //   console.log('selectedCenterId: ', selectedCenterId)
    // }, [selectedCenterId])
  
    useEffect(async () => {
      if (allCardsChecked) {
        // console.log(`allCardsChecked`);
        const result = await axios.get(
          `${globals.productionServerDomain}/courseCards/`
        );
        const list = result.data;
        setCurrentPage(1);
        //загрузить все карточки
        setCurrentList([]);
        setCurrentList(() => {
          return [...list]
        })
        // setCurrentList(allCardsList);
        // console.log
      } else if (verifiedCardsChecked) {
        // console.log(`verifiedCardsChecked`);
        const result = await axios.get(
          `${globals.productionServerDomain}/verificatedCourseCards/`
        );
        const list = result.data;
        setCurrentPage(1);
        setCurrentList([]);
        setCurrentList(() => {
          return [...list];
        });
      } else if (notVerifiedCardsChecked) {
        // console.log(`notVerifiedCardsChecked`);
        //загрузить не верифицированные карточки
        const result = await axios.get(
          `${globals.productionServerDomain}/notVerificatedCourseCards/`
        );
        const list = result.data;
        setCurrentPage(1);
        setCurrentList([]);
        setCurrentList(() => {
          return [...list];
        });
      } else if (redCardsChecked) {
        // console.log(`redCardsChecked`);
        //загрузить красные карточки
        const result = await axios.get(
          `${globals.productionServerDomain}/courseCards/`
        );
        setCurrentPage(1);
        let list = result.data.filter((course) => {
          if (
            !course.title ||
            !course.addresses ||
            !course.ages ||
            !course.category ||
            !course.course_desc ||
            !course.course_title ||
            !course.description ||
            !course.format ||
            !course.img_src ||
            !course.phones ||
            !course.price ||
            !course.schedule ||
            !course.type
          ) {
            return course;
          }
        });
        setCurrentList([]);
        setCurrentList(() => {
          return [...list];
        });
      } else if (yellowCardsChecked) {
        // console.log(`yellowCardsChecked`);
        const result = await axios.get(
          `${globals.productionServerDomain}/courseCards/`
        );
        //загрузить желтые карточки
        const substr = "realibi";
        setCurrentPage(1);
        let list = result.data.filter((course) => {
          const str = String(course.img_src);
          const checkLink = str.includes(substr);
          if (
            (course.title == course.description && course.title) ||
            (course.title == course.course_desc && course.title) ||
            (course.description == course.course_desc && course.description) ||
            course.ages == " - " ||
            (course.img_src && !checkLink)
          ) {
            return course;
          }
        });
        setCurrentList([]);
        setCurrentList(() => {
          return [...list];
        });
      } else if (cardsByCenterIdChecked) {
        // console.log(`cardsByCenterIdChecked`);
        setCurrentPage(1);
        // загрузить карточки центра
        const centerId = selectedCenterId;
        // console.log(`center id: `, centerId)
        const result = await axios.get(
          `${globals.productionServerDomain}/courseCardsByCenterId/${centerId}`
        );
        const list = result.data
        setByCenterCardsCount(list.length)
        setCurrentList([]);
        setCurrentList(() => {
          return [...list]
        });
      }
    }, [
      allCardsChecked,
      verifiedCardsChecked,
      notVerifiedCardsChecked,
      redCardsChecked,
      yellowCardsChecked,
      cardsByCenterIdChecked,
      selectedCenterId
    ]);
  
    useEffect(() => {
      // console.log(currentCards);
    }, [currentCards]);
  
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
                  setVerifiedCardsChecked(false);
                  setNotVerifiedCardsChecked(false);
                  setRedCardsChecked(false);
                  setYellowCardsChecked(false);
                  setCardsByCenterIdChecked(false);
                  // onRadioButtonClicked();
                }}
                checked={allCardsChecked}
              />
            </p>
            <p className={styles.moderate}>
              <b>Только утвержденные ({verifiedCardsCount}): </b>
              <input
                type="radio"
                value="verificatedChecked"
                onClick={() => {
                  setAllCardsChecked(false);
                  setVerifiedCardsChecked(true);
                  setNotVerifiedCardsChecked(false);
                  setRedCardsChecked(false);
                  setYellowCardsChecked(false);
                  setCardsByCenterIdChecked(false);
                  // onRadioButtonClicked();
                }}
                checked={verifiedCardsChecked}
              />
            </p>
            <p className={styles.moderate}>
              <b>Только не утвержденные ({notVerifiedCardsCount}): </b>
              <input
                type="radio"
                value="notVerificatedChecked"
                onClick={() => {
                  setAllCardsChecked(false);
                  setVerifiedCardsChecked(false);
                  setNotVerifiedCardsChecked(true);
                  setRedCardsChecked(false);
                  setYellowCardsChecked(false);
                  setCardsByCenterIdChecked(false);
                  // onRadioButtonClicked();
                }}
                checked={notVerifiedCardsChecked}
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
                  setVerifiedCardsChecked(false);
                  setNotVerifiedCardsChecked(false);
                  setRedCardsChecked(true);
                  setYellowCardsChecked(false);
                  setCardsByCenterIdChecked(false);
                  // onRadioButtonClicked();
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
                  setVerifiedCardsChecked(false);
                  setNotVerifiedCardsChecked(false);
                  setRedCardsChecked(false);
                  setYellowCardsChecked(true);
                  setCardsByCenterIdChecked(false);
                  // onRadioButtonClicked();
                }}
                checked={yellowCardsChecked}
              />
            </p>
            <p className={styles.moderate}>
              <b>Поиск по центру ({byCenterCardsCount}): </b>
              <input
                type="radio"
                onClick={() => {
                  setAllCardsChecked(false);
                  setVerifiedCardsChecked(false);
                  setNotVerifiedCardsChecked(false);
                  setRedCardsChecked(false);
                  setYellowCardsChecked(false);
                  setCardsByCenterIdChecked(true);
                  // onRadioButtonClicked();
                }}
                checked={cardsByCenterIdChecked}
              />
              <select
                disabled={!cardsByCenterIdChecked}
                className={styles.wrapperItemInput}
                onChange={(e) => setSelectedCenterId(e.target.value)}
              >
                {filters[2] !== undefined
                  ? filters[2].map((filterOption) =>
                      filterOption.title !== "test" ? (
                        <option value={filterOption.id}>
                          {filterOption.title}
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
            <CardsList currentCards={currentCards} setLoadingModal={setLoadingModal}/>
            <div style={{width: "100%"}}>
              <Pagination cardsPerPage={cardsPerPage} totalCards={currentList.length} paginate={paginate} currentPage={currentPage}/>
            </div>
            
          </div>
        )
          }
      </div>
    );
  };

  export default ModerateCoursesSection;
  