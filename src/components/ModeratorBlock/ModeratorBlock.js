import styles from './ModeratorBlock.module.css'
import Head from 'next/head'
import React, {useEffect, useState} from "react";
import {default as axios} from "axios";
import globals from "../../globals";
import {useRouter} from "next/router";
import {Image} from "react-bootstrap";
import LoadingBlock from "../LoadingBlock";
import coursesStyles from "../../../styles/components/content/Courses.module.css";
import ModerateCourseCard from "../ModerateCourseCard/ModerateCourseCard";
import LurkingFilterBlock from "../LurkingFilterBlock";
import CourseSearchResultIsNotDefind from "../CourseSearchResultIsNotDefind";

const ModeratorBlock = () => {
    const router = useRouter();



    const [imagesBase, setImagesBase] = useState([]);
    const loadCourseCards = async (directionId) => {
        setCoursesLoading(true)
        let result = await axios.get(`${globals.productionServerDomain}/courseCards/`);
        setCourseCards(result.data);
        console.log('courseCards', result.data)
        setShowUps(true)
    }
    const loadFilters = async () => {
        setFiltersLoading(true)
        let result = await axios.get(`${globals.productionServerDomain}/filters`);
        setFilters(result.data)
        setFiltersLoading(false)
    }
    const loadStocks = async () => {
        setStocksLoading(true)
        let result = await axios.post(`${globals.productionServerDomain}/loadDirectionPromotions`, {direction_id: 0});
        setStocks(result.data);
    }

    const [stocksLoading, setStocksLoading] = useState(false);
    const [filtersLoading, setFiltersLoading] = useState(false);
    const [coursesLoading, setCoursesLoading] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [redCheck, setRedCheck] = useState(false);
    const [yellowCheck, setYellowCheck] = useState(false);
    const [allCards, setAllCards] = useState(true);
    const [verificatedCards, setVerificatedCards] = useState(false);
    const [notVerificatedCards, setNotVerificatedCards] = useState(false);
    const [showUps, setShowUps] = useState(false)
    const [selectedCenterId, setSelectedCenterId] = useState(0);
    const [findByCenter, setFindByCenter] = useState(false)
    const [filters, setFilters] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [courseCards, setCourseCards] = useState([]);
    console.log(selectedCenterId)
    useEffect(async () => {
        setCoursesLoading(true);
        loadFilters();
        loadCourseCards().then(() => setCoursesLoading(false));
        loadStocks().then(() => setStocksLoading(false));
        window.scrollTo(0, 0);
    }, [])
    let redCount = 0
    courseCards.forEach(function(course) {
    if (!course.title || !course.addresses || !course.ages || !course.category || !course.course_desc || !course.course_title || !course.description || !course.format || !course.img_src || !course.phones || !course.price || !course.schedule || !course.type) {           
    redCount = redCount+1;}
    });

    let verCount = 0
    courseCards.forEach(function(course) {
    if (course.verificated) {           
    verCount = verCount+1;}
    });

    let notVerCount = 0
    courseCards.forEach(function(course) {
    if (!course.verificated) {           
    notVerCount = notVerCount+1;}
    });

    let byCenterCount = 0
    courseCards.forEach(function(course) {
    if (course.course_id == selectedCenterId) {           
    byCenterCount = byCenterCount+1;}
    });

    let yellowCount = 0
    courseCards.forEach(function(course) {
    const str = String(course.img_src);
    const substr = 'realibi';
    const checkLink = str.includes(substr);
    if (((course.title == course.description) && course.title) || ((course.title == course.course_desc) && course.title) || ((course.description == course.course_desc) && course.description) || course.ages == " - " || (course.img_src && !checkLink)) {           
    yellowCount = yellowCount+1;}
    });

    function componentDidMount() {
        window.scrollTo(0, 0);
    }

    return (
        <div>
            <div className={styles.filterArea}>
                <div className={styles.leftArea}>
                    <p className={styles.moderate}>
                        <b>Все карточки ({courseCards.length}): </b> 
                        <input
                            type="radio"
                            onClick={() => {
                                setAllCards(true);
                                setRedCheck(false);
                                setYellowCheck(false);
                                setVerificatedCards(false);
                                setNotVerificatedCards(false);
                                setFindByCenter(false);
                                }
                            }
                            checked={allCards}
                            />
                    </p>
                    <p className={styles.moderate}>
                        <b>Только утвержденные ({verCount}): </b> 
                        <input
                            type="radio"
                            onClick={() => {
                                setVerificatedCards(true);
                                setNotVerificatedCards(false);
                                setAllCards(false);
                                setRedCheck(false);
                                setYellowCheck(false);
                                setFindByCenter(false);
                                }
                            }
                            checked={verificatedCards}
                            />
                    </p>
                    <p className={styles.moderate}>
                        <b>Только не утвержденные ({notVerCount}): </b> 
                        <input
                            type="radio"
                            onClick={() => {
                                setNotVerificatedCards(true);
                                setVerificatedCards(false);
                                setAllCards(false);
                                setRedCheck(false);
                                setYellowCheck(false);
                                setFindByCenter(false);
                                }
                            }
                            checked={notVerificatedCards}
                            />
                    </p>
                </div>
                <div className={styles.rightArea}>
                    <p className={styles.moderate}>
                        <b>С незаполненными полями ({redCount}): </b> 
                        <input
                            type="radio"
                            onClick={() => {
                                setRedCheck(true);
                                setAllCards(false);
                                setYellowCheck(false);
                                setVerificatedCards(false);
                                setNotVerificatedCards(false);
                                setFindByCenter(false);
                                }
                            }
                            checked={redCheck}
                        />
                    </p>
                    <p className={styles.moderate}>
                        <b>С неверными или повторяющимися полями ({yellowCount}): </b> 
                        <input
                            type="radio"
                            onClick={() => {
                                setYellowCheck(true);
                                setAllCards(false);
                                setRedCheck(false);
                                setVerificatedCards(false);
                                setNotVerificatedCards(false);
                                setFindByCenter(false);
                                }
                            }
                            checked={yellowCheck}
                        />
                    </p>
                    <p className={styles.moderate}>
                        <b>Поиск по центру ({byCenterCount}): </b> 
                        <input
                            type="radio"
                            onClick={() => {
                                setFindByCenter(true);
                                setYellowCheck(false);
                                setAllCards(false);
                                setRedCheck(false);
                                setVerificatedCards(false);
                                setNotVerificatedCards(false);
                                }
                            }
                            checked={findByCenter}
                        />
                        <select disabled={!findByCenter} className={styles.wrapperItemInput} onChange={e => setSelectedCenterId(e.target.value)}>
                            {
                                filters[2] !== undefined
                                    ?
                                    (filters[2].map(filterOption =>
                                        filterOption.title !== "test"
                                            ?
                                            (<option value={filterOption.id}>{filterOption.title}</option>)
                                            :
                                            null
                                    ))
                                    :
                                    null
                            }
                        </select>
                    </p>
                </div>
            </div>
            {
                courseCards.length > 0 && (
                    <div className={styles.courses_block}>
                        {
                            courseCards.map(course => {
                                const str = String(course.img_src);
                                const substr = 'realibi';
                                const checkLink = str.includes(substr);
                                if(course.title !== 'test'){
                                    if (redCheck == true) {
                                        if (!course.title || !course.addresses || !course.ages || !course.category || !course.course_desc || !course.course_title || !course.description || !course.format || !course.img_src || !course.phones || !course.price || !course.schedule || !course.type){
                                            return (
                                                <div style={{marginLeft: '5%', marginRight: '5%'}}>
                                                    <ModerateCourseCard setLoadingModal={setLoadingModal} course={course} showApplicationModal={true}/>
                                                </div>
                                            )
                                        }
                                    }
                                    if (yellowCheck == true) {
                                        if (((course.title == course.description) && course.title) || ((course.title == course.course_desc) && course.title) || ((course.description == course.course_desc) && course.description) || course.ages == " - " || (course.img_src && !checkLink)){
                                            return (
                                                <div style={{marginLeft: '5%', marginRight: '5%'}}>
                                                    <ModerateCourseCard setLoadingModal={setLoadingModal} course={course} showApplicationModal={true}/>
                                                </div>
                                            )
                                        }
                                    }
                                    if (verificatedCards == true) {
                                        if (course.verificated){
                                            return (
                                                <div style={{marginLeft: '5%', marginRight: '5%'}}>
                                                    <ModerateCourseCard setLoadingModal={setLoadingModal} course={course} showApplicationModal={true}/>
                                                </div>
                                            )
                                        }
                                    }
                                    if (notVerificatedCards == true) {
                                        if (!course.verificated){
                                            return (
                                                <div style={{marginLeft: '5%', marginRight: '5%'}}>
                                                    <ModerateCourseCard setLoadingModal={setLoadingModal} course={course} showApplicationModal={true}/>
                                                </div>
                                            )
                                        }
                                    }
                                    if (findByCenter == true) {
                                        if (selectedCenterId == course.course_id){
                                            return (
                                                <div style={{marginLeft: '5%', marginRight: '5%'}}>
                                                    <ModerateCourseCard setLoadingModal={setLoadingModal} course={course} showApplicationModal={true}/>
                                                </div>
                                            )
                                        }
                                    }
                                    if (allCards == true) {
                                        return (
                                        <div style={{marginLeft: '5%', marginRight: '5%'}}>
                                            <ModerateCourseCard setLoadingModal={setLoadingModal} course={course} showApplicationModal={true}/>
                                        </div>
                                    )
                                }


                                }
                            })
                        }
                    </div>
                )
            }
            {
                coursesLoading ? (<LoadingBlock/> ) : (
                    showUps && (courseCards.length < 1 ? <CourseSearchResultIsNotDefind catalog={true}/> : null)
                )
            }


        </div>
    )
}

export default ModeratorBlock;
