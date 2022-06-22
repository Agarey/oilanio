import Head from 'next/head'
import Header from '../../src/components/Header/Header'
import styles from "../../styles/components/content/Courses.module.css";
import CourseCard from "../../src/components/CourseCard/CourseCard";
import HorizontalLine from "../../src/components/HorizontalLine/HorizaontalLine";
import Footer from "../../src/components/Footer/Footer";
import React, {useState, useEffect} from "react";
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css'
import SimpleSlider from "../../src/components/SimpleSlider/SimpleSlider";
import LoadingBlock from "../../src/components/LoadingBlock";
import StockCard from "../../src/components/StockCard/StockCard";
import ContactButton from "../../src/components/ContactButton/ContactButton";
import {useContext} from "react";
import UserContext from "../../src/userContext"
import globals from "../../src/globals";
import EditCourseCard from "../../src/components/EditCourseCard/EditCourseCard";
import Loading from "../../src/components/Loading/Loading"
import classnames from 'classnames'
import {useLongPress} from 'use-long-press';
import {ContactForm} from "../../src/components/Forms/ContactForm/ContactForm";
import ModalWindow from "../../src/components/Modal/ModalWindow";
import {SubscriptionPaymentForm} from "../../src/components/Forms/SubscriptionPaymentForm/SubscriptionPaymentForm";
import {CourseSearchForm} from "../../src/components/Forms/CourseSearchForm/CourseSearchForm";
import TutorCourseCard from "../../src/components/TutorCourseCard";
import CourseSearchResultIsNotDefind from "../../src/components/CourseSearchResultIsNotDefind";

const ym = () => {
    return (
        "<!-- Yandex.Metrika counter -->\n" +
        "<script type=\"text/javascript\" >\n" +
        "   (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};\n" +
        "   m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})\n" +
        "   (window, document, \"script\", \"https://mc.yandex.ru/metrika/tag.js\", \"ym\");\n" +
        "\n" +
        "   ym(78186067, \"init\", {\n" +
        "        clickmap:true,\n" +
        "        trackLinks:true,\n" +
        "        accurateTrackBounce:true,\n" +
        "        webvisor:true,\n" +
        "        ecommerce:\"dataLayer\"\n" +
        "   });\n" +
        "</script>\n" +
        "<noscript><div><img src=\"https://mc.yandex.ru/watch/78186067\" style=\"position:absolute; left:-9999px;\" alt=\"\" /></div></noscript>\n" +
        "<!-- /Yandex.Metrika counter -->"
    );
}


const axios = require('axios').default;

