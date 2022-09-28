import axios from 'axios'
import { useEffect, useState } from 'react'
import globals from '../../globals'
import CourseCard from '../CourseCard/CourseCard'
import LurkingFilterBlock from '../LurkingFilterBlock'
import TutorCourseCard from '../TutorCourseCardOnPage'
import styles from './SubcoursesOfCourseModal.module.css'

export function SubcourseOfCourseModal(props) {
    const [cardsList, setCardsList] = useState([])
    const [comparedCategory, setComparedCategory] = useState()
    const [loadingModal, setLoadingModal] = useState(false)
    const [showSubFilter, setShowSubFilter] = useState(false)
    const [citiesOfCards, setCitiesOfCards] = useState([])
    const [categoriesOfCards, setCategoriesOfCards] = useState([])
    const [formatsOfCards, setFormatsOfCards] = useState(['online', 'offline'])
    const [pricesOfCards, setPricesOfCards] = useState([])
    const [repeater, setRepeater] = useState('0')

    const [filters, setFilters] = useState([])

    const [cardsToShow, setCardsToShow] = useState(8);
    const addCards = () => {
        setCardsToShow(cardsToShow+8)
    }
    const [coursesLoading, setCoursesLoading] = useState(false);
    const loadFilters = async () => {
        let result = await axios.get(`${globals.productionServerDomain}/filters`);
        setFilters(result.data)
    }

    const citiesOfCardsHandler = () => {
        let array1 = filters[0]?.filter(el => citiesOfCards.city_name == el.name)
        setCitiesOfCards(array1)
        console.log(array1, "array1")
    }
    const categoriesOfCardsHandler = () => {
        cardsList.map(el => setCategoriesOfCards(el.category_name))
        let array1 = filters[1]?.filter(el => categoriesOfCards.category_name == el.name)
        setCategoriesOfCards(array1)
        console.log(array1, "array1")
    }
    // const formatsOfCardsHandler = () => {
    //     cardsList.map(el => setFormatsOfCards(el.city_name))
    // }
    // const pricesOfCardsHandler = () => {
    //     cardsList.map(el => setPricesOfCards(el.price))
    // }


 
    const categoryHandle = (value) => {
        let comparing = props.categories?.find(el => el.id == value)
        setComparedCategory(comparing)
        return comparing
    }
    const sendApplication = (courseId, userInfo) => {
        let data = {
          city_id: cityId,
          direction_id: directionId,
          name: userInfo.fullName,
          phone: userInfo.phone,
          email: userInfo.email,
          promocode: userInfo.promocode,
          age: 0,
          isOnline: isOnline,
          course_id: courseId,
          role_id: searchingTutors ? 6 : 4
        };
        axios({
          method: 'post',
          url: `${globals.productionServerDomain}/createCourseSearchTicket`,
          data: data,
          headers: {
            'Authorization': `Bearer ${globals.localStorageKeys.authToken}`
          }
        })
          .then(function(res){})
          .catch(() => {
            alert('Что-то пошло нетак!');
          });
      }

      useEffect(async () => {
        setRepeater('1')
        // await loadFilters()
        setCardsList(props.subcourses) 
        console.log(cardsList)
        setCitiesOfCards(cardsList?.map(el => el.city_name))
        console.log(citiesOfCards, 'citiesOfCards')
        // setCategoriesOfCards(cardsList?.map(el => el.category_name))
        // setPricesOfCards(cardsList?.map(el => el.price))
        // citiesOfCardsHandler()
        // categoriesOfCardsHandler()
        console.log("props.filteredCategories", props.filteredCategories)
    }, [])
    useEffect(() => {
        setRepeater('2')
        setCardsList(props.subcourses)
        console.log(cardsList)
        setCitiesOfCards(cardsList?.map(el => el.city_name))
        console.log(citiesOfCards, 'citiesOfCards')
    }, [repeater])

    return (
    <div className={styles.modalShow}>
        <span className={styles.close_modal} onClick={props.handleClose}></span>
        <h2 onClick={() => console.log(filters)}>Все курсы - {props.isTutors ? 'Репетитора' : 'Образовательного центра'} {props.title}</h2>
        {/* <div className={styles.filterSection}>
            <button onClick={() => setShowSubFilter(!showSubFilter)}>Фильтры</button>
            <div className={showSubFilter ? styles.filterSection_subFilters : styles.filterSection_subFilters_hide}>
                <div className={styles.filterSection_subFilters_wrapper}>
                    <button onClick={() => setShowCitiesList(!showCitiesList)}>Город</button>
                    <ul className={showCitiesList ? styles.filterSection_subFilters_options : styles.filterSection_subFilters_options_hide}>
                        {citiesOfCards.map(el => (
                            <li onClick={() => setSelectedCity(el.city_name)}>
                                {el.citiy_name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.filterSection_subFilters_wrapper}>
                    <button onClick={() => setShowCitiesList(!showCategoriesList)}>Направления</button>
                    <ul className={showCategoriesList ? styles.filterSection_subFilters_options : styles.filterSection_subFilters_options_hide}>
                        {categoriesOfCards.map(el => (
                            <li onClick={() => setSelectedCity(el.city_name)}>
                                {el.citiy_name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.filterSection_subFilters_wrapper}>
                    <button onClick={() => setShowCitiesList(!showFormatList)}>Формат занятий</button>
                    <ul className={showFormatList ? styles.filterSection_subFilters_options : styles.filterSection_subFilters_options_hide}>
                        {formatsOfCards.map(el => (
                            <li onClick={() => setSelectedCity(el.city_name)}>
                                {el.citiy_name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.filterSection_subFilters_wrapper}>
                    <button onClick={() => setShowCitiesList(!showPriceList)}>Цена</button>
                    <ul className={showPriceList ? styles.filterSection_subFilters_options : styles.filterSection_subFilters_options_hide}>
                        {pricesOfCards.map(el => (
                            <li onClick={() => setSelectedCity(el.city_name)}>
                                {el.citiy_name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={styles.filterSection_subFilters_wrapper}>
                    <button onClick={() => findCourse()}>Найти курс</button>
                </div>
            </div>
        </div> */} 
        <LurkingFilterBlock
            setCardsToShow={setCardsToShow} 
            cities={props.filteredCities} 
            directions={props.filteredCategories} 
            setCourseCards={setCardsList} 
            setTutorCards={props.isTutors ? setCardsList : '' }
            setCoursesLoading={setCoursesLoading}
            centerName={props.title}
            isTutors={props.isTutors ? true : false}
        />
        {/* {citiesOfCards.map(el => (
            <li>{el.name}</li>
        ))} */}
        <div className={styles.cardsSection}>
            {props.isTutors 
            ? 
            <>{cardsList?.map((course, idx) => (
                <TutorCourseCard
                key={idx}  
                  sendApplicationCallback={sendApplication} 
                  setLoadingModal={setLoadingModal} 
                  course={course}
                  courseDetails={props.courseDetails}
                />
            ))}</> 
            : 
            <>{cardsList?.map((course, idx) => (
                <CourseCard 
                  key={idx}  
                  sendApplicationCallback={sendApplication} 
                  setLoadingModal={setLoadingModal} 
                  course={course}
                  courseDetails={props.courseDetails}
                />
            ))}</>}

        </div>
    </div>
    )
}