function Courses({props}) {
    const [cityId, setCityId] = useState(0);
    const [directionId, setDirectionId] = useState(0);
    const [isOnline, setIsOnline] = useState(0);
    const [courseId, setCourseId] = useState(0);

    const [searchingTutors, setSearchingTutors] = useState(false);
    const [courseCards, setCourseCards] = useState(null);
    const [filters, setFilters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingModal, setLoadingModal] = useState(false);
    const [openMoreSort, setOpenMoreSort] = useState(false)
    const [hideSort, setHideSort] = useState(false)

    const [currentPage, setCurrentPage] = useState(0);
    const [cardsNum, setCardsNum] = useState(12);

    const [sortType, setSortType] = useState(0)
    const [lessonType, setLessonType] = useState(0)

    const [currentCourseCategory, setCurrentCourseCategory] = useState("Найденные курсы")
    const [tempCategoryId, setTempCategoryId] = useState("Все направления")

    const [imagesBase, setImagesBase] = useState([]);

    const [cardsToShow, setCardsToShow] = useState(8)

    const addCards = () => {
            setCardsToShow(cardsToShow+8)
    }
    const loadCourseCards = async () => {
        setLoading(true)

        let imagesBaseResponse = await axios.get(`${globals.productionServerDomain}/imagesBase`);
        setImagesBase(imagesBaseResponse.data);

        let result = await axios.get(`${globals.productionServerDomain}/courseCards/`).then(() => {
            setCourseCards(result.data);
            console.log(result.data);
        }).then(() => {
            setLoading(false);
        });
    }
    const filterBtnHandler = async (centerName, city, direction, price, center, isOnline, sortType, searchingCenterValue) => {
        setLoading(true);
        searchingCenterValue = Boolean(Number(searchingCenterValue));

        let imagesBaseResponse = await axios.get(`${globals.productionServerDomain}/imagesBase`);
        setImagesBase(imagesBaseResponse.data);

        console.log('images', imagesBase)

        const data = {
            centerName: centerName,
            city: city.toString(),
            direction: direction.toString(),
            price: price.toString(),
            center: center.toString(),
            isOnline: isOnline.toString(),
            //individualLesson: individualLesson,
            sortType: sortType.toString()
        }

        let query = `${globals.productionServerDomain}/${(searchingCenterValue) ? 'courseCardsFilter' : 'tutorCourseCardsFilter'}/`;
        console.log('query', query);
        let postResult = await axios.post(query, data);
        console.log('course cards');
        console.log(postResult.data);
        setCourseCards(postResult.data);

        setLoading(false);
        setOpenMoreSort(true)
    }
    const [searchingCenterState, setSearchingCenterState] = useState(true)
    useEffect(async () =>{
        setLoading(true)
        const params = new URLSearchParams(window.location.search);
        console.log('params', params);
        let centerName = params.get('centerName');
        let direction = null;
        let city = null;
        let price = null;
        let isOnline = null;
        let center = null;
        let searchingCenter = Number(params.get('searchingCenter'));
        setSearchingCenterState(Boolean(searchingCenter))

        if (params.has('direction')) {
            direction = params.get('direction');
            setDirectionId(Number(direction));
            //document.getElementById("directionSelect").value = direction.toString();
        }
        if (params.has('city')) {
            city = params.get('city');
            setCityId(Number(city));
            //document.getElementById("citySelect").value = city.toString();
        }
        if (params.has('price')) {
            price = params.get('price');
            setDirectionId(Number(direction));
            //document.getElementById("priceSelect").value = price;
        }
        if (params.has('isOnline')) {
            isOnline = params.get('isOnline');
            setIsOnline(Number(isOnline))
            //document.getElementById("isOnlineSelect").value = isOnline;
        }
        if (params.has('center')) {
            center = params.get('center');
            //document.getElementById("centerSelect").value = center;
        }
        if (direction !== null || city !== null || price !== null || isOnline !== null || center !== null) {
            filterBtnHandler(centerName, city === null ? 0 : Number(city), direction === null ? 0 : Number(direction), price === null ? 0 : price, center === null ? 0 : center, isOnline === null ? 0 : isOnline, 'price asc', searchingCenter)
                .then(() => {
                    console.log('searching center', searchingCenter)
                    if(searchingCenter === 0) {
                        setSearchingTutors(true)
                    } else {
                        setSearchingTutors(false)
                    }
                    console.log("searching tutors", searchingTutors)
                })
        } else {
            loadCourseCards().then(()=>setLoading(false))
        }

        axios.get(`${globals.productionServerDomain}/filters`).then(res => {
            setFilters(res.data);
            console.log(res);
        })

        document.querySelector('#page_top').scrollIntoView({
            behavior: 'smooth'
        });
        setLoading(false);
    }, [])

    const longPressHandler = useLongPress(() => {
        setShowLinkModal(true);
    });

    const [showLinkModal, setShowLinkModal] = useState(false);
    const [showCourseSearchModal, setCourseSearchModal] = useState(false);

    const handleLinkModalClose = () => setShowLinkModal(false);
    const handleCourseSearchModalClose = () => setCourseSearchModal(false);

    let [linkForTarget, setLinkForTarget] = useState('');

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
        }).then(function(res){

        }).catch(() => {
            alert('Что-то пошло нетак!');
        });
    }

    return (
        <div id={'page_top'}>
            <ModalWindow
                show={showLinkModal}
                handleClose={handleLinkModalClose}
                contactForm={'contactForm'}
                body={
                    <>
                        <p style={{
                            color: 'white',
                            fontSize: 18,
                            padding: 20,
                            boxSizing: 'border-box',
                            width: '100%',
                            wordBreak: 'break-word'
                        }}>
                            <p>Ссылка:</p>
                            {linkForTarget}
                        </p>
                    </>
                }
            />

            <Head>
                <title>Курсы</title>
                <link rel="icon" href="/atom-icon.png"/>
                <div dangerouslySetInnerHTML={{__html: ym()}}/>
            </Head>

            <Header white={true}/>
            {/*<ContactButton/>*/}
            {/*<div className={styles.topHeader}>*/}
            {/*    <div className={styles.topHeaderBody}>*/}
            {/*        <img src="/double-l-shape.png" className={styles.RoundCube} alt=""/>*/}
            {/*        <img src="/robmik-tuda-suda.png" className={styles.ConeBlue} alt=""/>*/}
            {/*        <p className={styles.subtitle} style={{margin: '0 0 5px 0'}}>*/}
            {/*            воспользуйтесь фильтром для удобного поиска курсов*/}
            {/*        </p>*/}

            {/*        <div className={styles.filter}>*/}
            {/*            <div className={styles.filterBlock}>*/}
            {/*                <select name="citySelect" id="citySelect" className={styles.selectBlock}>*/}
            {/*                    <option value="0">Города</option>*/}
            {/*                    {*/}
            {/*                        filters[0] !== undefined*/}
            {/*                            ?*/}
            {/*                            (filters[0].map(filterOption => (*/}
            {/*                                filterOption.name !== "test"*/}
            {/*                                    ?*/}
            {/*                                    (<option value={filterOption.id}>{filterOption.name}</option>)*/}
            {/*                                    : null*/}
            {/*                            )))*/}
            {/*                            :*/}
            {/*                            null*/}
            {/*                    }*/}
            {/*                </select>*/}
            {/*                <select*/}
            {/*                    name="directionSelect"*/}
            {/*                    id="directionSelect"*/}
            {/*                    className={styles.selectBlock}*/}
            {/*                    onChange={e => setTempCategoryId(e.target.value)}*/}
            {/*                >*/}
            {/*                    <option value="0">Направления</option>*/}
            {/*                    {*/}
            {/*                        filters[1] !== undefined*/}
            {/*                            ?*/}
            {/*                            (filters[1].map(filterOption => (filterOption.id !== 0 ? (*/}
            {/*                                <option value={filterOption.id}>{filterOption.name}</option>) : null)))*/}
            {/*                            :*/}
            {/*                            null*/}
            {/*                    }*/}
            {/*                </select>*/}
            {/*                <select name="isOnlineSelect" id="isOnlineSelect" className={styles.selectBlock}>*/}
            {/*                    <option value="0">Формат занятий</option>*/}
            {/*                    <option value="1">Онлайн</option>*/}
            {/*                    <option value="2">Оффлайн</option>*/}
            {/*                </select>*/}
            {/*            </div>*/}
            {/*            <div className={styles.filterBlock}>*/}
            {/*                <select*/}
            {/*                    name="priceSelect"*/}
            {/*                    id="priceSelect"*/}
            {/*                    className={styles.selectBlock}*/}
            {/*                >*/}
            {/*                    <option value="0">Цена</option>*/}
            {/*                    <option value="0-20000">0-20.000KZT</option>*/}
            {/*                    <option value="20000-40000">20.000-40.000KZT</option>*/}
            {/*                    <option value="40000-60000">40.000-60.000KZT</option>*/}
            {/*                    <option value="60000-80000">60.000-80.000KZT</option>*/}
            {/*                    <option value="80000-100000">80.000-100.000KZT</option>*/}
            {/*                    <option value="100000">100.000KZT+</option>*/}
            {/*                </select>*/}
            {/*                <select*/}
            {/*                    name="centerSelect"*/}
            {/*                    id="centerSelect"*/}
            {/*                    className={styles.selectBlock}*/}
            {/*                >*/}
            {/*                    <option value="0">Центры</option>*/}
            {/*                    {*/}
            {/*                        filters[2] !== undefined*/}
            {/*                            ?*/}
            {/*                            (filters[2].map(filterOption =>*/}
            {/*                                filterOption.title !== "test"*/}
            {/*                                    ?*/}
            {/*                                    (<option value={filterOption.id}>{filterOption.title}</option>)*/}
            {/*                                    :*/}
            {/*                                    null*/}
            {/*                            ))*/}
            {/*                            :*/}
            {/*                            null*/}
            {/*                    }*/}
            {/*                </select>*/}

            {/*                <select*/}
            {/*                    name="sortTypeSelect"*/}
            {/*                    id="sortTypeSelect"*/}
            {/*                    className={styles.selectBlock}*/}
            {/*                    defaultValue={"0"}*/}
            {/*                >*/}
            {/*                    <option value="0">Сортировать</option>*/}
            {/*                    <option value="price asc">Возрастание цены</option>*/}
            {/*                    <option value="price desc">Убывание цены</option>*/}
            {/*                </select>*/}
            {/*            </div>*/}
            {/*            <div className={styles.search_btnBody}>*/}

            {/*                <div className={styles.search_btnDIV}>*/}
            {/*                    <div*/}
            {/*                        className={styles.search_btn}*/}
            {/*                        {...longPressHandler}*/}
            {/*                        onClick={() => {*/}
            {/*                            let city = null;*/}
            {/*                            try {*/}
            {/*                                city = Number(document.getElementById("citySelect").value);*/}
            {/*                            } catch {*/}
            {/*                                city = 0;*/}
            {/*                            }*/}

            {/*                            let direction = Number(document.getElementById("directionSelect").value);*/}
            {/*                            let center = document.getElementById("centerSelect").value;*/}
            {/*                            let price = document.getElementById("priceSelect").value;*/}
            {/*                            let isOnline = document.getElementById("isOnlineSelect").value;*/}
            {/*                            //let individualLessonSelect = document.getElementById("individualLessonSelect").value;*/}
            {/*                            let sortType = document.getElementById("sortTypeSelect").value;*/}

            {/*                            console.log("sort type: " + sortType);*/}

            {/*                            const link = `${globals.productionSiteDomain}/?center=${center}&sortType=${sortType}&direction=${direction}&city=${city}&price=${price}&isOnline=${isOnline}&searchingCenter=1`;*/}
            {/*                            setLinkForTarget(link);*/}

            {/*                            filterBtnHandler(city, direction, price, center, isOnline, sortType, 1);*/}

            {/*                            for (let i = 0; i < filters[1].length; i++) {*/}
            {/*                                if (filters[1][i].id == tempCategoryId) {*/}
            {/*                                    console.log('setting category name: ' + filters[1][i].name)*/}
            {/*                                    setCurrentCourseCategory(filters[1][i].name);*/}
            {/*                                    break;*/}
            {/*                                }*/}
            {/*                            }*/}

            {/*                            document.querySelector('#page_top').scrollIntoView({*/}
            {/*                                behavior: 'smooth'*/}
            {/*                            });*/}
            {/*                        }}>*/}
            {/*                        НАЙТИ КУРСЫ*/}
            {/*                    </div>*/}

            {/*                    <div*/}
            {/*                        className={styles.search_btn}*/}
            {/*                        {...longPressHandler}*/}
            {/*                        onClick={() => {*/}
            {/*                            let city = null;*/}
            {/*                            try {*/}
            {/*                                city = Number(document.getElementById("citySelect").value);*/}
            {/*                            } catch {*/}
            {/*                                city = 0;*/}
            {/*                            }*/}

            {/*                            let direction = Number(document.getElementById("directionSelect").value);*/}
            {/*                            let center = document.getElementById("centerSelect").value;*/}
            {/*                            let price = document.getElementById("priceSelect").value;*/}
            {/*                            let isOnline = document.getElementById("isOnlineSelect").value;*/}
            {/*                            //let individualLessonSelect = document.getElementById("individualLessonSelect").value;*/}
            {/*                            let sortType = document.getElementById("sortTypeSelect").value;*/}

            {/*                            console.log("sort type: " + sortType);*/}

            {/*                            const link = `${globals.productionSiteDomain}/?center=${center}&sortType=${sortType}&direction=${direction}&city=${city}&price=${price}&isOnline=${isOnline}&searchingCenter=0`;*/}
            {/*                            setLinkForTarget(link);*/}

            {/*                            filterBtnHandler(city, direction, price, center, isOnline, sortType, 0);*/}

            {/*                            for (let i = 0; i < filters[1].length; i++) {*/}
            {/*                                if (filters[1][i].id == tempCategoryId) {*/}
            {/*                                    console.log('setting category name: ' + filters[1][i].name)*/}
            {/*                                    setCurrentCourseCategory(filters[1][i].name);*/}
            {/*                                    break;*/}
            {/*                                }*/}
            {/*                            }*/}

            {/*                            document.querySelector('#page_top').scrollIntoView({*/}
            {/*                                behavior: 'smooth'*/}
            {/*                            });*/}
            {/*                        }}>*/}
            {/*                        НАЙТИ РЕПЕТИТОРА*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*</div>*/}


            <div id={'coursesBlock'}
                 className={classnames(styles.container, styles.topBlock)}>
                {
                    (
                        <>
                            <div className={styles.img_title}>
                                <img src="/notebook-dynamic-color.png" style={{height: 48, width: 48}} alt=""/>
                                    {searchingCenterState===false && (
                                        <p>Найденные репетиторы</p>
                                    )}
                                    {searchingCenterState===true && (
                                        <p>{currentCourseCategory}</p>
                                    )}
                                
                            </div>

                            {
                                courseCards !== null ? (
                                    imagesBase.length !== 0 && (
                                        courseCards.length > 0 ? (
                                            <div className={classnames(styles.courses_block)}>
                                                {
                                                    courseCards.slice(0, cardsToShow).map((course, idx) => {
                                                        if (course.title !== 'test') {
                                                            return (
                                                                <div className={styles.courseCard_item}>
                                                                    {searchingCenterState===false && (
                                                                        <TutorCourseCard key={idx} coverImage={imagesBase[Math.floor(Math.random() * imagesBase.length)].src} sendApplicationCallback={sendApplication} setLoadingModal={setLoadingModal} course={course}/>
                                                                    )}
                                                                    {searchingCenterState===true && (
                                                                        <CourseCard key={idx} coverImage={imagesBase[Math.floor(Math.random() * imagesBase.length)].src} sendApplicationCallback={sendApplication} setLoadingModal={setLoadingModal} course={course}/>
                                                                    )}
                                                                </div>
                                                            )
                                                        }
                                                    })
                                                }

                                            </div>) : <CourseSearchResultIsNotDefind catalog={true}/>)
                                ) : (
                                    <div className={styles.loader}>
                                        <img src="/loader.gif" alt=""></img>
                                    </div>
                                )
                            }

                            <div style={{width: '100%', display: 'flex', justifyContent: 'center', margin: '10px 0'}}>
                                <a className={styles.link} onClick={()=> {
                                    addCards()
                                }}>Смотреть еще</a>
                            </div>
                        </>
                    )
                }
            </div>

            <Footer/>
        </div>

    )


}


export default Courses;
